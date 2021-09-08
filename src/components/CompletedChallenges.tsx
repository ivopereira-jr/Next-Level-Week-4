import { useContext } from 'react';
import {
  Flex,
  Grid,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { ChallengesContext } from '../contexts/ChallengeContext';

export function CompletedChallenges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);

  const [isLargerThan1370] = useMediaQuery('(max-width: 1370px)');
  const color = useColorModeValue('gray.600', 'gray.400');
  const colorBorder = useColorModeValue('#d7d8da', '#2D3748');

  return (
    <Grid py={isLargerThan1370 ? 10 : 12} templateRows="29px 1.5px" gap={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color={color} fontSize="lg" fontWeight="500">
          Desafios completados
        </Text>
        <Text color={color} fontSize={['xl', 'xl', '2xl']}>
          {challengesCompleted}
        </Text>
      </Flex>

      <Flex w="100%" h="1.5px" bg={colorBorder} as="span" />
    </Grid>
  );
}
