import { useContext } from 'react';
import { Flex, Text, Image, Button, Icon } from '@chakra-ui/react';
import { VscSignOut } from 'react-icons/vsc';
import { signOut } from 'next-auth/client';
import { ChallengesContext } from '../contexts/ChallengeContext';

export function Profile(): JSX.Element {
  const { level, experience } = useContext(ChallengesContext);

  return (
    <Flex alignItems="center">
      <Image
        w="5.5rem"
        h="5.5rem"
        borderRadius="50%"
        src="https://github.com/ivopereira-jr.png"
        alt="Ivo Pereira"
      />

      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex direction="column" alignItems="flex-start" ml="6">
          <Text fontSize="2xl" fontWeight="600" color="gray.700">
            Ivo Pereira
          </Text>

          <Flex alignItems="center">
            <Image src="/icons/level.svg" alt="icone indicando para cima" />
            <Text color="gray.600" fontSize="md" mx="2.5">
              Level {level}
            </Text>
            <Text color="gray.600" fontSize="0.875rem">
              {experience} xp
            </Text>
          </Flex>
        </Flex>

        <Button
          w="10"
          h="10"
          p="0"
          bg="none"
          color="gray.500"
          transition="color 600ms"
          _hover={{
            bg: 'none',
            color: 'gray.700',
          }}
          _active={{
            bg: 'none',
          }}
          onClick={() => signOut()}
        >
          <Icon as={VscSignOut} w="100%" h="100%" />
        </Button>
      </Flex>
    </Flex>
  );
}
