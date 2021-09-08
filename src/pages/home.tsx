/* eslint-disable react/jsx-boolean-value */
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import {
  Box,
  Flex,
  Grid,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';

import { SideBar } from '../components/SideBar';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { ButtonActions } from '../components/ButtonActions';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

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
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isLargerThan1370] = useMediaQuery('(max-width: 1370px)');
  const bg = useColorModeValue('#E5E5E5', '#1A202C');
  const colorSkeleton = useColorModeValue('#d8d8d8', '#4A5568');
  const skeletonHighlight = useColorModeValue('#f7f7f7', '#CBD5E0');

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

          {isVisible && (
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
              {loaded ? (
                <ExperienceBar />
              ) : (
                <SkeletonTheme
                  color={colorSkeleton}
                  highlightColor={skeletonHighlight}
                >
                  <Skeleton width="100" height="40px" />
                </SkeletonTheme>
              )}

              <CountdownProvider>
                <Flex
                  w="100%"
                  maxH="500px"
                  h="100%"
                  mt={isLargerThan1370 ? '10' : '28'}
                  py={isLargerThan1370 ? '4' : ''}
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    maxW="389px"
                    h="100%"
                    direction="column"
                    display={loaded ? 'flex' : 'none'}
                  >
                    <Profile user={user} isLoading={setLoaded} />
                    <CompletedChallenges />
                    <Countdown />
                    <ButtonActions />
                  </Flex>

                  <Box
                    w="100%"
                    maxW="468px"
                    h="100%"
                    display={loaded ? 'block' : 'none'}
                  >
                    <ChallengeBox />
                  </Box>

                  {!loaded && (
                    <Box w="100%" maxW="990px" h="100%" maxH="500px">
                      <SkeletonTheme
                        color={colorSkeleton}
                        highlightColor={skeletonHighlight}
                      >
                        <Flex w="100%" h="100%" justifyContent="space-between">
                          <Flex
                            w="389px"
                            h="100%"
                            direction="column"
                            gridRowGap={isLargerThan1370 ? '1.8rem' : '2rem'}
                          >
                            <Flex
                              w="100%"
                              h="100px"
                              align="center"
                              gridColumnGap="1.5rem"
                              mb="0.5rem"
                            >
                              <Skeleton
                                circle={true}
                                width="5.5rem"
                                height="5.5rem"
                              />
                              <Skeleton width="250px" height="3rem" />
                            </Flex>

                            <Skeleton width="100%" height="3.2rem" />

                            <Grid
                              mt={isLargerThan1370 ? '0.1rem' : '0.7rem'}
                              gridRowGap="1.9rem"
                            >
                              <Skeleton
                                width="100%"
                                height={isLargerThan1370 ? '8.125rem' : '9rem'}
                              />
                              <Skeleton width="100%" height="5rem" />
                            </Grid>
                          </Flex>

                          <Skeleton width="468px" height="100%" />
                        </Flex>
                      </SkeletonTheme>
                    </Box>
                  )}
                </Flex>
              </CountdownProvider>
            </Flex>
          )}
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
