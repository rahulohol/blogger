import {
  Box,
  Icon,
  Text,
  Heading,
  useColorModeValue,
  VStack,
  FormControl,
  Input,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const [show, setShow] = useState(false);

  const colorHeading = useColorModeValue('gray.900', 'white');

  const bgColorMode = useColorModeValue('#ffffff', '#16151e');

  const colorLoginBox = useColorModeValue('#ffffff', '#16151e');
  const userIconColor = useColorModeValue('gray.600', 'gray.300');

  const borderColor = useColorModeValue('transparent', 'gray');

  // const breakpoints = {
  //   sm: '30em', // 480px
  //   md: '48em', // 768px
  //   lg: '62em', // 992px
  //   xl: '80em', // 1280px
  //   '2xl': '96em', // 1536px
  // };
  const handleClick = () => setShow(!show);

  const onInputChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email && password) {
      //  dispatch(login({ formValue, navigate, toast }));
      console.log('email & password ->', email, password);
    }
  };

  return (
    <Box
      w={'100%'}
      h={'100vh'}
      bg={bgColorMode}
      pt={['70px', '120px', '120px']}
    >
      <Box
        m="auto"
        p="15px"
        pb={'40px'}
        // maxW="450px"
        maxW={['98%', '450px', '450px']}
        boxShadow="lg"
        bg={colorLoginBox}
        borderRadius={'md'}
        box-shadow=" box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        border={`1px solid ${borderColor}`}
      >
        <Box
          w={'100%'}
          display={'flex'}
          textAlign="center"
          justifyContent={'center'}
          flexDirection={'column'}
          pt={'15px'}
        >
          <Icon
            as={FaUserCircle}
            fontSize="30px"
            color={userIconColor}
            display="block"
            justifyContent={'center'}
            alignSelf={'center'}
          />
          <Heading
            as={'h2'}
            fontSize={'1.875rem'}
            color={colorHeading}
            fontFamily={
              'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'
            }
            fontWeight={800}
          >
            Sign In
          </Heading>
        </Box>
        <Box mt={'25px'}>
          <form onSubmit={handleSubmit}>
            <VStack spacing="4">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={onInputChange}
                  // variant="flushed"
                  placeholder="Enter Email"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup
                // size="md"
                >
                  <Input
                    // pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    name="password"
                    onChange={onInputChange}
                    placeholder="Enter Password"
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                leftIcon={<FiLock />}
                w={'100%'}
                type="submit"
                bg="#4f46e5"
                borderRadius={'md'}
                mt={'15px'}
                color={'#FFFFFF'}
                _hover={{
                  bg: '#4f46e5',
                  opacity: 0.9,
                }}
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </Box>
        <Box w={'100%'} textAlign={'center'} mt={'15px'}>
          <ChakraLink
            as={ReactRouterLink}
            to="/register"
            textDecoration={'none'}
          >
            Don't have an account? Sign Up
          </ChakraLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

{
  /* <Box textAlign="center" fontSize="xl">
  <Grid minH="100vh" p={3}>
    <ColorModeSwitcher justifySelf="flex-end" />
  </Grid>
</Box>; */
}
