import { Flex, Box, useColorModeValue, useMediaQuery } from '@chakra-ui/react';

import { SetTimer } from './SetTimer';

import { useCountdown } from '../hooks/Countdown';

export function Countdown(): JSX.Element {
  const { minutes, seconds } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const [isLargerThan1370] = useMediaQuery('(max-width: 1370px)');
  const color = useColorModeValue('gray.700', 'gray.400');
  const bg = useColorModeValue('#fff', 'gray.700');

  return (
    <Flex
      as="section"
      w="100%"
      h="100%"
      pb={8}
      direction="column"
      position="relative"
    >
      <SetTimer />

      <Flex
        w="100%"
        h={isLargerThan1370 ? 32 : 36}
        fontSize="8.5rem"
        fontFamily="Rajdhani"
        alignItems="center"
        justifyContent="center"
        color={color}
        textAlign="center"
      >
        <Box
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="5px 0 0 5px"
          mr="2px"
        >
          <Flex
            as="span"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            {minuteLeft}
          </Flex>
        </Box>

        <Box
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="0 5px 5px 0"
          mr="2px"
        >
          <Flex
            as="span"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            {minuteRight}
          </Flex>
        </Box>

        <Flex
          as="span"
          flex="1"
          h="100%"
          alignItems="center"
          fontSize="7rem"
          pb="2"
          mx="2"
        >
          :
        </Flex>

        <Box
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="5px 0 0 5px"
          mr="2px"
        >
          <Flex
            as="span"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            {secondLeft}
          </Flex>
        </Box>

        <Box
          w="100%"
          h="100%"
          bgColor={bg}
          boxShadow="base"
          borderRadius="0 5px 5px 0"
          mr="2px"
        >
          <Flex
            as="span"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            {secondRight}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
