import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Image, Icon, Grid, useBreakpointValue } from '@chakra-ui/react';
import { BsAward, BsHouseDoor } from 'react-icons/bs';

export function SideBar(): JSX.Element {
  const { asPath } = useRouter();
  const isHome = asPath === '/home';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="nav"
      w="100%"
      maxW="112px"
      h="100vh"
      py="32px"
      direction="column"
      bgGradient="linear(to-b, gray.100, gray.150);"
    >
      <Image
        src="/icons/logo-sidebar.svg"
        alt="Logo marca moveit"
        w={12}
        h={10}
        px={!isWideVersion && '2%'}
        mx="auto"
      />

      <Flex direction="column" my="auto" alignItems="center">
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
            px={!isWideVersion && '2%'}
          >
            <Link href="/home">
              <a>
                <Icon
                  as={BsHouseDoor}
                  color={isHome ? 'blue.500' : 'gray.600'}
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
            px={!isWideVersion && '2%'}
          >
            <Link href="/leaderboard">
              <a>
                <Icon
                  as={BsAward}
                  color={!isHome ? 'blue.500' : 'gray.600'}
                  fontSize={30}
                />
              </a>
            </Link>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
