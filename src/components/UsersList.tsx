import {
  Flex,
  Image,
  Heading,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from '../pages/leaderboard';

interface UsersListProps {
  users: User[];
  isLoading: any;
}

export function UsersList({ users, isLoading }: UsersListProps): JSX.Element {
  const bgColor = useColorModeValue('#E5E5E5', '#1A202C');
  const bgColorCard = useColorModeValue('#fff', 'gray.700');
  const colorTitle = useColorModeValue('gray.700', 'gray.400');
  const colorText = useColorModeValue('gray.600', 'gray.500');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Table w="100%" mt="10" mx="auto">
      <Thead>
        <Tr>
          <Th
            p="0"
            w="72px"
            fontSize="14"
            fontWeight="bold"
            opacity="0.5"
            color={colorText}
          >
            Posição
          </Th>
          <Th
            p="0"
            w="4px"
            h="100%"
            fontSize="14"
            fontWeight="bold"
            opacity="0.5"
            color={colorText}
          />
          <Th fontSize="14" fontWeight="bold" opacity="0.5" color={colorText}>
            Usuário
          </Th>
          {isWideVersion && (
            <Th
              w="44"
              fontSize="14"
              fontWeight="bold"
              opacity="0.5"
              color={colorText}
              textAlign="left"
              p="0"
            >
              Desafios
            </Th>
          )}
          <Th
            w="44"
            fontSize="14"
            fontWeight="bold"
            opacity="0.5"
            color={colorText}
            textAlign="center"
            px="12"
          >
            Experiência
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {users.map((user, index) => (
          <Tr key={user.email} w="100%" h="96px" bg={bgColorCard}>
            <Td
              color={colorText}
              p="0"
              w="72px"
              h="96px"
              fontSize="2xl"
              fontWeight="500"
              textAlign="center"
              borderRadius="5px 0 0 5px"
            >
              {index + 1}
            </Td>
            <Td p="0" w="4px" h="100%" bg={bgColor} />

            <Td
              w={!isWideVersion && '48'}
              bg={bgColorCard}
              color={colorText}
              p="0"
            >
              <Box display="grid" gridTemplateColumns="70px 1fr" ml="6">
                <Image
                  w="16"
                  h="16"
                  borderRadius="50%"
                  src={user.image}
                  alt={`foto de ${user.name}`}
                  onLoad={() => isLoading(true)}
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
                    mt="2"
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
            </Td>
            {isWideVersion && (
              <Td w="44" color={colorText} px="0">
                <Flex fontSize="md" fontWeight="500">
                  <Box color="blue.500" mr="1">
                    {user.challenges_completed}
                  </Box>
                  <Text color={colorText}>completados</Text>
                </Flex>
              </Td>
            )}
            <Td
              w="44"
              color={colorText}
              px="8"
              textAlign="center"
              borderRadius="0 5px 5px 0"
            >
              <Flex fontSize="md" fontWeight="500" justifyContent="center">
                <Box color="blue.500">{user.experience}</Box>
                <Text color={colorText} ml="1">
                  xp
                </Text>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
