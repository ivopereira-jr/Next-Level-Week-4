import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { useCountdown } from '../../hooks/Countdown';
import { ButtonComponent } from './Button';

export function ButtonsCountdown(): JSX.Element {
  const {
    progressPercentBar,
    hasFinished,
    isActive,
    startCountDown,
    resetCountdown,
  } = useCountdown();

  const colorButton = useColorModeValue('gray.600', 'gray.500');
  const bg = useColorModeValue('#fff', 'gray.700');

  return (
    <>
      {hasFinished ? (
        <ButtonComponent
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
        </ButtonComponent>
      ) : (
        <>
          {isActive && !hasFinished ? (
            <ButtonComponent
              color={colorButton}
              bgColor={bg}
              rightIcon={<Icon as={IoMdClose} fontSize="24" />}
              outline="none"
              onClick={resetCountdown}
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
            </ButtonComponent>
          ) : (
            <ButtonComponent
              flex="1"
              color="gray.100"
              bgColor="blue.500"
              rightIcon={<Icon as={BsFillPlayFill} fontSize="24" mt="0.5" />}
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
            </ButtonComponent>
          )}
        </>
      )}
    </>
  );
}
