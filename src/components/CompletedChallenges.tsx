import { useContext } from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { ChallengesContext } from '../contexts/ChallengeContext';

export function CompletedChallenges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);

  const color = useColorModeValue('gray.600', 'gray.400');
  const colorBorder = useColorModeValue('#d7d8da', '#2D3748');

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mt={14}
      pb={4}
      borderBottom="1.5px solid"
      borderColor={colorBorder}
    >
      <Text color={color} fontSize={['lg', 'xl', 'xl', '2xl']} fontWeight="500">
        Desafios completados
      </Text>
      <Text color={color} fontSize="24px">
        {challengesCompleted}
      </Text>
    </Flex>
  );
}
