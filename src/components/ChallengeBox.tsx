import { useContext } from 'react';
import {
  Flex,
  Heading,
  Text,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallengeBox(): JSX.Element {
  const { activeChallenge, resetChallenge, completeChallenge } =
    useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChanllengeSucceeded(): void {
    completeChallenge();
    resetCountdown();
  }

  function handleChanllengeFailed(): void {
    resetChallenge();
    resetCountdown();
  }

  const colorTitle = useColorModeValue('gray.700', 'gray.400');
  const colorText = useColorModeValue('gray.600', 'gray.500');
  const colorBorder = useColorModeValue('gray.300', '#4A5568');
  const bg = useColorModeValue('#fff', 'gray.700');
  const bgButtonFailed = useColorModeValue('red.100', 'blackAlpha.200');
  const bgButtonCompleted = useColorModeValue('green.100', 'blackAlpha.200');

  return (
    <Flex
      as="section"
      w="100%"
      h="100%"
      bg={bg}
      borderRadius="5px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {activeChallenge ? (
        <Flex
          w="100%"
          h="100%"
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex
            as="header"
            w="100%"
            h="5rem"
            px="16"
            color="blue.500"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              w="100%"
              fontSize="xl"
              fontWeight="600"
              lineHeight="8"
              py="6"
              borderBottom="1px solid"
              borderColor={colorBorder}
            >
              Ganhe {activeChallenge.amount} xp
            </Heading>
          </Flex>

          <Flex
            as="main"
            flex="1"
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            pt="9"
            px="14"
            pb="9"
          >
            <Image src={`icons/${activeChallenge.type}.svg`} />
            <Heading
              color={colorTitle}
              fontSize="3xl"
              lineHeight="10"
              fontWeight="600"
              mt="6"
            >
              Novo desafio
            </Heading>
            <Text
              color={colorText}
              fontSize="md"
              lineHeight="7"
              fontWeight="normal"
              mt="2"
            >
              {activeChallenge.description}
            </Text>
          </Flex>

          <Flex
            as="footer"
            w="100%"
            h="5rem"
            borderTop="1px solid"
            borderColor={colorBorder}
          >
            <Button
              w="100%"
              h="100%"
              py="7"
              color="red.500"
              bg={bgButtonFailed}
              fontSize="xl"
              fontWeight="500"
              lineHeight="6"
              textAlign="center"
              borderRadius="0 0 0 5px"
              onClick={handleChanllengeFailed}
              transition="800ms"
              _hover={{
                bg: 'red.500',
                color: 'gray.100',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              Falhei
            </Button>
            <Flex as="span" w="1px" h="100%" bg={colorBorder} />
            <Button
              w="100%"
              h="100%"
              py="7"
              color="green.600"
              bg={bgButtonCompleted}
              fontSize="xl"
              fontWeight="500"
              lineHeight="6"
              textAlign="center"
              borderRadius="0 0 5px 0"
              onClick={handleChanllengeSucceeded}
              transition="800ms"
              _hover={{
                bg: 'green.500',
                color: 'gray.100',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              Completei
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex
          w="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          color={colorText}
          px="4"
        >
          <Heading fontSize="4xl" fontWeight="500" lineHeight="10">
            Inicie um ciclo para receber um desafio
          </Heading>
          <Image mt="16" mb="4" src="icons/level-up.svg" alt="Level up" />
          <Text fontSize="md" lineHeight="7" fontWeight="normal">
            Avance de level completando <br /> os desafios.
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
