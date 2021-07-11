import { useContext } from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { ChallengesContext } from '../contexts/ChallengeContext';

export function ExperienceBar(): JSX.Element {
  const { currentExperienceToNextLevel, experienceToNextLevel } =
    useContext(ChallengesContext);

  const percentToNextLevel =
    Math.round(currentExperienceToNextLevel * 100) / experienceToNextLevel;

  const colorText = useColorModeValue('gray.600', 'gray.500');

  return (
    <Flex
      w="100%"
      h="9"
      alignItems="center"
      fontSize="md"
      fontWeight="500"
      color={colorText}
    >
      <Flex as="span">0 xp</Flex>
      <Flex
        flex="1"
        h="0.25rem"
        bg="gray.300"
        mx="6"
        borderRadius="5px"
        boxShadow="sm"
        position="relative"
      >
        <Flex
          w={`${percentToNextLevel}%`}
          h="100%"
          bg="green.400"
          borderRadius="5px"
          boxShadow="sm"
          position="absolute"
          bottom="0"
        />
        <Text
          position="absolute"
          top="2.5"
          left={`${percentToNextLevel}%`}
          transform="translateX(-16px)"
        >
          {currentExperienceToNextLevel} xp
        </Text>
      </Flex>
      <Flex as="span">{experienceToNextLevel} xp</Flex>
    </Flex>
  );
}
