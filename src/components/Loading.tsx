import { Box, Heading, Flex, Progress } from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      position="absolute"
      top="0"
      left="0"
      zIndex="333"
    >
      <Box>
        <Heading color="gray.500">Carregando...</Heading>
        <Progress
          mt={4}
          size="xs"
          isIndeterminate
          bgColor="transparent"
          colorScheme="blue"
        />
      </Box>
    </Flex>
  );
}
