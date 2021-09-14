import { useContext } from 'react';
import { Flex, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { CountdownContext } from '../contexts/CountdownContext';

export function ButtonActions(): JSX.Element {
  const {
    progressPercentBar,
    hasFinished,
    isActive,
    startCountDown,
    resetCountdown,
  } = useContext(CountdownContext);

  const colorButton = useColorModeValue('gray.600', 'gray.500');
  const bg = useColorModeValue('#fff', 'gray.700');

  return (
    <>
      {hasFinished ? (
        <Button
          w="100%"
          fontSize="1.333rem"
          fontWeight="600"
          lineHeight="1.6rem"
          textAlign="center"
          borderRadius="5px"
          boxShadow="base"
          p="0"
          py="10"
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
              boxShadow="base"
              p="0"
              py="10"
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
              flex="1"
              fontSize="1.333rem"
              fontWeight="600"
              lineHeight="1.6rem"
              color="gray.100"
              bgColor="blue.500"
              textAlign="center"
              borderRadius="5px"
              boxShadow="base"
              p="0"
              py="10"
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
    </>
  );
}
