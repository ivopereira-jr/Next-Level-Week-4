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
} from '@chakra-ui/react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';

import { SideBar } from '../components/SideBar';

export default function Leaderboard({ users }): JSX.Element {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex as="main" w="100%" h="100%">
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
            color="gray.700"
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
                  color="gray.600"
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
                  color="gray.600"
                />
                <Th
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.5"
                  color="gray.600"
                >
                  Usuário
                </Th>
                {isWideVersion && (
                  <Th
                    w="44"
                    fontSize="14"
                    fontWeight="bold"
                    opacity="0.5"
                    color="gray.600"
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
                  color="gray.600"
                  textAlign="center"
                  px="12"
                >
                  Experiência
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {users.map(user => (
                <Tr w="100%" h="96px">
                  <Td
                    bg="gray.100"
                    color="gray.600"
                    p="0"
                    w="72px"
                    h="96px"
                    fontSize="2xl"
                    fontWeight="500"
                    textAlign="center"
                    borderRadius="5px 0 0 5px"
                  >
                    $
                  </Td>
                  <Td p="0" w="4px" h="100%" />

                  <Td
                    w={!isWideVersion && '48'}
                    bg="gray.100"
                    color="gray.600"
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
                          color="gray.700"
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
                            color="gray.600"
                          >
                            level {user.level}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <Td w="44" bg="gray.100" color="gray.600" px="0">
                      <Flex fontSize="md" fontWeight="500">
                        <Box color="blue.500" mr="1">
                          {user.challenges_completed}
                        </Box>
                        <Text color="gray.600">completados</Text>
                      </Flex>
                    </Td>
                  )}
                  <Td
                    w="44"
                    bg="gray.100"
                    color="gray.600"
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
                      <Text color="gray.600" ml="1">
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

  const response = await fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('users'))),
      q.Lambda(x => q.Get(x))
    )
  );

  const users = response.data.map(user => {
    return {
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
