import React from 'react';
import { Box, Flex, Text, Icon, Link, Stack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      //   bg="#1d4ed8"
      //   color="#fff"
      py={8}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-around"
        alignItems="center"
        w="90%"
        maxW="1200px"
        mx="auto"
      >
        <Stack spacing={6} mb={{ base: 8, md: 0 }}>
          <Box display={'flex'} flexDirection={'column'} textAlign={'center'}>
            <Text fontSize="lg" fontWeight="bold">
              Quick Links
            </Text>
            <Link href="#">Home</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Contact</Link>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>
              Resources
            </Text>
            <Link href="/">Terms of Service</Link>
            <Link href="/"> Privacy Policy</Link>
          </Box>
        </Stack>

        <Stack spacing={6}>
          <Box textAlign={'center'}>
            <Text fontSize="lg" fontWeight="bold">
              Contact Us
            </Text>
            <Text>Email: rahulohol01@gmail.com</Text>
            <Text>Phone: +91 9359550443</Text>
          </Box>

          <Box>
            <Text
              fontSize="lg"
              fontWeight="bold"
              m={'auto'}
              textAlign={'center'}
            >
              Connect With Us
            </Text>
            <Box display={'flex'} justifyContent={'center'}>
              <Link href="#">
                <Icon as={FaFacebook} fontSize="xl" mr={4} />
              </Link>
              <Link href="#">
                <Icon as={FaTwitter} fontSize="xl" mr={4} />
              </Link>
              <Link href="#">
                <Icon as={FaInstagram} fontSize="xl" />
              </Link>
            </Box>
          </Box>
        </Stack>
      </Flex>
      <Text m={'auto'} textAlign={'center'} mt={6} fontWeight={600}>
        Made with ❤️ by Rahul Ohol
      </Text>
      <Text textAlign="center" mt={2} fontWeight={500}>
        &copy; 2023 Blogger. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
