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
  Icon,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { BiChevronDown } from 'react-icons/bi';
import { apiUrl } from '../utils/constants';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector(state => ({ ...state.auth }));
  const [logedUser, setLogedUser] = useState(user);

  const navigate = useNavigate();

  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // console.log(user?result._id);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  // const apiUrl = 'http://localhost:8000';

  // const navBgColor = useColorModeValue('#f9fafb', '#000000');
  const navBgColor = useColorModeValue('#FFFFFF', '#000000');
  const logoColor = useColorModeValue('#000000', '#FFFFFF');
  const tabsColor = useColorModeValue('#111827', '#E5E7EB');
  const profileMenuColor = useColorModeValue('#111827', '#E5E7EB');

  const widthTabs = user?.result?._id
    ? { md: '60%', lg: '45%', xl: '35%', '2xl': '30%' }
    : { md: '45%', lg: '35%', xl: '25%', '2xl': '22%' };

  return (
    <Box
      bg={navBgColor}
      p={'16px'}
      w={'100%'}
      pos={'fixed'}
      top={0}
      left={0}
      zIndex={5}
      borderBottom={'1px solid'}
      borderBottomColor={'#C8C8C8'}
    >
      <Flex alignItems="center">
        <Spacer />
        <Box>
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            fontSize={'20px'}
            fontWeight={'700'}
            fontFamily="Poppins,sans-serif"
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
          fontWeight={600}
        >
          <ChakraLink
            as={ReactRouterLink}
            to="/blogslist"
            _hover={{ textDecoration: 'none' }}
            color={tabsColor}
            fontWeight={500}
            fontFamily="Poppins,sans-serif"
          >
            Blogs Feed
          </ChakraLink>
          <Spacer />
          <ChakraLink
            _hover={{ textDecoration: 'none' }}
            as={ReactRouterLink}
            to="/createblog"
            color={tabsColor}
            fontWeight={500}
            fontFamily="Poppins,sans-serif"
          >
            Create Blog
          </ChakraLink>
          <Spacer />
          {user?.result?._id && (
            <ChakraLink
              _hover={{ textDecoration: 'none' }}
              as={ReactRouterLink}
              to="/dashboard"
              color={tabsColor}
              fontWeight={500}
              fontFamily="Poppins,sans-serif"
            >
              Dashboard
            </ChakraLink>
          )}
          {user?.result?._id && <Spacer />}
          {user?.result?._id ? (
            <Menu>
              <MenuButton color={profileMenuColor}>
                <Flex alignItems={'center'}>
                  <Avatar
                    name={user?.result?.name[0]}
                    size="sm"
                    src={user?.result?.imgpath}
                  />
                  <Text
                    ml={'5px'}
                    fontWeight={500}
                    fontFamily="Poppins,sans-serif"
                  >
                    Hi, {user?.result?.name.split(' ')[0]}
                  </Text>
                  <Icon as={BiChevronDown} />
                </Flex>
              </MenuButton>
              <MenuList color={profileMenuColor}>
                <MenuGroup
                  title="Profile"
                  as={'button'}
                  onClick={() => {
                    navigate('/dashboard');
                  }}
                >
                  <MenuItem
                    as={'button'}
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                  >
                    My Account
                  </MenuItem>
                  {user.result.role === 'admin' && (
                    <MenuItem
                      as={'button'}
                      onClick={() => {
                        navigate('/admin');
                      }}
                    >
                      Admin
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Flex
              alignItems="center"
              w={'36%'}
              justifyContent={'space-between'}
            >
              {' '}
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                as={ReactRouterLink}
                to="/login"
                color={tabsColor}
                fontWeight={500}
                fontFamily="Poppins,sans-serif"
              >
                Login
              </ChakraLink>
              <Spacer />
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                as={ReactRouterLink}
                to="/register"
                color={tabsColor}
                fontWeight={500}
                fontFamily="Poppins,sans-serif"
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
              fontSize={'2xl'}
              mt={'1.5'}
              as={ReactRouterLink}
              to="/"
              onClick={toggleDrawer}
              fontWeight={600}
              // fontWeight={500}
              fontFamily="Poppins,sans-serif"
            >
              Blogger
            </DrawerHeader>
            <DrawerBody>
              <Button
                w="100%"
                mb={2}
                variant="ghost"
                as={ReactRouterLink}
                to="/blogslist"
                onClick={toggleDrawer} // Close the Drawer when the link is clicked
                fontSize={'lg'}
                fontWeight={500}
                fontFamily="Poppins,sans-serif"
              >
                Blogs Feed
              </Button>
              <Button
                w="100%"
                mb={2}
                variant="ghost"
                as={ReactRouterLink}
                to="/createblog"
                onClick={toggleDrawer} // Close the Drawer when the link is clicked
                fontSize={'lg'}
                fontWeight={500}
                fontFamily="Poppins,sans-serif"
              >
                Create Blog
              </Button>
              {user ? (
                <>
                  <Button
                    w="100%"
                    mb={2}
                    variant="ghost"
                    as={ReactRouterLink}
                    to="/dashboard"
                    onClick={toggleDrawer} // Close the Drawer when the link is clicked
                    fontSize={'lg'}
                    fontWeight={500}
                    fontFamily="Poppins,sans-serif"
                  >
                    Dashboard
                  </Button>
                  {/* <Button
                    w="100%"
                    mb={2}
                    variant="ghost"
                    fontSize={'lg'}
                    onClick={() => {
                      handleLogout();
                      toggleDrawer(); // Close the Drawer when the button is clicked
                    }}
                  >
                    Logout
                  </Button> */}

                  <Menu>
                    <MenuButton
                      color={profileMenuColor}
                      display={'block'}
                      m={'auto'}
                    >
                      <Flex justifyContent={'center'} alignItems={'center'}>
                        <Avatar
                          name={user?.result?.name[0]}
                          size="sm"
                          src={user?.result?.imgpath}
                        />
                        <Text
                          // fontWeight={500}
                          // fontFamily="Poppins,sans-serif"
                          m={'auto'}
                          ml={'5px'}
                          textAlign={'center'}
                          fontWeight={500}
                          fontFamily="Poppins,sans-serif"
                        >
                          Hi, {user?.result?.name.split(' ')[0]}
                        </Text>
                        <Icon as={BiChevronDown} />
                      </Flex>
                    </MenuButton>
                    <MenuList color={profileMenuColor}>
                      <MenuGroup
                        title="Profile"
                        as={'button'}
                        onClick={() => {
                          navigate('/dashboard');
                        }}
                      >
                        <MenuItem
                          as={'button'}
                          onClick={() => {
                            navigate('/dashboard');
                          }}
                        >
                          My Account
                        </MenuItem>
                        {user.result.role === 'admin' && (
                          <MenuItem
                            as={'button'}
                            onClick={() => {
                              navigate('/admin');
                            }}
                          >
                            Admin
                          </MenuItem>
                        )}
                        <MenuItem onClick={() => handleLogout()}>
                          Logout
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    w="100%"
                    mb={2}
                    variant="ghost"
                    as={ReactRouterLink}
                    to="/login"
                    onClick={toggleDrawer} // Close the Drawer when the link is clicked
                    fontSize={'lg'}
                    fontWeight={500}
                    fontFamily="Poppins,sans-serif"
                  >
                    Login
                  </Button>
                  <Button
                    w="100%"
                    variant="ghost"
                    as={ReactRouterLink}
                    to="/register"
                    onClick={toggleDrawer} // Close the Drawer when the link is clicked
                    fontSize={'lg'}
                    fontWeight={500}
                    fontFamily="Poppins,sans-serif"
                  >
                    Signup
                  </Button>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Header;
