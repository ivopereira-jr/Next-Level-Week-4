import { Box, Heading, Flex, Progress } from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Box>
        <Heading color="gray.500">Carregando...</Heading>
        <Progress
          mt={4}
          size="xs"
          isIndeterminate
          bgColor="transparent"
          colorScheme="purple"
        />
      </Box>
    </Flex>
  );
}
