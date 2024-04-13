// theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'dark', // Set the default color mode to dark
  fonts: {
    // body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
  },
});

export default theme;
