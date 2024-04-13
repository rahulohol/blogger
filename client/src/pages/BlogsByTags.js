import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Divider,
  Button,
  Spinner as ChakraSpinner,
  Image,
  useColorMode,
  SimpleGrid,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsByTag } from '../redux/features/blogSlice';
import Spinner from '../components/Spinner';
import BlogCard from '../components/BlogCard';
// import { excerpt } from '../utility';

const BlogsByTags = () => {
  const { tagBlogs, loading } = useSelector(state => ({ ...state.blog }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (tag) {
      dispatch(getBlogsByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);
  if (tagBlogs) {
    console.log(tagBlogs);
  }

  const excerpt = (str, letters) => {
    if (str.length > letters) {
      str = str.substring(0, letters) + ' ...';
    }
    return str;
  };

  const apiUrl = 'http://localhost:8000';

  // bg={colorMode === 'dark' ? '#16151e' : '#FFFFFF'}

  return (
    <Box
      w={'100%'}
      minH={'100vh'}
      pt={'100px'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Box
          w={{ base: '98%', sm: '100%', md: '90%', lg: '75%', xl: '70%' }}
          margin="auto"
          // padding="120px"
          // maxW="900px"
          textAlign="center"
          align="center"
          // border={'1px solid red'}
        >
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Blogs with tag: "{tag}"
          </Text>
          <Divider mt="4" mb="4" />
          {!loading && (
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={4} mt={2}>
              {tagBlogs &&
                tagBlogs.map(item => <BlogCard key={item._id} {...item} />)}
            </SimpleGrid>
          )}

          {/* {tagBlogs &&
            tagBlogs.map(item => (
              <Box key={item._id} p={{ base: '2%', sm: '2%', md: 0 }}>
                <Box
                  display="flex"
                  // mb="4"
                  flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
                  mb="2"
                  mt={{ md: 2 }}
                >
                  <Box flex="1">
                    <Image
                      //   className="rounded"
                      src={`${apiUrl}/uploads/${item.imgpath}`}
                      alt={item.title}
                      w={'100%'}
                      //   style={{ maxWidth: '100%' }}
                    />
                  </Box>
                  <Box
                    flex="3"
                    ml={{ md: '4' }}
                    // mt={{ base: '1.5', sm: '1.5', md: 0 }}
                  >
                    <Box textAlign="left">
                      <Text fontSize="lg" fontWeight="bold">
                        {item.title}
                      </Text>
                      {/* <Text fontSize="md">
                        {excerpt(item.description, 40)}{' '} */}
          {/* <Text display={'flex'} align={'center'}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: excerpt(item.description),
                          }}
                        />
                        <Box
                          as={'span'}
                          size="sm"
                          color="blue.500"
                          cursor={'pointer'}
                          onClick={() => navigate(`/blog/${item._id}`)}
                        >
                          ...Read More
                        </Box>
                      </Text> */}
          {/* </Text> */}
          {/* </Box>
                  </Box>
                </Box>
                <hr />
              </Box>
            ))}  */}
        </Box>
      )}
    </Box>
  );
};

export default BlogsByTags;
