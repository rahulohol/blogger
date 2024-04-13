// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   SimpleGrid,
//   useColorMode,
//   AbsoluteCenter,
//   Input,
//   Select,
//   Icon,
//   Button,
//   FormControl,
//   InputGroup,
//   InputRightElement,
//   InputLeftElement,
//   FormLabel,
//   Divider,
//   Text,
// } from '@chakra-ui/react';
// import { FaSearch } from 'react-icons/fa';
// import { BsSearch } from 'react-icons/bs';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getBlogs,
//   searchBlogs,
//   setCurrentPage,
// } from '../redux/features/blogSlice';
// import BlogCard from '../components/BlogCard';
// import Spinner from '../components/Spinner';
// import Pagination from '../components/Pagination.js';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const BlogList = () => {
//   const { blogs, loading, currentPage, numberOfPages } = useSelector(state => ({
//     ...state.blog,
//   }));
//   const dispatch = useDispatch();
//   const query = useQuery();
//   const searchQuery = query.get('searchQuery');
//   const location = useLocation();

//   const navigate = useNavigate();

//   const [search, setSearch] = useState('');

//   const { colorMode } = useColorMode();

//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const handleCategoryChange = e => {
//     const selectedValue = e.target.value;
//     setSelectedCategory(selectedValue);
//     dispatch(searchBlogs(e.target.value));
//     navigate(`/blogs/search?searchQuery=${e.target.value}`);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (search) {
//       setSearch('');
//       if (location.pathname === '/blogslist') {
//         dispatch(searchBlogs(search));
//         navigate(`/blogs/search?searchQuery=${search}`);
//       } else if (location.pathname.includes('/blogs/search')) {
//         dispatch(searchBlogs(search));
//         navigate(`/blogs/search?searchQuery=${search}`);
//       }
//     } else {
//       if (location.pathname.includes('/blogs/search')) {
//         navigate('/blogslist');
//       }
//     }
//   };

//   useEffect(() => {
//     if (searchQuery) {
//       if (location.pathname === '/blogslist') {
//         dispatch(getBlogs(currentPage));
//       } else if (location.pathname.includes('/blogs/search')) {
//         dispatch(searchBlogs(searchQuery));
//       } else {
//         dispatch(getBlogs(currentPage));
//       }
//     } else {
//       dispatch(getBlogs(currentPage));
//     }
//   }, [searchQuery, location.pathname, currentPage, dispatch]);

//   return (
//     <Box
//       w={'100%'}
//       h={'100%'}
//       minH={'100vh'}
//       pt={'75px'}
//       bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
//     >
//       <Box
//         w={{ base: '100%', sm: '100%', md: '80%', lg: '80%', xl: '70%' }}
//         margin="auto"
//         padding="15px"
//         textAlign="center"
//         align="center"
//       >
//         {location.pathname === '/blogslist' && (
//           <Box
//             w={'100%'}
//             as={'form'}
//             display={'flex'}
//             alignItems={'end'}
//             flexDirection={{
//               base: 'column',
//               sm: 'column',
//               md: 'row',
//               lg: 'row',
//             }}
//             gap={2}
//             onSubmit={handleSubmit}
//           >
//             <FormControl
//               w={{ base: '100%', sm: '100%', md: '50%' }}
//               mb={{ base: null, sm: null, md: 4 }}
//             >
//               <FormLabel>Find blogs by topic</FormLabel>
//               <InputGroup size="md" mr={2}>
//                 <Input
//                   placeholder="Search for blogs by topic"
//                   variant={'filled'}
//                   bg={colorMode === 'dark' ? 'transparent' : 'transparent'}
//                   pl={12}
//                   border={'1px solid gray'}
//                   _placeholder={{ color: 'gray.500', fontWeight: 600 }}
//                   rounded={'md'}
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                   type="search"
//                 />
//                 <InputLeftElement ml={2}>
//                   <Icon
//                     as={BsSearch}
//                     boxSize={5}
//                     onClick={handleSubmit}
//                     cursor={'pointer'}
//                   />
//                 </InputLeftElement>
//               </InputGroup>
//             </FormControl>
//             <FormControl
//               w={{ base: '100%', sm: '100%', md: '50%' }}
//               mb={{ base: 2, sm: 2, md: 4 }}
//             >
//               <FormLabel>Filter by category</FormLabel>
//               <Select
//                 placeholder="Select Categories"
//                 _placeholder={{ textAlign: 'center', color: 'red' }}
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 borderColor={'gray'}
//               >
//                 <option value="Education">Education</option>
//                 <option value="Technology" className="option">
//                   Technology
//                 </option>
//                 <option value="Sports">Sports</option>
//                 <option value="Entertainment" className="option">
//                   Entertainment
//                 </option>
//                 <option value="Stories" className="Stories">
//                   Stories
//                 </option>
//                 <option value="Arts" className="option">
//                   Arts
//                 </option>
//                 <option value="History" className="option">
//                   History
//                 </option>
//               </Select>
//             </FormControl>
//           </Box>
//         )}
//         {blogs.length > 0 && location.pathname !== '/blogslist' && !loading && (
//           <Text fontSize={'xl'} fontWeight={600} m={'auto'} mb="0">
//             Results for "{searchQuery}"
//           </Text>
//         )}
//         <Flex>
//           {!loading &&
//             blogs.length === 0 &&
//             location.pathname === '/blogslist' && (
//               <Text fontSize={'xl'} fontWeight={600} mb="0">
//                 No blogs Found
//               </Text>
//             )}

