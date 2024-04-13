import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const MenuButton = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Menu button for small screen */}
      <IconButton
        display={{ base: 'block', md: 'none' }}
        aria-label="Open Menu"
        icon={<i className="fa fa-bars" />}
        onClick={onClose}
      />
      {/* Drawer for small screen */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              textAlign={'center'}
              fontSize={'2xl'}
              fontWeight={500}
              mt={'1.5'}
              as={ReactRouterLink}
              to="/"
              onClick={onClose}
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
                onClick={onClose}
                fontSize={'lg'}
              >
                Blogs List
              </Button>
              <Button
                w="100%"
                mb={2}
                variant="ghost"
                as={ReactRouterLink}
                to="/createblog"
                onClick={onClose}
                fontSize={'lg'}
              >
                Create Blog
              </Button>
              {/* Add more menu items here */}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default MenuButton;
