import { Box, Image, useColorMode } from '@chakra-ui/react';
import React from 'react';

const NotFound = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      // mt={'100px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minH={'100vh'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
    >
      <Image src="/images/notfound-removebg.png" alt="Not Found" />
    </Box>
  );
};

export default NotFound;
