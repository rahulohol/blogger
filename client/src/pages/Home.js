// import React from 'react';
// import {
//   Box,
//   Button,
//   CSSReset,
//   Grid,
//   Heading,
//   Text,
//   useColorMode,
//   Icon,
//   Divider,
// } from '@chakra-ui/react';
// import { FaBullhorn, FaGlobe, FaRocket } from 'react-icons/fa';
// import './home.css';
// import Footer from '../components/Footer';
// import { useNavigate } from 'react-router-dom';

// const BoxWithIcon = ({ icon, title, description }) => (
//   <Box
//     p={4}
//     m={{ base: 2, sm: 2, md: 2, lg: 4 }}
//     borderWidth="1px"
//     borderRadius="lg"
//     boxShadow="lg"
//     flexBasis={{ base: '100%', sm: '100%', md: 'calc(33.3333% - 2rem)' }}
//     fontWeight={400}
//     className="home-heading"
//   >
//     <Box textAlign="center">
//       <Icon as={icon} boxSize={8} mb={2} />
//       <Text fontWeight={'600'} fontSize="lg">
//         {title}
//       </Text>
//       <Text fontSize="md" mt={2}>
//         {description}
//       </Text>
//     </Box>
//   </Box>
// );

// const Home = () => {
//   const { colorMode } = useColorMode();
//   const navigate = useNavigate();

//   return (
//     <Box
//       minH={'100vh'}
//       w={'100%'}
//       pt={{
//         base: '110px',
//         // sm: '130px',
//         // md: '130px',
//         // lg: '1100px',
//       }}
//       bg={colorMode === 'dark' ? '#0d0c11' : 'transparent'}
//     >
//       <CSSReset />

//       <Heading
//         fontSize={{
//           base: '30px',
//           sm: '30px',
//           md: '52px',
//           lg: '64',
//         }}
//         as={'h1'}
//         w={{
//           base: '100%',
//           sm: '100%',
//           md: '100%',
//           lg: '90%',
//           xl: '70%',
//         }}
//         margin={'auto'}
//         textAlign={'center'}
//         lineHeight={1.1}
//         color={colorMode === 'dark' ? '#F3F4F5' : '#000000'}
//         fontWeight={700}
//         p={2}
//         className="home-heading"
//         style={{ wordSpacing: '0px' }}
//       >
//         Welcome to the Blogger's <br /> World, Where Ideas Lead the Way!
//       </Heading>

//       <Text
//         textAlign={'center'}
//         w={{
//           base: '100%',
//           sm: '100%',
//           md: '60%',
//           lg: '50%',
//         }}
//         m={'auto'}
//         mt={3}
//         p={2}
//         fontSize={{
//           base: '14px',
//           sm: '14px',
//           md: '16px',
//         }}
//         fontWeight={500}
//         className="home-heading"
//       >
//         If you're eager to share your ideas, adventures, and knowledge with the
//         world, start your journey here at Blogger – your go-to platform for
//         effortless blog creation and publishing
//       </Text>

//       <Button
//         bg="#1d4ed8"
//         color={'#FFFFFF'}
//         display={'block'}
//         m={'auto'}
//         borderRadius={'4px'}
//         fontWeight={400}
//         className="home-heading"
//         mt={3.5}
//         _hover={{
//           bg: '#1d4ed8',
//         }}
//         onClick={() => {
//           navigate('/createblog');
//         }}
//       >
//         Create Your First Blog
//       </Button>

//       <Grid
//         w={{ base: '95%', sm: '80%', md: '98%', lg: '85%', xl: '70%' }}
//         templateColumns={{
//           base: '1fr',
//           sm: '1fr',
//           md: '1fr 1fr 1fr',
//         }}
//         gap={{ base: 4, sm: 4, md: 2, lg: 4 }}
//         m={'auto'}
//         mt={5}
//       >
//         <BoxWithIcon
//           icon={FaBullhorn}
//           title="Create Stunning Blogs"
//           description="Easily create and publish beautiful blog posts. Choose from a variety of customizable templates and unleash your creativity."
//         />
//         <BoxWithIcon
//           icon={FaGlobe}
//           title="Reach to Global Audience"
//           description="Expand your reach and connect with people worldwide. Blogger provides built-in SEO tools to help your content reach a wider audience."
//         />
//         <BoxWithIcon
//           icon={FaRocket}
//           title="Enhance Your Online Presence"
//           description="Boost your online presence and grow your brand. Utilize our social sharing features and engage with your audience like never before."
//         />
//       </Grid>
//       <Divider mt={2} />
//       <Footer />
//     </Box>
//   );
// };