//           {blogs.length === 0 &&
//             location.pathname !== '/blogslist' &&
//             !loading && (
//               <Text fontSize={'xl'} fontWeight={600} m={'auto'} mb="0">
//                 We couldn't find any matches for "{searchQuery}"
//               </Text>
//             )}

//           {loading && (
//             <AbsoluteCenter>
//               <Spinner />
//             </AbsoluteCenter>
//           )}

//           {!loading && (
//             <SimpleGrid columns={[1, 2, 2, 3]} spacing={4} mt={2}>
//               {blogs &&
//                 blogs.map(item => <BlogCard key={item._id} {...item} />)}
//             </SimpleGrid>
//           )}
//         </Flex>
//         {numberOfPages > 1 && location.pathname === '/blogslist' && (
//           <Pagination
//             setCurrentPage={setCurrentPage}
//             numberOfPages={numberOfPages}
//             currentPage={currentPage}
//             dispatch={dispatch}
//           />
//         )}
//         <Divider mt={4} />

//         {location.pathname === '/blogslist' && !loading && <Footer />}
//       </Box>

//       {/* Featured Blogs Section */}
//       {/* <Box
//         w={'100%'}
//         py={8}
//         bg={colorMode === 'dark' ? '#1A202C' : '#F7FAFC'}
//         textAlign="center"
//       >
//         <Heading fontSize="xl" fontWeight="bold" mb={6}>
//           Featured Blogs
//         </Heading>
//         <SimpleGrid columns={[1, 2, 3]} spacing={4}> */}
//       {/* Featured Blog Cards */}
//       {/* Add your featured blog cards here */}
//       {/* <Box bg="white" rounded="md" p={4}>
//             <Heading fontSize="md" fontWeight="semibold">
//               Featured Blog 1
//             </Heading>
//             <Text mt={2}>Description of Featured Blog 1</Text>
//           </Box>
//           <Box bg="white" rounded="md" p={4}>
//             <Heading fontSize="md" fontWeight="semibold">
//               Featured Blog 2
//             </Heading>
//             <Text mt={2}>Description of Featured Blog 2</Text>
//           </Box>
//           <Box bg="white" rounded="md" p={4}>
//             <Heading fontSize="md" fontWeight="semibold">
//               Featured Blog 3
//             </Heading>
//             <Text mt={2}>Description of Featured Blog 3</Text>
//           </Box>
//         </SimpleGrid>
//       </Box> */}
//     </Box>
//   );
// };

