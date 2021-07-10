import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { ChallengesContext } from '../contexts/ChallengeContext';

export function CompletedChallenges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mt={14}
      pb={4}
      borderBottom="1.5px solid #d7d8da"
    >
      <Text
        color="gray.600"
        fontSize={['lg', 'xl', 'xl', '2xl']}
        fontWeight="500"
      >
        Desafios completados
      </Text>
      <Text color="gray.600" fontSize="24px">
        {challengesCompleted}
      </Text>
    </Flex>
  );
}
