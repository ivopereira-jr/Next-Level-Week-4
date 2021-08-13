/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { query as q } from 'faunadb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SideBar } from '../components/SideBar';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { fauna } from '../services/fauna';
import { ButtonActions } from '../components/ButtonActions';

export interface ResponseProps {
  ref: never;
  ts: number;
  data: {
    name: string;
    image: string;
    email: string;
    level: string;
    experience: string;
    current_experience_to_next_level: string;
    challenges_completed: string;
  };
}

export interface HomeProps {
  user: {
    name: string;
    image: string;
    level: number;
    experience: number;
    challengesCompleted: number;
    currentExperience: number;
  };
}

export default function Home({ user }: HomeProps): JSX.Element {
  const [isLoading, serIsLoading] = useState(false);

  const [isLargerThan1370] = useMediaQuery('(max-width: 1370px)');
  const bg = useColorModeValue('#E5E5E5', '#1A202C');
  const colorSkeleton = useColorModeValue('#d8d8d8', '#4A5568');
  const skeletonHighlight = useColorModeValue('#f7f7f7', '#CBD5E0');

  return (
    <>
      <ChallengesProvider
        level={user.level}
        experience={user.experience}
        currentExperience={user.currentExperience}
        challengesCompleted={user.challengesCompleted}
      >
        <Flex as="main" w="100%" h="100vh" bgColor={bg}>
          <Head>
            <title>Move.it | Home</title>
          </Head>

          <SideBar />

          <Flex
            as="section"
            w="100%"
            maxW="990px"
            h="100%"
            mx="auto"
            py={isLargerThan1370 ? '5' : '10'}
            px="2%"
            direction="column"
          >
            <ExperienceBar />

            <CountdownProvider>
              <Flex
                w="100%"
                maxH="500px"
                h="100%"
                mt={isLargerThan1370 ? '10' : '28'}
                py={isLargerThan1370 ? '4' : ''}
                justifyContent="space-between"
              >
                <Flex w="100%" maxW="389px" h="100%" direction="column">
                  <Profile user={user} />
                  <CompletedChallenges />
                  <Countdown />
                  <ButtonActions />
                </Flex>
                <Flex w="100%" maxW="468px" h="100%">
                  <ChallengeBox />
                </Flex>
              </Flex>
            </CountdownProvider>
          </Flex>
        </Flex>
      </ChallengesProvider>
    </>
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

  const response: ResponseProps = await fauna.query(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  );

  const user = {
    name: response.data.name,
    image: response.data.image,
    level: Number(response.data.level),
    experience: Number(response.data.experience),
    challengesCompleted: Number(response.data.challenges_completed),
    currentExperience: Number(response.data.current_experience_to_next_level),
  };

  return {
    props: {
      user,
    },
  };
};
