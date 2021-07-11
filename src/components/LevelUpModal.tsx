import { useContext } from 'react';
import {
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

import { ChallengesContext } from '../contexts/ChallengeContext';

export function LevelUpModal(): JSX.Element {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  const colorTitle = useColorModeValue('gray.700', 'gray.400');
  const colorText = useColorModeValue('gray.600', 'gray.500');
  const colorBorder = useColorModeValue('gray.300', '#718096');
  const bg = useColorModeValue('gray.100', 'gray.700');
  const bgButton = useColorModeValue('blue.100', '#4A5568');
  const colorOverlay = useColorModeValue('gray.220', '#4A5568');

  return (
    <Flex
      as="section"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      backdropFilter="blur(3px) opacity(1.0)"
      zIndex="3"
    >
      <Flex
        w="100%"
        h="100%"
        bg={colorOverlay}
        opacity="0.6"
        position="absolute"
        top="0"
        left="0"
        alignItems="center"
        justifyContent="center"
      />

      <Flex
        w="100%"
        maxW="400px"
        height="22.625rem"
        bg={bg}
        borderRadius="5px"
        direction="column"
        position="relative"
        boxShadow="base"
        zIndex="33"
      >
        <Button
          position="absolute"
          w="10"
          h="10"
          top="5"
          right="5"
          p="0"
          m="0"
          bg="transparent"
          onClick={closeLevelUpModal}
        >
          <Image src="/icons/close.svg" alt="Icone para fechar modal" />
        </Button>

        <Flex
          w="100%"
          h="100%"
          pt="12"
          pb="10"
          direction="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderBottom="1px solid"
          borderColor={colorBorder}
        >
          <Flex
            w="100%"
            h="6.25rem"
            alignItems="center"
            justifyContent="center"
            background="url(/icons/level-up-congratulations.svg) no-repeat center"
          >
            <Text
              color="blue.500"
              fontSize="8.75rem"
              fontWeight="600"
              lineHeight="6.25rem"
              textShadow="0 10px 16px rgba(89, 101,224, 0.3)"
            >
              {level}
            </Text>
          </Flex>
          <Heading
            color={colorTitle}
            fontSize="3xl"
            fontWeight="600"
            lineHeight="10"
            mt="6"
          >
            Parabéns
          </Heading>
          <Text
            color={colorText}
            fontSize="xl"
            fontWeight="normal"
            lineHeight="7"
          >
            Você alcançou um novo level.
          </Text>
        </Flex>

        <Button
          w="100%"
          h="80px"
          color="blue.400"
          bg={bgButton}
          borderRadius="0 0 5px 5px"
          transition="600ms"
          _hover={{
            color: 'gray.100',
            bg: 'blue.400',
            boxShadow: 'md',
          }}
        >
          Compartilhar no Twitter
          <Icon ml="4" mt="px" as={FaTwitter} />
        </Button>
      </Flex>
    </Flex>
  );
}
