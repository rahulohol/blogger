// import React, { useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Flex,
//   Text,
//   Icon,
//   Tooltip,
//   Image,
//   useColorMode,
//   useToast,
//   Avatar,
// } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { likeBlog } from '../redux/features/blogSlice';
// import { FaThumbsUp, FaThumbsUp as FarThumbsUp } from 'react-icons/fa';
// import { apiUrl } from '../utils/constants';
// import ShowLikes from './ShowLikes';

// const BlogCard = ({
//   imgpath,
//   description,
//   title,
//   tags,
//   _id,
//   name,
//   likes,
//   creatorImage,
// }) => {
//   const { user } = useSelector(state => ({ ...state.auth }));
//   const { buttonDisable } = useSelector(state => ({ ...state.blog }));

//   const userId = user?.result?._id || user?.result?.googleId;
//   // buttonDisable

//   const { colorMode } = useColorMode();

//   const toast = useToast();

//   const dispatch = useDispatch();
//   const excerpt = str => {
//     if (str.length > 45) {
//       str = str.substring(0, 45) + ' ...';
//     }
//     return str;
//   };

//   // const apiUrl = 'http://localhost:8000';

//   // const Likes = ({ likes }) => {
//   //   if (likes.length > 0) {
//   //     return likes.find(like => like === userId) ? (
//   //       <>
//   //         <Icon as={FaThumbsUp} color="blue.500" />
//   //         &nbsp;
//   //         {likes.length > 2 ? (
//   //           <Tooltip
//   //             label={`You and ${likes.length - 1} other people likes`}
//   //             aria-label="Likes"
//   //           >
//   //             <Text fontWeight="bold">{likes.length} Likes</Text>
//   //           </Tooltip>
//   //         ) : (
//   //           <Text as="span" fontWeight="bold">
//   //             {likes.length} Like{likes.length > 1 ? 's' : ''}
//   //           </Text>
//   //         )}
//   //       </>
//   //     ) : (
//   //       <>
//   //         <Icon as={FarThumbsUp} />
//   //         &nbsp;
//   //         {/* <Tooltip label="Please login to like tour" aria-label="Likes"> */}
//   //         <Text as="span" fontWeight="bold">
//   //           {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
//   //         </Text>
//   //         {/* </Tooltip> */}
//   //       </>
//   //     );
//   //   }
//   //   return (
//   //     <>
//   //       <Icon as={FarThumbsUp} />
//   //       &nbsp;
//   //       <Text as="span" fontWeight="bold">
//   //         Like
//   //       </Text>
//   //     </>
//   //   );
//   // };

//   const handleLike = () => {
//     dispatch(likeBlog({ _id }));
//   };

//   const handleLikeAleart = () => {
//     toast({
//       position: 'top',
//       title: 'Please Login to like the blog',
//       status: 'warning',
//       isClosable: true,
//     });
//   };

//   const updateTextColor = () => {
//     // Select the Box by its id
//     const contentBox = document.getElementById('content-box');

//     if (contentBox) {
//       // Find all HTML elements within the Box
//       const elements = contentBox.getElementsByTagName('*');

//       // Iterate through the elements and set their text color
//       for (let i = 0; i < elements.length; i++) {
//         const element = elements[i];
//         element.style.color = colorMode === 'dark' ? '#FFFFFF' : '#000';
//       }
//     }
//   };

//   useEffect(() => {
//     // Run the updateTextColor function immediately when the component mounts
//     updateTextColor();
//   }, [_id, description]);

//   return (
//     <Box
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       // bg={'#232433'}
//       // _hover={{
//       //   transition: 'transform 0.5s',
//       //   transform: 'scale(1.02)',
//       // }}
//       border={colorMode === 'light' && 'none'}
//       boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
//       // mt={2}
//       w={'100%'}
//     >
//       <Link to={`/blog/${_id}`}>
//         <Image
//           // src={`${apiUrl}/uploads/${imgpath}`}
//           src={imgpath}
//           alt={title}
//           // maxH="180px"
//           w={'100%'}
//           // _hover={{
//           //   transition: 'transform 0.7s',
//           //   transform: 'scale(1.05)',
//           // }}
//           objectFit="scale-down"
//         />
//       </Link>

