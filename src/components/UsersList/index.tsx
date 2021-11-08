import {
  Box,
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { User } from '../../pages/leaderboard';

import styles from './styles.module.scss';

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps): JSX.Element {
  const { colorMode } = useColorMode();
  const bgColorCard = useColorModeValue('#fff', 'gray.700');
  const colorTitle = useColorModeValue('gray.700', 'gray.400');
  const colorText = useColorModeValue('gray.600', 'gray.500');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <div className={styles.container}>
      <Grid
        color={colorText}
        gridTemplateColumns="72px 1fr 140px 120px"
        paddingRight="14"
        fontSize="14"
        fontWeight="bold"
        textTransform="uppercase"
        opacity="0.5"
        mt="10"
      >
        <Text>Posição</Text>
        <Text ml="6">Usuário</Text>
        {isWideVersion && <Text>Desafios</Text>}
        <Text>Experiência</Text>
      </Grid>

      <div
        className={`${styles.content} ${
          colorMode === 'light' ? styles.colorLight : styles.colorDark
        }`}
      >
        <ul>
          {users.map((user, index) => (
            <li key={user.email}>
              <Flex
                p="0"
                w="72px"
                h="96px"
                color={colorText}
                bg={bgColorCard}
                alignItems="center"
                justifyContent="center"
                borderRadius="5px 0 0 5px"
              >
                <Text fontSize="2xl" fontWeight="500" textAlign="center">
                  {index + 1}
                </Text>
              </Flex>

              <Flex
                w="100%"
                h="96px"
                color={colorText}
                bg={bgColorCard}
                borderRadius="0 5px 5px 0"
                display="grid"
                alignItems="center"
                gridTemplateColumns="1fr 160px 100px"
                paddingRight="14"
              >
                <Box display="grid" gridTemplateColumns="70px 1fr" ml="6">
                  <Image
                    w="16"
                    h="16"
                    borderRadius="50%"
                    src={user.image}
                    alt={`foto de ${user.name}`}
                  />
                  <Flex
                    ml="4"
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Heading
                      fontSize="xl"
                      fontWeight="600"
                      lineHeight="2xl"
                      color={colorTitle}
                    >
                      {user.name}
                    </Heading>
                    <Box
                      display="grid"
                      gridTemplateColumns="16px 1fr"
                      gridColumnGap="0.562rem"
                      alignItems="center"
                      mt="1.5"
                    >
                      <Image
                        src="/icons/level.svg"
                        alt="icone indicando para cima"
                      />

                      <Text fontSize="md" fontWeight="normal" color={colorText}>
                        level {user.level}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                {isWideVersion && (
                  <Flex fontSize="md" fontWeight="500">
                    <Box color="blue.500" mr="1">
                      {user.challenges_completed}
                    </Box>
                    <Text color={colorText}>completados</Text>
                  </Flex>
                )}

                <Flex fontSize="md" fontWeight="500" justifyContent="center">
                  <Box color="blue.500">{user.experience}</Box>
                  <Text color={colorText} ml="1">
                    xp
                  </Text>
                </Flex>
              </Flex>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
