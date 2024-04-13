import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  // Spinner,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import moment from 'moment';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import { GoVerified } from 'react-icons/go';
import {
  getRelatedBlogs,
  getBlog,
  getCreaterDetails,
  deleteBlog,
  likeBlog,
} from '../redux/features/blogSlice';
import RelatedBlogs from '../components/RelatedBlogs';
// import { Link } from 'react-router-dom';

// import DisqusThread from '../components/DisqusThread';
import {
  FaLongArrowAltLeft,
  FaCalendarAlt,
  FaShare,
  FaEye,
} from 'react-icons/fa';
import { CgMoreVertical } from 'react-icons/cg';
import { IoMdMore } from 'react-icons/io';
import { FaComment } from 'react-icons/fa';
import { BiBarChart } from 'react-icons/bi';
// import { BiSolidCommentDetail } from 'react-icons/bi';
// import { BiSolidCommentDetail } from 'react-icons/bi';

import { CopyIcon, DragHandleIcon } from '@chakra-ui/icons';

import { ImWhatsapp } from 'react-icons/im';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import icons from the Font Awesome icon set

import DisqusThread from '../components/DisqusThread';
import { set } from 'lodash';
import CommentList from '../components/CommentList';
import Comment from '../components/Comment';
import { apiUrl } from '../utils/constants';
import ShowLikes from '../components/ShowLikes';
import Spinner from '../components/Spinner';

// const apiUrl = 'http://localhost:8000';

