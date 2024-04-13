import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Icon,
  Spacer,
  useColorMode,
  Avatar,
  Divider,
  SimpleGrid,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  deleteBlog,
  getBlogsByUser,

  // followUser,
  // unfollowUser,
} from '../redux/features/blogSlice';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useToast } from '@chakra-ui/react';
import Spinner from '../components/Spinner';
import BlogCard from '../components/BlogCard';
import { GoVerified } from 'react-icons/go';

import {
  followUser,
  unfollowUser,
  getCreaterDetails,
} from '../redux/features/authSlice'; // Corrected import statements
import { apiUrl } from '../utils/constants';

// const apiUrl = 'http://localhost:8000';

const Dashboard = () => {
  const { user, followers, following, followUnFollow, buttonDisable } =
    useSelector(state => ({
      ...state.auth,
    }));
  const { loading, userBlogs, creatorDetails } = useSelector(state => ({
    ...state.blog,
  }));
  // const [userFollowers, setUserFollowers] = useState(followersCount);

  const { id } = useParams();

  const userId = id ? id : user?.result?._id;
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (userId) {
      dispatch(getBlogsByUser(userId));
      dispatch(getCreaterDetails(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this blog ?')) {
      dispatch(deleteBlog({ id, toast }));
    }
  };

  // Function to handle follow user action
  const handleFollow = () => {
    if (!user) {
      return toast({
        position: 'top',
        title: 'Login Required',
        // description: 'Login Required',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch(followUser({ userId, userDetails: user?.result }));
  };

  // Function to handle unfollow user action
  const handleUnfollow = () => {
    dispatch(unfollowUser({ userId }));
  };

  // const followUnFollow = creatorDetails?.following?.includes(userId);
  let followUnFollowcheck = null;
  // useEffect(() => {
  //   if (followers) {
  //     for (let i = 0; i < followers.length; i++) {
  //       let obj = followers[i];
  //       for (let key in obj) {
  //         if (obj[key] === user?.result?._id) {
  //           followUnFollowcheck = true;
  //         }
  //       }
  //     }
  //   }
  // }, [userFollowers]);

  // if (followers) {
  //   for (let i = 0; i < followers.length; i++) {
  //     let obj = followers[i];
  //     for (let key in obj) {
  //       if (obj[key] === user?.result?._id) {
  //         followUnFollow = true;
  //       }
  //     }
  //   }
  // }

  if (followers) {
    for (let i = 0; i < followers.length; i++) {
      let obj = followers[i];
      for (let key in obj) {
        if (obj[key] === user?.result?._id) {
          followUnFollowcheck = true;
        }
      }
    }
  }

  const followornot = followUnFollow ? followUnFollow : followUnFollowcheck;

  // let followersLength = followers?.length;
  // useEffect(() => {
  //   if (followers) {
  //     followersLength = followers?.length;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [followers]);

  // Step 2: Create a state variable to control the modal
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);

  // Step 3: Create a function to open and close the modal
  const openFollowersModal = () => {
    setIsFollowersModalOpen(true);
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  // Step 3: Create a function to open and close the Following modal
  const openFollowingModal = () => {
    setIsFollowingModalOpen(true);
  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  return (
    <Box
      w={'100%'}
      minH={'100vh'}
      pt={'75px'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Box
          margin="auto"
          w={{ base: '100%', sm: '100%', md: '90%', lg: '80%', xl: '75%' }}
          textAlign="center"
          align="center"
        >
          {creatorDetails && (
            <Flex
              align="center"
              flexDirection="column"
              mb={4}
              p={4}
              borderRadius={'md'}
            >
              {/* Display Follow/Unfollow button */}

              <Avatar
                size="xl"
                src={creatorDetails?.imgpath}
                alt={creatorDetails?.name}
              />
              <Box display={'flex'} alignItems={'center'} mt={2}>
                <Text fontSize="xl" fontWeight="bold">
                  {creatorDetails?.name}
                </Text>
                {creatorDetails?.isVerified && (
                  <Icon as={GoVerified} ml={1} color={'blue.500'} />
                )}
              </Box>
              <Box
                display={'flex'}
                m={'auto'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                {(!user || user?.result?._id !== userId) && (
                  <Button
                    mr={2}
                    size={'sm'}
                    isDisabled={buttonDisable}
                    color={!followornot ? '#FFFFFF' : null}
                    bg={!followornot ? '#0095f6' : null}
                    onClick={followornot ? handleUnfollow : handleFollow}
                    _hover={followornot ? null : { background: '#0095f6' }}

                    // border={followUnFollow && '1px solid'}
                  >
                    {followornot ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
                <Modal
                  isOpen={isFollowersModalOpen}
                  onClose={closeFollowersModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Followers</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* Step 5: Map through followers data and display avatars and names */}
                      {followers &&
                        followers.map(follower => (
                          <Link
                            to={`/user/${follower._id}`}
                            onClick={() => {
                              closeFollowersModal();
                            }}
                          >
                            <Flex key={follower._id} alignItems="center" mt={2}>
                              <Avatar
                                size="sm"
                                src={follower.imgpath}
                                alt={follower.name}
                              />
                              <Text ml={2}>{follower.name}</Text>
                            </Flex>
                          </Link>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" onClick={closeFollowersModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {/* Display Followers/Following counts */}

                <Modal
                  isOpen={isFollowingModalOpen}
                  onClose={closeFollowingModal}
                >
                  <ModalOverlay />
                  <ModalContent
                    maxW="md" /* Set the maximum width of the modal */
                  >
                    <ModalHeader>Following</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                      maxHeight="80vh" /* Set the maximum height of the modal body */
                      overflowY="auto" /* Enable vertical scrollbar when content overflows */
                    >
                      {/* Step 7: Map through following data and display avatars and names */}
                      {following &&
                        following.map(followedUser => (
                          <Link
                            to={`/user/${followedUser._id}`}
                            onClick={() => {
                              closeFollowingModal();
                            }}
                          >
                            <Flex
                              key={followedUser._id}
                              alignItems="center"
                              mt={2}
                            >
                              <Avatar
                                size="sm"
                                src={followedUser.imgpath}
                                alt={followedUser.name}
                              />
                              <Text ml={2}>{followedUser.name}</Text>
                            </Flex>
                          </Link>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" onClick={closeFollowingModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Text
                  mr={2}
                  fontWeight={600}
                  onClick={() => {
                    followers.length && openFollowersModal();
                  }}
                  cursor={'pointer'}
                >
                  Followers: {followers?.length}
                </Text>
                <Text
                  fontWeight={600}
                  onClick={() => {
                    following.length && openFollowingModal(); // Step 4: Attach an event handler to open the Following modal
                  }}
                  cursor={'pointer'}
                >
                  Following: {following?.length}
                </Text>
              </Box>
              <Text
                w={{ base: '100%', sm: '100%', md: '100%', lg: '50%' }}
                fontSize="md"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                mt={2}
                fontWeight={600}
              >
                {creatorDetails?.bio}
              </Text>
              <Divider mt={1} borderColor={'gray.400'} />
            </Flex>
          )}
          {!loading && userBlogs?.length === 0 && (
            <Text>
              No blogs available with the user: {creatorDetails?.name}
            </Text>
          )}

          {!loading && userBlogs && (
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={4} mt={-2} p={2}>
              {userBlogs &&
                userBlogs.map(item => <BlogCard key={item._id} {...item} />)}
            </SimpleGrid>
          )}
          {/* Rest of your code */}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
