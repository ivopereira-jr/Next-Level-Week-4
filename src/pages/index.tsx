import Head from 'next/head';
import { getSession, signIn } from 'next-auth/client';
import {
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { GetServerSideProps } from 'next';

export default function App(): JSX.Element {
  return (
    <>
      <Head>
        <title>Move.it | Bem vindo</title>
      </Head>

      <Grid
        as="main"
        w="100vw"
        h="100vh"
        gridTemplateColumns="768px 1fr"
        gridColumnGap="32"
        bg="blue.500"
      >
        <Flex as="section" w="100%" h="100%" alignItems="center">
          <Image
            w="100%"
            height={{ base: '34rem', md: '34rem', xl: '44rem' }}
            src="/images/simbolo-login.png"
            alt="logo marca moveit"
          />
        </Flex>

        <Flex as="section" w="100%" h="100%">
          <Flex
            w="100%"
            h="100%"
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Image
              w="100%"
              maxW="360px"
              h="4.75rem"
              src="/icons/moveit-login.svg"
              alt="logo marca do moveit e texto escrito move.it"
            />

            <Heading
              color="gray.100"
              fontSize="2.4rem"
              fontWeight="600"
              mt="6.333rem"
            >
              Bem-vindo
            </Heading>

            <Grid
              mt="1.6rem"
              gridTemplateColumns="40px 1fr"
              gridColumnGap="1.6rem"
              alignItems="center"
            >
              <Button
                w="10"
                h="10"
                p="0"
                bg="none"
                color="blue.200"
                transition="color 600ms"
                _hover={{
                  bg: 'none',
                  color: 'gray.150',
                }}
                _active={{
                  bg: 'none',
                }}
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <Icon as={FaGithub} w="100%" h="100%" />
              </Button>
              <Text
                color="blue.200"
                fontSize="1.333rem"
                fontWeight="500"
                lineHeight="8"
              >
                Faça login com seu Github <br /> para começar
              </Text>
            </Grid>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // usando o  getSession com o serverside deve passar o req ou context como parametro
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
