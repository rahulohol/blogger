import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, useColorMode } from '@chakra-ui/react';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Box
      w={'100%'}
      minH={'100vh'}
      pt={'100px'}
      bg={colorMode === 'dark' ? '#16151e' : '#FFFFFF'}
    >
      <Box m={'auto'} textAlign={'center'}>
        <Heading as={'h6'} size={{ base: 'sm', sm: 'sm', md: 'md' }} pt={1}>
          Please login to continue...
        </Heading>
        <Heading as={'h6'} size={{ base: 'sm', sm: 'sm', md: 'md' }} pt={1}>
          Redirecting you to login in {count} seconds
        </Heading>
      </Box>
    </Box>
  );
};

export default LoadingToRedirect;
