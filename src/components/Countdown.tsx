import { useContext } from 'react';
import { Flex, Text, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown(): JSX.Element {
  const {
    minutes,
    seconds,
    progressPercentBar,
    hasFinished,
    isActive,
    startCountDown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const color = useColorModeValue('gray.700', 'gray.400');
  const colorButton = useColorModeValue('gray.600', 'gray.500');
  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex w="100%" mt="3.312rem" direction="column">
      <Flex
        w="100%"
        maxH="144px"
        fontSize="8.5rem"
        fontFamily="Rajdhani"
        alignItems="center"
        justifyContent="center"
        color={color}
        textAlign="center"
      >
        <Flex
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="5px 0 0 5px"
          alignItems="center"
          justifyContent="center"
          mr="2px"
        >
          <Text>{minuteLeft}</Text>
        </Flex>

        <Flex
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="0 5px 5px 0"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{minuteRight}</Text>
        </Flex>
        <Text fontSize="7rem" mb="2" mx="2">
          :
        </Text>

        <Flex
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="5px 0 0 5px"
          alignItems="center"
          justifyContent="center"
          mr="2px"
        >
          <Text>{secondLeft}</Text>
        </Flex>

        <Flex
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="0 5px 5px 0"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{secondRight}</Text>
        </Flex>
      </Flex>

      {hasFinished ? (
        <Button
          w="100%"
          fontSize="1.333rem"
          fontWeight="600"
          lineHeight="1.6rem"
          textAlign="center"
          borderRadius="5px"
          mt="8"
          p="0"
          py="2.5rem"
          rightIcon={
            <Icon as={IoMdCheckmarkCircle} fontSize="24" color="green.400" />
          }
          outline="none"
          isDisabled
          _disabled={{
            color: colorButton,
            bgColor: bg,
            cursor: 'no-drop',
          }}
        >
          Ciclo encerrado
          <Flex
            as="span"
            w="100%"
            h="4px"
            bg="green.400"
            borderRadius="0 0 5px 5px"
            position="absolute"
            bottom="0"
          />
        </Button>
      ) : (
        <>
          {isActive && !hasFinished ? (
            <Button
              w="100%"
              fontSize="1.333rem"
              fontWeight="600"
              lineHeight="1.6rem"
              color={colorButton}
              bgColor={bg}
              textAlign="center"
              borderRadius="5px"
              mt="8"
              p="0"
              py="2.5rem"
              rightIcon={<Icon as={IoMdClose} fontSize="24" />}
              outline="none"
              onClick={resetCountdown}
              transition="800ms"
              _hover={{
                bg: 'red.500',
                color: 'gray.100',
                boxShadow: 'md',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              Abandonar ciclo
              <Flex
                as="span"
                w="100%"
                h="4px"
                bg="gray.300"
                borderRadius="0 0 5px 5px"
                position="absolute"
                bottom="0"
              >
                <Flex
                  as="span"
                  w={`${progressPercentBar}%`}
                  h="4px"
                  bg="green.400"
                  borderRadius="0 0 5px 5px"
                  position="absolute"
                  bottom="0"
                  transition="width 1s linear"
                />
              </Flex>
            </Button>
          ) : (
            <Button
              w="100%"
              fontSize="1.333rem"
              fontWeight="600"
              lineHeight="1.6rem"
              color="gray.100"
              bgColor="blue.500"
              textAlign="center"
              borderRadius="5px"
              mt="8"
              p="0"
              py="2.5rem"
              rightIcon={<Icon as={BsFillPlayFill} fontSize="24" mt="0.5" />}
              transition="800ms"
              onClick={startCountDown}
              _hover={{
                bg: 'blue.600',
                boxShadow: 'md',
              }}
              _focus={{
                outline: 'none',
              }}
            >
              Iniciar um ciclo
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}
