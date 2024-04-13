import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Image,
  Link as ChakraLink,
  Text,
  Flex,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils/constants';
// import { excerpt } from '../utility';

const excerpt = str => {
  if (str.length > 45) {
    str = str.substring(0, 65) + ' ...';
  }
  return str;
};

// const apiUrl = 'http://localhost:8000';

const RelatedBlogs = ({ relatedBlogs, blogId }) => {
  return (
    <>
      {relatedBlogs && relatedBlogs.length > 0 && (
        <>
          {relatedBlogs.length > 1 && (
            <>
              <Flex justifyContent={'center'} alignItems="center">
                <Divider flex="1" borderColor="gray.400" />
                <Text
                  fontSize={{ base: 'xl', md: '2xl' }}
                  textAlign={'center'}
                  fontWeight={600}
                  m={{ base: 4, md: 5 }}
                >
                  You might also like
                </Text>
                <Divider flex="1" borderColor="gray.400" />
              </Flex>
              {/* <Text fontSize="2xl" textAlign={'center'} fontWeight={600} m={5}>
                -- Related Blogs --
              </Text> */}

              <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 3 }} // Define number of columns based on screen size
                gap={4}
                justifyContent={'center'}
              >
                {relatedBlogs
                  .filter(item => item._id !== blogId)
                  .slice(0, 3)
                  .map(item => (
                    <Box key={item._id}>
                      <ChakraLink as={Link} to={`/blog/${item._id}`}>
                        <Image
                          src={`${apiUrl}/uploads/${item.imgpath}`}
                          alt={item.title}
                          objectFit="cover"
                          w="100%"
                        />
                      </ChakraLink>
                      <Box className="text-start tag-card" mt={2}>
                        {item.tags.map(tag => (
                          <ChakraLink
                            key={tag}
                            as={Link}
                            to={`/blogs/tag/${tag}`}
                            color="blue.500"
                            fontWeight="bold"
                            mr={2}
                          >
                            #{tag}
                          </ChakraLink>
                        ))}
                      </Box>
                      <Box mt={2}>
                        <Text fontSize="lg" fontWeight="bold">
                          {item.title}
                        </Text>
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: excerpt(item.description),
                          }}
                        />
                        {/* <Text fontSize="md">
                          {excerpt(item.description, 45)}
                        </Text> */}
                      </Box>
                      <Divider
                        borderColor="gray.400"
                        mt={3}
                        display={{ md: 'none' }}
                      />
                    </Box>
                  ))}
              </SimpleGrid>
            </>
          )}

          {/* <Grid
            templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
            gap={4}
            margin={'auto'}
            justifyContent={'center'}
            border={'1px solid red'}
          >
            {relatedBlogs
              .filter(item => item._id !== blogId)
              .slice(0, 3)
              .map(item => (
                <GridItem key={item._id}>
                  <Box>
                    <ChakraLink as={Link} to={`/blog/${item._id}`}>
                      <Image
                        src={`${apiUrl}/uploads/${item.imgpath}`}
                        alt={item.title}
                        objectFit="cover"
                        w="100%"
                        h="160px"
                      />
                    </ChakraLink>
                    <Box className="text-start tag-card" mt={2}>
                      {item.tags.map(tag => (
                        <ChakraLink
                          key={tag}
                          as={Link}
                          to={`/blogs/tag/${tag}`}
                          color="blue.500"
                          fontWeight="bold"
                          mr={2}
                        >
                          #{tag}
                        </ChakraLink>
                      ))}
                    </Box>
                    <Box mt={2}>
                      <Text fontSize="lg" fontWeight="bold">
                        {item.title}
                      </Text>
                      <Text fontSize="md">{excerpt(item.description, 45)}</Text>
                    </Box>
                  </Box>
                </GridItem>
              ))}
          </Grid> */}
        </>
      )}
    </>
  );
};

export default RelatedBlogs;
