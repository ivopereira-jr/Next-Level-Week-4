import {
  Flex,
  Heading,
  Text,
  Icon,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import { FiExternalLink, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function ErroEmail(): JSX.Element {
  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Opss </Heading>
      <Text
        w="50%"
        mx="auto"
        mt="6"
        textAlign="center"
        fontSize="md"
        lineHeight="7"
      >
        Não fique triste da para resolver isso facilmente você deve deixar o seu
        email ou algum outro email público no github e depois provavelmente você
        ira conseguir realizar o login
        <ChakraLink
          href="https://help.umbler.com/hc/pt-br/articles/360007180671-Tornando-seu-e-mail-p%C3%BAblico-no-GitHub"
          isExternal
          display="inline-flex"
          alignItems="center"
          px="2"
        >
          segue o link
          <FiExternalLink />
        </ChakraLink>
        com o passo a passo caso você não sabia como fazer bom espero seu
        retorno ate mais.
      </Text>

      <Button
        mt="4"
        bg="blue.500"
        color="gray.100"
        py="6"
        px="8"
        _hover={{ bg: '#4953B8', color: '#f2f4f5' }}
      >
        <Link href="/">
          <a>
            <Icon as={FiHome} fontSize={30} />
          </a>
        </Link>
      </Button>
    </Flex>
  );
}
