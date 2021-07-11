import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Flex,
  Image,
  Icon,
  Grid,
  Button,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { BsAward, BsHouseDoor } from 'react-icons/bs';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useState } from 'react';

export function SideBar(): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { asPath } = useRouter();
  const isHome = asPath === '/home';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue('gray.600', 'gray.500');
  const bgGradient = useColorModeValue(
    'linear-gradient(180deg, #FFFFFF 0%, #EAEBED 100%)',
    'linear-gradient(180deg, #2d3748b2 0%, #2D3748 100%)'
  );

  return (
    <Flex
      as="nav"
      w="100%"
      maxW="112px"
      h="100vh"
      py="32px"
      direction="column"
      alignItems="center"
      background={bgGradient}
    >
      <Skeleton isLoaded={imageLoaded}>
        <Image
          src="/icons/logo-sidebar.svg"
          alt="Logo marca moveit"
          w={12}
          h={10}
          px={!isWideVersion && '2%'}
          mx="auto"
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>

      <Flex
        w="100%"
        flex="1"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid w="100%" h={14} gridTemplateColumns="4px 1fr">
          {isHome && (
            <Flex
              as="span"
              w="4px"
              h="100%"
              bgColor="blue.600"
              borderTopRightRadius="5px"
              borderBottomRightRadius="5px"
            />
          )}
          <Flex
            alignItems="center"
            justifyContent="center"
            gridColumn="2"
            mr="4px"
            px={!isWideVersion && '2%'}
          >
            <Link href="/home">
              <a>
                <Icon
                  as={BsHouseDoor}
                  color={isHome ? 'blue.500' : color}
                  fontSize={30}
                />
              </a>
            </Link>
          </Flex>
        </Grid>

        <Grid w="100%" h={14} gridTemplateColumns="4px 1fr">
          {!isHome && (
            <Flex
              as="span"
              w="4px"
              h="100%"
              bgColor="blue.600"
              borderTopRightRadius="5px"
              borderBottomRightRadius="5px"
            />
          )}
          <Flex
            alignItems="center"
            justifyContent="center"
            gridColumn="2"
            mr="4px"
            px={!isWideVersion && '2%'}
          >
            <Link href="/leaderboard">
              <a>
                <Icon
                  as={BsAward}
                  fontSize={30}
                  color={!isHome ? 'blue.500' : color}
                />
              </a>
            </Link>
          </Flex>
        </Grid>
      </Flex>

      <Button
        w="40px"
        h="40px"
        bgColor="transparent"
        onClick={toggleColorMode}
        justifySelf="end"
      >
        <Icon
          w={6}
          h={6}
          as={colorMode === 'light' ? FiMoon : FiSun}
          color={color}
        />
      </Button>
    </Flex>
  );
}
