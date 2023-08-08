import React, { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user } = useSelector(state => ({ ...state.auth }));
  const [logedUser, setLogedUser] = useState(user);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // console.log(user?result._id);

  const navBgColor = useColorModeValue('#f9fafb', '#000000');
  const logoColor = useColorModeValue('#000000', '#FFFFFF');
  const tabsColor = useColorModeValue('#111827', '#E5E7EB');
  const profileMenuColor = useColorModeValue('#111827', '#E5E7EB');

  const widthTabs = user?.result?._id
    ? { md: '40%', lg: '30%', xl: '25%', '2xl': '15%' }
    : { md: '40%', lg: '30%', xl: '25%', '2xl': '20%' };

  return (
    <Box bg={navBgColor} p={'20px'} w={'100%'} pos={'fixed'} top={0} left={0}>
      <Flex alignItems="center">
        <Spacer />
        <Box>
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            fontSize={'20px'}
            fontWeight={500}
            color={logoColor}
            _hover={{ textDecoration: 'none' }}
          >
            Blogger
          </ChakraLink>
        </Box>
        <Spacer />
        <Spacer />
        <Box
          w={widthTabs}
          ml={4}
          display={{ base: 'none', md: 'flex' }}
          color={'#FFFFFF'}
          alignItems={'center'}
        >
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            _hover={{ textDecoration: 'none' }}
            color={tabsColor}
          >
            Blogs List
          </ChakraLink>
          <Spacer />
          <ChakraLink
            _hover={{ textDecoration: 'none' }}
            as={ReactRouterLink}
            to="/"
            color={tabsColor}
          >
            Create Blog
          </ChakraLink>
          <Spacer />
          {user?.result?._id ? (
            <Menu>
              <MenuButton color={profileMenuColor}>
                <Flex alignItems={'center'}>
                  <Avatar name={user?.result?.name[0]} size="sm" />
                  <Text ml={'5px'} fontWeight={600}>
                    {user?.result?.name.split(' ')[0]}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList color={profileMenuColor}>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Flex alignItems="center" w={'33%'}>
              {' '}
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                as={ReactRouterLink}
                to="/login"
                color={tabsColor}
              >
                Login
              </ChakraLink>
              <Spacer />
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                as={ReactRouterLink}
                to="/register"
                color={tabsColor}
              >
                Signup
              </ChakraLink>
            </Flex>
          )}
        </Box>
        <Spacer />
        <Spacer />
        <ColorModeSwitcher
          justifySelf="flex-end"
          color={tabsColor}
          fontSize={'20px'}
          _hover={{ bg: { navBgColor } }}
        />
        <Spacer />
        {/* Menu button for small screen */}
        <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Open Menu"
          icon={<i className="fa fa-bars" />}
          onClick={toggleDrawer}
        />
      </Flex>
      {/* Drawer for small screen */}
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={toggleDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              textAlign={'center'}
              fontSize={'20px'}
              fontWeight={500}
              mt={'1.5'}
            >
              Blogger
            </DrawerHeader>
            <DrawerBody>
              <Button w="100%" mb={2} variant="ghost">
                Blogs List
              </Button>
              <Button w="100%" mb={2} variant="ghost">
                Create Blog
              </Button>
              <Button w="100%" mb={2} variant="ghost">
                Login
              </Button>
              <Button w="100%" variant="ghost">
                Signup
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Header;
