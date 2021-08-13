import Head from 'next/head';
import {
  Flex,
  Image,
  Heading,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';

import { SideBar } from '../components/SideBar';
import { ResponseProps } from './home';

type User = {
  ts: number;
  name: string;
  image: string;
  email: string;
  level: string;
  experience: string;
  challenges_completed: string;
  current_experience_to_next_level: string;
};

interface LeaderboardProps {
  users: User[];
}

interface ResponseData {
  data: ResponseProps[];
}

export default function Leaderboard({ users }: LeaderboardProps): JSX.Element {
  const bgColor = useColorModeValue('#E5E5E5', '#1A202C');
  const bgColorCard = useColorModeValue('#fff', 'gray.700');
  const colorTitle = useColorModeValue('gray.700', 'gray.400');
  const colorText = useColorModeValue('gray.600', 'gray.500');

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

          <Table w="100%" mt="10" mx="auto">
            <Thead>
              <Tr>
                <Th
                  p="0"
                  w="72px"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.5"
                  color={colorText}
                >
                  Posição
                </Th>
                <Th
                  p="0"
                  w="4px"
                  h="100%"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.5"
                  color={colorText}
                />
                <Th
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.5"
                  color={colorText}
                >
                  Usuário
                </Th>
                {isWideVersion && (
                  <Th
                    w="44"
                    fontSize="14"
                    fontWeight="bold"
                    opacity="0.5"
                    color={colorText}
                    textAlign="left"
                    p="0"
                  >
                    Desafios
                  </Th>
                )}
                <Th
                  w="44"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.5"
                  color={colorText}
                  textAlign="center"
                  px="12"
                >
                  Experiência
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {users.map((user, index) => (
                <Tr key={user.email} w="100%" h="96px" bg={bgColorCard}>
                  <Td
                    color={colorText}
                    p="0"
                    w="72px"
                    h="96px"
                    fontSize="2xl"
                    fontWeight="500"
                    textAlign="center"
                    borderRadius="5px 0 0 5px"
                  >
                    {index + 1}
                  </Td>
                  <Td p="0" w="4px" h="100%" bg={bgColor} />

                  <Td
                    w={!isWideVersion && '48'}
                    bg={bgColorCard}
                    color={colorText}
                    p="0"
                  >
                    <Box display="grid" gridTemplateColumns="70px 1fr" ml="6">
                      <Image
                        w="16"
                        h="16"
                        borderRadius="50%"
                        src={user.image}
                        alt={`foto de ${user.name}`}
                      />
                      <Flex
                        ml="4"
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Heading
                          fontSize="xl"
                          fontWeight="600"
                          lineHeight="2xl"
                          color={colorTitle}
                        >
                          {user.name}
                        </Heading>
                        <Box
                          display="grid"
                          gridTemplateColumns="16px 1fr"
                          gridColumnGap="0.562rem"
                          alignItems="center"
                          mt="2"
                        >
                          <Image
                            src="/icons/level.svg"
                            alt="icone indicando para cima"
                          />

                          <Text
                            fontSize="md"
                            fontWeight="normal"
                            color={colorText}
                          >
                            level {user.level}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <Td w="44" color={colorText} px="0">
                      <Flex fontSize="md" fontWeight="500">
                        <Box color="blue.500" mr="1">
                          {user.challenges_completed}
                        </Box>
                        <Text color={colorText}>completados</Text>
                      </Flex>
                    </Td>
                  )}
                  <Td
                    w="44"
                    color={colorText}
                    px="8"
                    textAlign="center"
                    borderRadius="0 5px 5px 0"
                  >
                    <Flex
                      fontSize="md"
                      fontWeight="500"
                      justifyContent="center"
                    >
                      <Box color="blue.500">{user.experience}</Box>
                      <Text color={colorText} ml="1">
                        xp
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
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
