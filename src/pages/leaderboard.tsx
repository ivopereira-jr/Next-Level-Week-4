/* eslint-disable react/jsx-boolean-value */
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import {
  Flex,
  Heading,
  Box,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';

import { SideBar } from '../components/SideBar';
import { UsersList } from '../components/UsersList';
import { UserResponse } from './home';

export type User = {
  id: number;
  name: string;
  image: string;
  email: string;
  level: string;
  experience: string;
  challenges_completed: string;
};

interface LeaderboardProps {
  users: User[];
}

interface ResponseData {
  data: UserResponse[];
}

export default function Leaderboard({ users }: LeaderboardProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const bgColor = useColorModeValue('#E5E5E5', '#1A202C');
  const colorTitle = useColorModeValue('gray.700', 'gray.400');

  const colorSkeleton = useColorModeValue('#d8d8d8', '#4A5568');
  const skeletonHighlight = useColorModeValue('#f7f7f7', '#CBD5E0');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex as="main" w="100%" h="100%" bg={bgColor}>
      <Head>
        <title>Move.it | Leaderboard</title>
      </Head>

      <SideBar />

      <Flex as="section" w="100%" maxW="960px" h="100%" mt="10" mx="auto">
        <Box
          w="100%"
          h="100%"
          display="flex"
          px={!isWideVersion && '5%'}
          flexDirection="column"
          justifyContent="center"
          alignItems={!isWideVersion && 'center'}
        >
          <Heading
            fontSize="4xl"
            fontWeight="600"
            lineHeight="5xl"
            color={colorTitle}
          >
            Leaderboard
          </Heading>

          <Box display={loaded ? 'block' : 'none'}>
            <UsersList users={users} isLoading={setLoaded} />
          </Box>

          {!loaded && (
            <Box mt="10">
              <SkeletonTheme
                color={colorSkeleton}
                highlightColor={skeletonHighlight}
              >
                <Skeleton width="100" height="40px" />
              </SkeletonTheme>

              <SkeletonTheme
                color={colorSkeleton}
                highlightColor={skeletonHighlight}
              >
                <Box ml="1rem">
                  <Flex w="100%" h="100px" align="center" gridColumnGap="1rem">
                    <Skeleton width="3rem" height="3rem" />
                    <Skeleton circle={true} width="4rem" height="4rem" />
                    <Skeleton width="500px" height="2.2rem" />
                  </Flex>
                  <Flex w="100%" h="100px" align="center" gridColumnGap="1rem">
                    <Skeleton width="3rem" height="3rem" />
                    <Skeleton circle={true} width="4rem" height="4rem" />
                    <Skeleton width="500px" height="2.2rem" />
                  </Flex>
                  <Flex w="100%" h="100px" align="center" gridColumnGap="1rem">
                    <Skeleton width="3rem" height="3rem" />
                    <Skeleton circle={true} width="4rem" height="4rem" />
                    <Skeleton width="500px" height="2.2rem" />
                  </Flex>
                </Box>
              </SkeletonTheme>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // get || update the experience field
  const response: ResponseData = await fauna.query(
    q.Map(
      q.Paginate(q.Match(q.Index('users_by_experience_descending'))),
      q.Lambda(
        ['experience', 'ref'],
        q.If(
          q.Not(q.IsInteger(q.Var('experience'))),
          q.Let(
            { doc: q.Get(q.Var('ref')) },
            q.Update(q.Var('ref'), {
              data: {
                experience: q.ToInteger(
                  q.Select(['data', 'experience'], q.Var('doc'))
                ),
              },
            })
          ),
          q.Get(q.Var('ref'))
        )
      )
    )
  );

  const users = response.data.map(user => {
    return {
      id: user.ts,
      name: user.data.name,
      image: user.data.image,
      level: user.data.level,
      challenges_completed: user.data.challenges_completed,
      experience: user.data.experience,
    };
  });

  return {
    props: {
      users,
    },
  };
};
