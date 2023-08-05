import {
  Box,
  Icon,
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
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

import { register } from '../redux/features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { loading, error } = useSelector(state => ({ ...state.auth }));

  const { email, password, firstName, lastName, confirmPassword } = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const onInputChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password should match');
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

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
        maxW={['98%', '450px', '500px']}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        bg={colorLoginBox}
        borderRadius={'md'}
        // box-shadow=" box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
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
            Sign Up
          </Heading>
        </Box>
        <Box mt={'25px'}>
          <form onSubmit={handleSubmit}>
            <VStack spacing="4">
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  type="test"
                  name="firstName"
                  onChange={onInputChange}
                  // variant="flushed"
                  placeholder="Enter firstName"
                  required
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="test"
                  name="lastName"
                  onChange={onInputChange}
                  // variant="flushed"
                  placeholder="Enter lastName"
                  required
                />
              </FormControl>
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
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup
                // size="md"
                >
                  <Input
                    // pr="4.5rem"
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    onChange={onInputChange}
                    placeholder="Enter Confirm Password"
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                      {showConfirm ? 'Hide' : 'Show'}
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
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
        <Box w={'100%'} textAlign={'center'} mt={'15px'}>
          <ChakraLink as={ReactRouterLink} to="/login" textDecoration={'none'}>
            Already have an account? Sign In
          </ChakraLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

{
  /* <Box textAlign="center" fontSize="xl">
  <Grid minH="100vh" p={3}>
    <ColorModeSwitcher justifySelf="flex-end" />
  </Grid>
</Box>; */
}
