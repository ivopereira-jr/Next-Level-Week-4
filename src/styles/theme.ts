import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '85.625em',
});

export const theme = extendTheme({
  config,
  breakpoints,
  colors: {
    gray: {
      '700': '#2E384D', // title
      '600': '#666666', // text
      '300': '#DCDDE0', // line
      '250': '#E5E5E5', // background
      '220': '#f2f4f5', // overlay
      '200': '#F2F3F5',
      '150': '#EBECED',
      '100': '#FFFFFF', // white
    },
    blue: {
      '600': '#4953B8',
      '500': '#5965E0',
      '400': '#2AA9E0',
      '200': '#B3B9FF',
      '100': '#F5FCFF',
    },
    green: {
      '600': '#3FB023',
      '500': '#4CD62B',
      '400': '#4DD82B',
      '100': '#F7FFF5',
    },
    red: {
      '500': '#E83F5B',
      '100': '#FFF5F5',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.250',
        color: 'gray.600',
      },
      Table: {
        borderCollapse: 'separate !important',
        borderSpacing: '0 8px',
      },
      th: {
        border: 'none !important',
      },
      td: {
        border: 'none !important',
      },
      '*, *::before, &::after': {
        borderColor: 'none',
      },
    },
  },
});