// export default Home;

import React from 'react';
import {
  Box,
  Button,
  CSSReset,
  Grid,
  Heading,
  Text,
  useColorMode,
  Icon,
  Divider,
  Stack,
  Image,
} from '@chakra-ui/react';
import { FaBullhorn, FaGlobe, FaRocket } from 'react-icons/fa';
import './home.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import seoImg from '../assets/images/seo.jpg';
import shareImg from '../assets/images/share.jpg';
import templateImg from '../assets/images/template.jpg';

const BoxWithIcon = ({ icon, title, description }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p={4}
      m={{ base: 2, sm: 2, md: 2, lg: 4 }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      flexBasis={{ base: '100%', sm: '100%', md: 'calc(33.3333% - 2rem)' }}
      fontWeight={400}
      className="home-heading"
    >
      <Box textAlign="center">
        <Icon
          as={icon}
          boxSize={8}
          mb={2}
          // bg="#4f46e5"
          color={colorMode === 'dark' ? '#FFFFFF' : '#4f46e5'}
          // _hover={{ bg: '#4f46d1' }}
        />
        <Text fontWeight="600" fontSize="lg">
          {title}
        </Text>
        <Text fontSize="md" mt={2}>
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const Home = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  // const { colorMode } = useColorMode();

  return (
    <Box
      minH="100vh"
      w="100%"
      pt={{
        base: '100px',
      }}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}

      // bg={colorMode === 'dark' ? 'gray.900' : 'white'}
    >
      <CSSReset />

      <Heading
        fontSize={{
          base: '30px',
          md: '52px',
          lg: '64px',
        }}
        as="h1"
        w={{
          base: '100%',
          md: '100%',
          lg: '90%',
          xl: '70%',
        }}
        margin="auto"
        textAlign="center"
        lineHeight={1.1}
        color={colorMode === 'dark' ? 'white' : 'black'}
        fontWeight={700}
        p={2}
        className="home-heading"
      >
        Welcome to the Blogger's <br /> World, Where Ideas Lead the Way!
      </Heading>

      <Text
        textAlign="center"
        w={{
          base: '100%',
          md: '60%',
          lg: '50%',
        }}
        m="auto"
        mt={{ base: 2, sm: 3 }}
        p={2}
        fontSize={{
          base: '14px',
          md: '16px',
        }}
        fontWeight={500}
        className="home-heading"
      >
        If you're eager to share your ideas, adventures, and knowledge with the
        world, start your journey here at Blogger – your go-to platform for
        effortless blog creation and publishing.
      </Text>

      <Button
        bg="#4f46e5"
        color={'#FFFFFF'}
        _hover={{ bg: '#4f46d1' }}
        // bg="blue.500"
        // color="white"
        display="block"
        m="auto"
        borderRadius="4px"
        fontWeight={400}
        className="home-heading"
        mt={3.5}
        // _hover={{
        //   bg: 'blue.600',
        // }}
        onClick={() => {
          navigate('/createblog');
        }}
      >
        Create Your First Blog
      </Button>

      <Grid
        w={{
          base: '95%',
          sm: '80%',
          md: '98%',
          lg: '85%',
          xl: '70%',
        }}
        templateColumns={{
          base: '1fr',
          md: '1fr 1fr 1fr',
        }}
        gap={{
          base: 4,
          sm: 4,
          md: 2,
          lg: 4,
        }}
        m="auto"
        mt={5}
      >
        <BoxWithIcon
          icon={FaBullhorn}
          title="Create Stunning Blogs"
          description="Easily create and publish beautiful blog posts. Choose from a variety of customizable templates and unleash your creativity."
        />
        <BoxWithIcon
          icon={FaGlobe}
          title="Reach a Global Audience"
          description="Expand your reach and connect with people worldwide. Blogger provides built-in SEO tools to help your content reach a wider audience."
        />
        <BoxWithIcon
          icon={FaRocket}
          title="Enhance Your Online Presence"
          description="Boost your online presence and grow your brand. Utilize our social sharing features and engage with your audience like never before."
        />
      </Grid>
      <Divider mt={6} />

      {/* Additional Section */}
      <Box py={10} textAlign="center" m={'auto'}>
        <Heading fontSize="2xl" mb={2}>
          Discover Our Features
        </Heading>
        <Text
          // fontSize="lg"
          // color="gray.500"
          fontSize={{
            base: '14px',
            md: '16px',
          }}
          fontWeight={500}
          className="home-heading"
        >
          Explore the powerful features that make Blogger the best choice for
          bloggers.
        </Text>
      </Box>
      {/* <Box w={'100%'} m={'auto'}> */}
      <Box
        w={{
          base: '95%',
          sm: '80%',
          md: '100%',
          lg: '90%',
          xl: '70%',
        }}
        display={'flex'}
        flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
        // gap={{ base: 4, md: 3 }}
        gap={{
          base: 4,
          sm: 4,
          md: 0,
          lg: 0,
        }}
        // justify="center"
        justifyContent={'center'}
        alignItems={'start'}
        m={'auto'}
        mt={-3}
        textAlign={'center'}
      >
        <Box
          w={{ base: '100%', sm: '100%', md: 'calc(33.3333% - 2rem)' }}
          // maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={'auto'}
          p={2}
          boxShadow="lg"
        >
          <Image
            src={templateImg}
            alt="Feature 1"
            objectFit="cover"
            h={{ base: '150px', md: '150px', lg: '200px' }}
            w={'100%'}
          />
          <Box p={4}>
            <Text fontWeight="600" fontSize="lg" className="home-heading">
              Beautiful Templates
            </Text>
            <Text
              mt={2}
              fontSize={{
                base: '14px',
                md: '16px',
              }}
              fontWeight={500}
              className="home-heading"
            >
              Choose from a wide range of stunning blog templates to kickstart
              your creativity.
            </Text>
          </Box>
        </Box>
        <Box
          w={{ base: '100%', sm: '100%', md: 'calc(33.3333% - 2rem)' }}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={'auto'}
          p={2}
          boxShadow="lg"
        >
          <Image
            src={seoImg}
            alt="Feature 2"
            objectFit="cover"
            w={'100%'}
            h={{ base: '150px', md: '150px', lg: '200px' }}
          />
          <Box p={4}>
            <Text fontWeight="600" fontSize="lg" className="home-heading">
              SEO Optimized
            </Text>
            <Text
              mt={2}
              fontSize={{
                base: '14px',
                md: '16px',
              }}
              fontWeight={500}
              className="home-heading"
            >
              Blogger comes with built-in SEO tools to help your content rank
              higher in search engines.
            </Text>
          </Box>
        </Box>
        <Box
          w={{ base: '100%', sm: '100%', md: 'calc(33.3333% - 2rem)' }}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={'auto'}
          p={2}
          boxShadow="lg"
        >
          <Image
            src={shareImg}
            alt="Feature 3"
            objectFit="cover"
            h={{ base: '170px', md: '150px', lg: '200px' }}
            w={'100%'}
          />
          <Box p={4}>
            <Text fontWeight="600" fontSize="lg" className="home-heading">
              Social Sharing
            </Text>
            <Text
              mt={2}
              fontSize={{
                base: '14px',
                md: '16px',
              }}
              fontWeight={500}
              className="home-heading"
            >
              Easily share your blog posts on social media platforms and connect
              with your audience.
            </Text>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
      <Divider mt={4} />
      <Footer />
    </Box>
  );
};

export default Home;
