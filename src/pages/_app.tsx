import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import NextNProgress from 'nextjs-progressbar';
import { ChakraProvider } from '@chakra-ui/react';

import { Chakra } from '../Chakra';
import { theme } from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Chakra cookies={pageProps.cookies}>
        <NextAuthProvider session={pageProps.session}>
          <NextNProgress
            color="#4953B8"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </NextAuthProvider>
      </Chakra>
    </ChakraProvider>
  );
}

export { getServerSideProps } from '../Chakra';
