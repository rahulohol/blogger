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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
// import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { FaFileImage } from 'react-icons/fa';

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
  const toast = useToast();

  useEffect(() => {
    error &&
      toast({
        position: 'top',
        title: error,
        // description: 'Blog created/Updated Successfully',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    // toast.error(error);
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

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast({
        title: 'Password and Confirm Password do not match.',
        status: 'error',
        isClosable: true,
      });
    }
    if (email && password && firstName && lastName && confirmPassword) {
      console.log(formValue);
      dispatch(register({ formValue, config, navigate }));
    }
  };

  const colorHeading = useColorModeValue('gray.900', 'white');

  const bgColorMode = useColorModeValue('#ffffff', '#0d0c11');

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
      minH={'100vh'}
      bg={bgColorMode}
      pt={['50px', '70px', '50px']}
    >
      <Box
        m="auto"
        p="15px"
        pb={'40px'}
        mt={'50px'}
        // maxW="450px"
        maxW={['98%', '450px', '500px']}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        // bg={colorLoginBox}
        borderRadius={'sm'}
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
            boxSize={8}
          />
          <Heading
            as={'h2'}
            fontSize={'1.875rem'}
            color={colorHeading}
            fontWeight={800}
            mt={2}
          >
            Create Account
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

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Box position="relative" overflow="hidden">
                  <Button
                    as="label"
                    htmlFor="imageInput"
                    // colorScheme="purple"
                    border={'1px dashed gray'}
                    width="100%"
                    fontSize="17px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    padding="10px"
                    borderRadius="5px"
                    transition="background-color 0.2s"
                  >
                    {!formValue.imageFile ? 'Add Image' : 'Image Added'}
                    <FaFileImage size={18} style={{ marginLeft: '8px' }} />
                  </Button>
                  <Input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    display="none"
                    onChange={event => {
                      const file = event.target.files[0];
                      setFormValue({ ...formValue, imageFile: file });
                    }}
                  />
                </Box>
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
