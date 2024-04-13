import {
  Box,
  Flex,
  VStack,
  useColorMode,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

const Admin = () => {
  const { colorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebar = (
    <VStack
      spacing="4"
      p="4"
      align="stretch"
      bg={colorMode === 'dark' ? '#2d3748' : 'gray.200'}

      // mt={{ base: '80px', sm: '80px' }}
    >
      {/* Sidebar Items */}
      <Box
        p="2"
        color={colorMode === 'dark' ? '#FFFFFF' : 'gray.600'}
        _hover={{ bg: 'gray.300', cursor: 'pointer' }}
      >
        Users
      </Box>
      <Box
        p="2"
        color={colorMode === 'dark' ? '#FFFFFF' : 'gray.600'}
        _hover={{ bg: 'gray.300', cursor: 'pointer' }}
      >
        Users
      </Box>
      {/* Add more sidebar items here */}
    </VStack>
  );

  return (
    <Box
      minH={'100vh'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
      pt={'73px'}
    >
      <Flex>
        {/* Menu Icon */}
        <IconButton
          icon={<HamburgerIcon />}
          position="fixed"
          top="20px"
          left="20px"
          zIndex="999"
          onClick={toggleDrawer}
          display={{ base: 'block', md: 'none' }}
          mt={{ base: '60px', sm: '60px' }}
        />
        {/* Drawer */}

        <Drawer placement="left" onClose={toggleDrawer} isOpen={isDrawerOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Sidebar</DrawerHeader>
            <DrawerBody>{sidebar}</DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* Sidebar */}
        <Box
          w={{ base: '0', md: '250px' }}
          h="100vh"
          borderRight={'1px solid'}
          borderColor={'gray.400'}
          textAlign={'center'}
          display={{ base: 'none', md: 'block' }}
          bg={colorMode === 'dark' ? '#2d3748' : 'gray.200'}
        >
          {sidebar}
        </Box>
        {/* Main Content */}
        <Box flex="1" p="4">
          {/* Content goes here */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Admin;
