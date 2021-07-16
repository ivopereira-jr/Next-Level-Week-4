/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { query as q } from 'faunadb';

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

export interface UserProps {
  ref: never;
  ts: number;
  data: {
    name: string;
    image: string;
    email: string;
    level: string;
    experience: string;
    challenges_completed: string;
    current_experience_to_next_level: string;
  };
}

interface HomeProps {
  level: number;
  experience: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
  level,
  experience,
  currentExperience,
  challengesCompleted,
}: HomeProps): JSX.Element {
  const [isLargerThan1370] = useMediaQuery('(max-width: 1370px)');
  const bg = useColorModeValue('#E5E5E5', '#1A202C');

  return (
    <>
      <ChallengesProvider
        level={level}
        experience={experience}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
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
            py={isLargerThan1370 ? 5 : 10}
            direction="column"
          >
            <ExperienceBar />

            <CountdownProvider>
              <Flex
                w="100%"
                maxH="500px"
                h="100%"
                mt={isLargerThan1370 ? 10 : 28}
                py={isLargerThan1370 ? 4 : ''}
                justifyContent="space-between"
              >
                <Flex w="100%" maxW="389px" h="100%" direction="column">
                  <Profile />
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

  const user: UserProps = await fauna.query(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  );

  return {
    props: {
      level: Number(user.data.level),
      experience: Number(user.data.experience),
      currentExperience: Number(user.data.current_experience_to_next_level),
      challengesCompleted: Number(user.data.challenges_completed),
    },
  };
};
