import React from 'react';
import { Spinner as ChakraSpinner, Box, Text, Heading } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <ChakraSpinner
        thickness="6px"
        speed="1s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />{' '}
      <Heading as={'h2'} ml={2}>
        {'Loading...'}
      </Heading>
    </Box>
  );
};

export default Spinner;
