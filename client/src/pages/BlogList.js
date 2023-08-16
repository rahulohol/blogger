import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useColorMode,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, setCurrentPage } from '../redux/features/blogSlice';
import BlogCard from '../components/BlogCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination.js';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlogList = () => {
  const { blogs, loading, currentPage, numberOfPages } = useSelector(state => ({
    ...state.blog,
  }));
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const location = useLocation();

  const { colorMode } = useColorMode();

  useEffect(() => {
    dispatch(getBlogs(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // if (loading) {
  //   return <Spinner />;
  // }

  console.log(location.pathname);

  return (
    <Box
      w={'100%'}
      h={'100%'}
      minH={'100vh'}
      // bg={'#16151e'}
      pt={'100px'}
      bg={colorMode === 'dark' ? '#16151e' : '#FFFFFF'}
    >
      <Box
        w={{ base: '100%', sm: '100%', md: '80%', lg: '80%', xl: '70%' }}
        margin="auto"
        padding="15px"
        // maxWidth="1000px"
        textAlign="center"
        align="center"
        // mt={'150px'}
        // bg={'#16151e'}
      >
        <Flex direction="column" mt="5">
          {!loading &&
            blogs.length === 0 &&
            location.pathname === '/blogslist' && (
              <Heading as="h2" mb="0">
                No blogs Found
              </Heading>
            )}

          {blogs.length === 0 && location.pathname !== '/blogslist' && (
            <Heading as="h2" mb="0">
              We couldn't find any matches for "{searchQuery}"
            </Heading>
          )}

          <Flex>
            {loading && (
              <AbsoluteCenter>
                <Spinner />
              </AbsoluteCenter>
            )}

            {!loading && (
              <SimpleGrid columns={[1, 2, 2, 3]} spacing={6}>
                {blogs &&
                  blogs.map(item => <BlogCard key={item._id} {...item} />)}
              </SimpleGrid>
            )}
          </Flex>
        </Flex>

        {blogs.length > 0 && !searchQuery && (
          <Pagination
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        )}
      </Box>
    </Box>
  );
};

export default BlogList;