const SingleBlog = () => {
  const [blogdata, setBlogData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { blog, relatedBlogs, buttonDisable, loading } = useSelector(state => ({
    ...state.blog,
  }));
  const { user } = useSelector(state => ({ ...state.auth }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = blog?.tags;
  const viewCount = Math.floor(blog?.views / 2) || 0;

  const { colorMode } = useColorMode();
  const toast = useToast();

  const commentSectionRef = useRef(null);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const apiUrl = 'http://localhost:8000';

  useEffect(() => {
    tags && dispatch(getRelatedBlogs(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id)); // Fetch the blog details
    }
  }, [id]);

  // console.log(blog);

  // useEffect(() => {
  //   if (blog?.creator) {
  //     dispatch(getCreaterDetails(blog.creator)); // Dispatch action to get creator detailsss
  //   }
  // }, [blog]);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this blog ?')) {
      dispatch(deleteBlog({ id }));
    }

    navigate('/blogslist');
  };

  const handleItemClick = () => {
    setIsOpen(false); // Close the menu when an option is clicked
  };

  console.log(blog);

  const updateTextColor = () => {
    // Select the Box by its id
    const contentBox = document.getElementById('content-box');

    if (contentBox) {
      // Find all HTML elements within the Box
      const elements = contentBox.getElementsByTagName('*');

      // Iterate through the elements and set their text color
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.color = colorMode === 'dark' ? '#FFFFFF' : '#000';
      }
    }
  };

  useEffect(() => {
    // Run the updateTextColor function immediately when the component mounts
    updateTextColor();
  }, [colorMode, blog]);

  const handleLike = () => {
    dispatch(likeBlog({ _id: id }));
  };

  const handleLikeAlert = () => {
    toast({
      position: 'top',
      title: 'Please Login to like the blog',
      status: 'warning',
      isClosable: true,
    });
  };

  const handleShareButtonClickedCopy = async () => {
    const blogUrl = window.location.href; // Replace with the actual URL
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast({
        title: 'URL copied to clipboard',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to copy URL: ', error);
      toast({
        title: 'Failed to copy URL',
        status: 'error',
        duration: 3000,
      });
    }
    handleCloseShareModal();
  };

  const handleShareButtonClicked = platform => {
    const blogUrl = window.location.href; // Replace with your actual URL
    let shareUrl;

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          blogUrl
        )}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          blogUrl
        )}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          blogUrl
        )}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          'Check out this blog: '
        )}&url=${encodeURIComponent(blogUrl)}`;
        break;
      default:
        shareUrl = blogUrl;
        break;
    }

    window.open(shareUrl, '_blank');
    handleCloseShareModal();
  };

  return (
    <Box
      w={'100%'}
      pt={'90px'}
      pb={'50px'}
      h={'100%'}
      minH={'100vh'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
    >
      <Box
        w={{ base: '99%', sm: '100%', md: '95%', lg: '80%', xl: '73%' }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        margin={'auto'}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p={{ base: '2%', sm: '2%', md: '2%', lg: '2%', xl: '1%' }}
      >
        <Box
          w={'100%'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Link to={`/user/${blog.creator}`}>
            <Box display={'flex'} alignItems={'center'}>
              <Avatar name={blog?.name} size="sm" src={blog?.creatorImage} />
              <Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text
                    fontWeight={600}
                    ml={'7px'}
                    fontSize={{
                      base: '14px',
                      sm: '15px',
                      md: '16px',
                    }}
                  >
                    {blog.name}
                  </Text>
                  {blog?.isVerified && (
                    <Icon as={GoVerified} ml={1} color={'blue.500'} />
                  )}
                </Box>
                <Text ml={'7px'} display={'flex'} alignItems={'center'}>
                  {/* <Icon as={FaCalendarAlt} mr={1} /> */}
                  <Text as="small" color="gray" fontWeight={500}>
                    Published on{' '}
                    {moment(blog.createdAt).format('ddd MMM DD YYYY')}
                  </Text>
                </Text>
              </Box>
            </Box>
          </Link>
          {(user?.result?._id === blog.creator ||
            user?.result?.role === 'admin') && (
            <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<IoMdMore />}
                bg="transparent"
                fontSize="25px"
                onClick={() => setIsOpen(!isOpen)}
              />
              <MenuList
                minWidth="120px"
                position="absolute"
                bottom="-20"
                left="-20"
                top=".5"
              >
                <MenuItem
                  icon={<MdEdit />}
                  onClick={() => {
                    navigate(`/editblog/${blog._id}`);
                  }}
                  fontSize={'17px'}
                  fontWeight={600}
                  // bg={'orange'}
                  // rounded={'md'}
                  // color={'#FFFFFF'}
                  // h={'50%'}
                >
                  Edit
                </MenuItem>
                <Divider />
                <Divider />
                <MenuItem
                  icon={<MdDelete />}
                  onClick={() => {
                    handleDelete(blog._id);

                    // setIsOpen(false);
                  }}
                  // bg={'red.500'}
                  fontSize={'17px'}
                  fontWeight={600}
                  // rounded={'md'}
                  // color={'#FFFFFF'}
                  // h={'50%'}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
        {blog.category && (
          <Box display={'flex'} alignItems={'center'}>
            {/* <DragHandleIcon fontWeight={600} boxSize={3} color={'blue.500'} /> */}
            <Text
              color={colorMode === 'dark' ? 'purple.400' : 'purple.500'}
              fontWeight={600}
              ml={1}
              // fontStyle={'italic'}
              fontSize={{
                base: '14px',
                sm: '15px',
                md: '16px',
              }}
            >
              Category : {blog.category}
            </Text>
          </Box>
        )}
        <Text
          ml={1}
          fontWeight={600}
          color={colorMode === 'dark' ? 'purple.400' : 'purple.500'}
          fontStyle={'italic'}
          fontSize={{
            base: '14px',
            sm: '15px',
            md: '16px',
          }}
        >
          Tags :{' '}
          {blog &&
            blog.tags &&
            blog.tags.map(item => (
              <Box as="span" key={item}>
                <Link to={`/blogs/tag/${item}`}>#{item} </Link>
                {/* #{item}{' '} */}
              </Box>
            ))}
        </Text>

        <Box
          as="img"
          // src={`${apiUrl}/uploads/${blog?.imgpath}`}
          src={blog?.imgpath}
          alt={blog.title}
          w="100%"
          mt={3}
          maxH="600px"
          objectFit={'contain'}
        />

        <Box pt={2}>
          <Heading
            as={'h1'}
            lineHeight={{ base: '25px', sm: '35px', md: '40px' }}
            fontSize={{ base: '20px', sm: '25px', md: '30px', lg: '36px' }}
          >
            {blog.title}
          </Heading>
          {
            <Box
              mt={'10px'}
              as={'p'}
              mb={2}
              overflow={'hidden'}
              // dangerouslySetInnerHTML={{ __html: htmlContent }}
              id="content-box"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />

            /* <Box
              mt={'10px'}
              as={'p'}
              color={colorMode === 'dark' ? '#FFFFFF' : 'black'}
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            /> */

            /* <Box mt={'10px'} as={'p'}>
              {blog?.description?.split('\n').map(item => (
                <Text
                  mb={2.5}
                  fontSize={{
                    base: '14px',
                    sm: '15px',
                    md: '16px',
                  }}
                >
                  {item}
                </Text>
              ))}
            </Box> */
          }
          <Divider mt={1} mb={2} />
          <Flex>
            <Flex alignItems="center" mr={1}>
              <Icon as={BiBarChart} /> {/* Step 2: Display the eye icon */}
              <Text fontSize="md">
                {viewCount} views {/* Step 3: Display the view count */}
              </Text>
            </Flex>
            <Button
              w={'80px'}
              variant="link"
              isDisabled={buttonDisable}
              onClick={!user?.result ? handleLikeAlert : handleLike}
              mr={1}
            >
              <ShowLikes likes={blog?.likes} />
            </Button>
            <IconButton
              aria-label="Comment"
              // icon={BiSolidCommentDetail}
              icon={<FaComment />}
              onClick={scrollToCommentSection}
            />
            <IconButton
              aria-label="Share"
              icon={<Icon as={FaShare} />} // Replace YourShareIcon with your share icon
              onClick={() => handleShareClick()}
              ml={2}
            />
            {isShareModalOpen && (
              <Modal isOpen={isShareModalOpen} onClose={handleCloseShareModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Share this Blog</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {/* Add the shareable URL input field and share button */}
                    <Input
                      type="text"
                      value={window.location.href} // Replace with the actual URL
                      isReadOnly
                      size="lg"
                      mb={2}
                    />
                    <IconButton
                      onClick={() => handleShareButtonClicked('whatsapp')}
                      colorScheme="green"
                      icon={<ImWhatsapp />} // Replace with the WhatsApp icon
                      aria-label="Share on WhatsApp"
                      size="lg"
                      mb={2}
                      mr={2}
                    />
                    <IconButton
                      onClick={() => handleShareButtonClicked('linkedin')}
                      colorScheme="linkedin"
                      icon={<FaLinkedin />} // Replace with the LinkedIn icon
                      aria-label="Share on LinkedIn"
                      size="lg"
                      mb={2}
                      mr={2}
                    />
                    <IconButton
                      onClick={() => handleShareButtonClicked('facebook')}
                      colorScheme="facebook"
                      icon={<FaFacebook />} // Replace with the Facebook icon
                      aria-label="Share on Facebook"
                      size="lg"
                      mb={2}
                      mr={2}
                    />
                    <IconButton
                      onClick={() => handleShareButtonClicked('twitter')}
                      colorScheme="twitter"
                      icon={<FaTwitter />} // Replace with the Twitter icon
                      aria-label="Share on Twitter"
                      size="lg"
                      mb={2}
                      mr={2}
                    />
                    <IconButton
                      onClick={() => handleShareButtonClickedCopy()}
                      colorScheme="blue"
                      icon={<CopyIcon />} // Replace with the copy icon
                      aria-label="Copy URL"
                      size="lg"
                      mb={2}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </Flex>
        </Box>
        <RelatedBlogs relatedBlogs={relatedBlogs} blogId={id} />
        <Box>
          <Comment blogId={id} reference={commentSectionRef} />
        </Box>
        <CommentList blogId={id} />
        {/* <Comment blogId={id} />
        <CommentList blogId={id} /> */}
      </Box>
    </Box>
  );
};

export default SingleBlog;
