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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

import { googleSignIn, login } from '../redux/features/authSlice';
import { GoogleLogin } from 'react-google-login';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const [show, setShow] = useState(false);

  const { user } = useSelector(state => ({ ...state.auth }));
  const [logedUser, setLogedUser] = useState(user);

  const { loading, error } = useSelector(state => ({ ...state.auth }));

  const chkkratoast = useToast();

  useEffect(() => {
    console.log(error);
    error &&
      error !== '' &&
      chkkratoast({
        title: `${error}`,
        status: 'error',
        isClosable: true,
      });
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const onInputChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, chkkratoast }));
      console.log(user);
      // if (user?.result?._id) {

      // }
    }
  };

  useEffect(() => {
    if (user?.result?._id) {
      chkkratoast({
        title: 'Login Successfully',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/');
    }
  }, [user]);

  // const googleSuccess = resp => {
  //   console.log(resp);
  // const email = resp?.profileObj?.email;
  // const name = resp?.profileObj?.name;
  // const token = resp?.tokenId;
  // const googleId = resp?.googleId;
  // const result = { email, name, token, googleId };
  // dispatch(googleSignIn({ result, navigate, toast }));
  // };
  // const googleFailure = error => {
  //   toast.error(error);
  // };

  const colorHeading = useColorModeValue('gray.900', 'white');

  const bgColorMode = useColorModeValue('#ffffff', '#16151e');
  const colorLoginBox = useColorModeValue('#ffffff', '#16151e');
  const userIconColor = useColorModeValue('gray.600', 'gray.300');

  const borderColor = useColorModeValue('transparent', 'gray');
  const googleLoginBtnBgColor = useColorModeValue('#FFFFFF', '#1a202c');
  const googleLoginBtnTextColor = useColorModeValue('black', '#FFFFFF');

  // const breakpoints = {
  //   sm: '30em', // 480px
  //   md: '48em', // 768px
  //   lg: '62em', // 992px
  //   xl: '80em', // 1280px
  //   '2xl': '96em', // 1536px
  // };

  return (
    <Box
      w={'100%'}
      h={'100vh'}
      mt={'50px'}
      bg={bgColorMode}
      pt={['50px', '70px', '100px']}
    >
      <Box
        m="auto"
        p="15px"
        pb={'40px'}
        maxW={['98%', '450px', '480px']}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        bg={colorLoginBox}
        borderRadius={'sm'}
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
                isLoading={loading}
                spinner={<BeatLoader size={8} color="white" />}
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </Box>
        {/* <GoogleLogin
          clientId="544318968857-fu2c0luniuolgmk4uk90sq5nq48ov6lu.apps.googleusercontent.com"
          render={renderProps => (
            <Button
              // leftIcon={<FiLock />}
              variant="outline"
              mt={'15px'}
              leftIcon={<FcGoogle fontSize="25px" />}
              style={{ width: '100%' }}
              color={googleLoginBtnTextColor}
              bg={googleLoginBtnBgColor}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        /> */}

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