//       <Flex p={2} pb={0} alignItems="center" justifyContent="space-between">
//         {/* <Text as="div" fontWeight="bold">
//           {name}
//         </Text> */}

//         {/* <Flex> */}
//         <Box
//           as="span"
//           className="tag-card"
//           color="blue.500"
//           display={'block'}
//           overflow="hidden" // Hide any overflowing content
//           textOverflow="ellipsis" // Add ellipsis (...) for hidden content
//           whiteSpace="nowrap" // Prevent wrapping to the next line
//         >
//           {tags.map(tag => (
//             <Link to={`/blogs/tag/${tag}`} key={tag}>
//               #{tag}&nbsp;
//             </Link>
//           ))}
//         </Box>
//         <Button
//           w={'80px'}
//           variant="link"
//           isDisabled={buttonDisable}
//           onClick={!user?.result ? handleLikeAleart : handleLike}
//           mr={1}
//         >
//           <ShowLikes likes={likes} />
//         </Button>
//         {/* </Flex> */}
//       </Flex>
//       <Text
//         as="div"
//         p={2}
//         pb={0}
//         mt={0}
//         textAlign={'left'}
//         fontWeight="bold"
//         display={'flex'}
//         alignItems={'center'}
//       >
//         <Avatar name={name} size="sm" src={creatorImage} />
//         <Text ml={2}>{name}</Text>
//       </Text>
//       <Box p={2} pt={1} textAlign={'start'}>
//         <Text fontWeight="bold">{title}</Text>
//         <Text>
//           <Box
//             // w={'90%'}
//             maxH="1.5em" // Adjust the height
//             id="content-box"
//             overflow="hidden"
//             textOverflow="ellipsis"
//             whiteSpace="nowrap"
//             dangerouslySetInnerHTML={{ __html: description }}
//           />
//           <Link to={`/blog/${_id}`}>
//             <Box as={'span'} color={'blue.500'}>
//               {' '}
//               ... Read More
//             </Box>
//           </Link>
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default BlogCard;

import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Tooltip,
  Image,
  useColorMode,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog } from '../redux/features/blogSlice';
import { FaThumbsUp, FaThumbsUp as FarThumbsUp } from 'react-icons/fa';
import { apiUrl } from '../utils/constants';
import ShowLikes from './ShowLikes';

const BlogCard = ({
  imgpath,
  description,
  title,
  tags,
  _id,
  name,
  likes,
  creatorImage,
}) => {
  const { user } = useSelector(state => state.auth);
  const { buttonDisable } = useSelector(state => state.blog);

  const userId = user?.result?._id || user?.result?.googleId;
  const { colorMode } = useColorMode();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog({ _id }));
  };

  const handleLikeAlert = () => {
    toast({
      position: 'top',
      title: 'Please Login to like the blog',
      status: 'warning',
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      border={colorMode === 'light' && 'none'}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      w="100%"
    >
      <Link to={`/blog/${_id}`}>
        <Image src={imgpath} alt={title} w="100%" objectFit="scale-down" />
      </Link>

      <Flex p={2} pb={0} alignItems="center" justifyContent="space-between">
        <Box
          as="span"
          className="tag-card"
          color="blue.500"
          display="block"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {tags.map(tag => (
            <Link to={`/blogs/tag/${tag}`} key={tag}>
              #{tag}&nbsp;
            </Link>
          ))}
        </Box>
        <Button
          w="80px"
          variant="link"
          isDisabled={buttonDisable}
          onClick={!user?.result ? handleLikeAlert : handleLike}
          mr={1}
        >
          <ShowLikes likes={likes} />
        </Button>
      </Flex>
      <Text
        as="div"
        p={2}
        pb={0}
        mt={0}
        textAlign="left"
        fontWeight="bold"
        display="flex"
        alignItems="center"
      >
        <Avatar name={name} size="sm" src={creatorImage} />
        <Text ml={2}>{name}</Text>
      </Text>
      <Box p={2} pt={1} textAlign="start">
        <Text fontWeight="bold">{title}</Text>
        <Text noOfLines={2} dangerouslySetInnerHTML={{ __html: description }} />
        <Link to={`/blog/${_id}`}>
          <Text as="span" color="blue.500">
            Read More
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default BlogCard;