// export default BlogList;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorMode,
  Input,
  Select,
  Icon,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Divider,
  Text,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBlogs,
  searchBlogs,
  setCurrentPage,
} from '../redux/features/blogSlice';
import BlogCard from '../components/BlogCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination.js';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// Define route paths as constants
const BLOGS_LIST_PATH = '/blogslist';
const BLOGS_SEARCH_PATH = '/blogs/search';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlogList = () => {
  const { blogs, loading, currentPage, numberOfPages } = useSelector(
    state => state.blog
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const { colorMode } = useColorMode();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = e => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    dispatch(searchBlogs(e.target.value));
    navigate(`${BLOGS_SEARCH_PATH}?searchQuery=${e.target.value}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search) {
      setSearch('');
      dispatch(searchBlogs(search));
      navigate(`${BLOGS_SEARCH_PATH}?searchQuery=${search}`);
    } else {
      if (location.pathname.includes(BLOGS_SEARCH_PATH)) {
        navigate(BLOGS_LIST_PATH);
      }
    }
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     if (location.pathname === BLOGS_LIST_PATH) {
  //       dispatch(getBlogs(currentPage));
  //     } else if (location.pathname.includes(BLOGS_SEARCH_PATH)) {
  //       dispatch(searchBlogs(searchQuery));
  //     } else {
  //       dispatch(getBlogs(currentPage));
  //     }
  //   } else {
  //     dispatch(getBlogs(currentPage));
  //   }
  // }, [searchQuery, location.pathname, currentPage, dispatch]);

  const currentPath = location.pathname;

  useEffect(() => {
    if (searchQuery) {
      if (currentPath === BLOGS_LIST_PATH) {
        dispatch(getBlogs(currentPage));
      } else if (currentPath.includes(BLOGS_SEARCH_PATH)) {
        dispatch(searchBlogs(searchQuery));
      } else {
        dispatch(getBlogs(currentPage));
      }
    } else {
      dispatch(getBlogs(currentPage));
    }
  }, [searchQuery, currentPath, currentPage, dispatch]);

  return (
    <Box
      w={'100%'}
      h={'100%'}
      minH={'100vh'}
      pt={'75px'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
    >
      <Box
        w={{ base: '100%', sm: '100%', md: '80%', lg: '80%', xl: '70%' }}
        margin="auto"
        padding="15px"
        textAlign="center"
        align="center"
      >
        {location.pathname === BLOGS_LIST_PATH && (
          <Box
            w={'100%'}
            as={'form'}
            display={'flex'}
            alignItems={'end'}
            flexDirection={{
              base: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
            }}
            gap={2}
            onSubmit={handleSubmit}
          >
            <FormControl
              w={{ base: '100%', sm: '100%', md: '50%' }}
              mb={{ base: null, sm: null, md: 4 }}
            >
              <FormLabel>Find blogs by topic</FormLabel>
              <InputGroup size="md" mr={2}>
                <Input
                  placeholder="Search for blogs by topic"
                  variant={'filled'}
                  bg={colorMode === 'dark' ? 'transparent' : 'transparent'}
                  pl={12}
                  border={'1px solid gray'}
                  _placeholder={{ color: 'gray.500', fontWeight: 600 }}
                  rounded={'md'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="search"
                />
                <InputLeftElement ml={2}>
                  <Icon
                    as={BsSearch}
                    boxSize={5}
                    onClick={handleSubmit}
                    cursor={'pointer'}
                  />
                </InputLeftElement>
              </InputGroup>
            </FormControl>
            <FormControl
              w={{ base: '100%', sm: '100%', md: '50%' }}
              mb={{ base: 2, sm: 2, md: 4 }}
            >
              <FormLabel>Filter by category</FormLabel>
              <Select
                placeholder="Select Categories"
                _placeholder={{ textAlign: 'center', color: 'red' }}
                value={selectedCategory}
                onChange={handleCategoryChange}
                borderColor={'gray'}
              >
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Stories">Stories</option>
                <option value="Arts">Arts</option>
                <option value="History">History</option>
              </Select>
            </FormControl>
          </Box>
        )}
        {blogs.length > 0 &&
          location.pathname !== BLOGS_LIST_PATH &&
          !loading && (
            <Text fontSize={'xl'} fontWeight={600} m={'auto'} mb="0">
              Results for "{searchQuery}"
            </Text>
          )}
        <Flex>
          {!loading &&
            blogs.length === 0 &&
            location.pathname === BLOGS_LIST_PATH && (
              <Text fontSize={'xl'} fontWeight={600} mb="0">
                No blogs Found
              </Text>
            )}

          {blogs.length === 0 &&
            location.pathname !== BLOGS_LIST_PATH &&
            !loading && (
              <Text fontSize={'xl'} fontWeight={600} m={'auto'} mb="0">
                We couldn't find any matches for "{searchQuery}"
              </Text>
            )}

          {loading && (
            <AbsoluteCenter>
              <Spinner />
            </AbsoluteCenter>
          )}

          {!loading && (
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={4} mt={2}>
              {blogs &&
                blogs.map(item => <BlogCard key={item._id} {...item} />)}
            </SimpleGrid>
          )}
        </Flex>
        {numberOfPages > 1 && location.pathname === BLOGS_LIST_PATH && (
          <Pagination
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        )}
        <Divider mt={4} />

        {location.pathname === BLOGS_LIST_PATH && !loading && <Footer />}
      </Box>
    </Box>
  );
};

export default BlogList;
