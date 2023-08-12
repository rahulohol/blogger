import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  useColorMode,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
// import GrUpdate from 'react-icons/gr';
import { ImSpinner11 } from 'react-icons/im';
import { FaFileImage } from 'react-icons/fa';

import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTour, updateTour } from '../redux/features/tourSlice';

const initialState = {
  title: '',
  description: '',
  tags: [],
  // imageFile:""
};

const AddEditBlog = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { error, userTours } = useSelector(state => ({
    ...state.tour,
  }));
  const { user } = useSelector(state => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find(tour => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error &&
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(tourData);
    // if (!tags.length) {
    //   setTagErrMsg('Please provide some tags');
    // }
    // if (title && description && tags) {
    //   const updatedTourData = { ...tourData, name: user?.result?.name };

    //   if (!id) {
    //     dispatch(createTour({ updatedTourData, navigate, toast }));
    //   } else {
    //     dispatch(updateTour({ id, updatedTourData, toast, navigate }));
    //   }
    //   handleClear();
    // }
  };
  const onInputChange = e => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddTag = tag => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = deleteTag => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter(tag => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: '', description: '', tags: [] });
  };

  const borderColor = useColorModeValue('transparent', 'gray');

  return (
    <Box
      width="100%"
      height="100vh"
      bg={colorMode === 'dark' ? '#16151e' : 'transparent'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingBottom={'70px'}
    >
      <Box
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        margin="auto"
        paddingY={{ base: '20px', sm: '20px', md: '30px', lg: '30px' }}
        paddingX={{ base: '10px', sm: '15px', md: '30px', lg: '30px' }}
        w={{
          base: '96%',
          sm: '96%',
          md: '60%',
          lg: '45%',
          xl: '35%',
          '2xl': '30%',
        }}
        bg={colorMode === 'dark' ? '#232433' : '#FFFFFF'}
        alignContent="center"
        marginTop="120px"
        className="container"
        border={`1px solid ${borderColor}`}
        borderRadius={'md'}
      >
        <Box textAlign="center">
          <Heading as="h2" fontWeight="500" marginBottom="1rem">
            {id ? 'Update Blog' : 'Create Blog'}
          </Heading>
          <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter Title"
                value={title}
                border={'1px solid gray'}
                name="title"
                onChange={onInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter Description"
                border={'1px solid gray'}
                value={description}
                name="description"
                onChange={onInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Box
                bg={colorMode === 'dark' ? 'gray.600' : '#FFFFFF'}
                border={'1px solid gray'}
                borderRadius={'md'}
              >
                <ChipInput
                  name="tags"
                  // color="red"
                  variant="outlined"
                  placeholder="Enter Tags"
                  fullWidth
                  value={tags}
                  onAdd={tag => handleAddTag(tag)}
                  onDelete={tag => handleDeleteTag(tag)}
                  inputProps={{
                    style: {
                      color: colorMode === 'dark' ? '#FFFFFF' : 'black',
                    },
                    placeholder: 'Enter Tag',
                    placeholderTextColor:
                      colorMode === 'dark' ? 'gray.200' : 'gray.600',
                  }}
                />
              </Box>
              {tagErrMsg && (
                <Box className="tagErrMsg" color="tomato">
                  {tagErrMsg}
                </Box>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Box position="relative" overflow="hidden">
                <Button
                  as="label"
                  htmlFor="imageInput"
                  colorScheme="purple"
                  width="100%"
                  fontSize="17px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  padding="10px"
                  borderRadius="5px"
                  transition="background-color 0.2s"
                >
                  Add Image
                  <FaFileImage size={18} style={{ marginLeft: '8px' }} />
                </Button>
                <Input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  display="none"
                  onChange={event => {
                    const file = event.target.files[0];
                    // if (file) {
                    //   const reader = new FileReader();
                    //   reader.readAsDataURL(file);
                    //   reader.onload = () => {
                    //
                    setTourData({ ...tourData, imageFile: file });
                  }}
                />
              </Box>
            </FormControl>

            <Button
              type="submit"
              bg="#4f46e5"
              color={'#FFFFFF'}
              width="100%"
              fontSize={'17px'}
              rightIcon={id ? <MdSend /> : <MdSend />}
              iconSpacing={3}
              _hover={{ bg: '#4f46d1' }}
            >
              {id ? 'Update' : 'Post'}
            </Button>
            <Button
              width="100%"
              mt={2}
              colorScheme="red"
              onClick={handleClear}
              fontSize={'17px'}
              rightIcon={<ImSpinner11 />}
              iconSpacing={3}
            >
              Clear
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEditBlog;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   useToast,
//   VStack,
//   useColorMode,
//   Heading,
//   Text,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { MdSend } from 'react-icons/md';
// import { ImSpinner11 } from 'react-icons/im';
// import { FaFileImage } from 'react-icons/fa';
// import axios from 'axios'; // Import axios for API requests

// import ChipInput from 'material-ui-chip-input';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { createTour, updateTour } from '../redux/features/tourSlice';

// const initialState = {
//   title: '',
//   description: '',
//   tags: [],
//   imageFile: null, // Initialize imageFile to null
// };

// const AddEditBlog = () => {
//   const [tourData, setTourData] = useState(initialState);
//   const [tagErrMsg, setTagErrMsg] = useState(null);
//   const toast = useToast();
//   const { colorMode } = useColorMode();

//   const { error, userTours } = useSelector(state => ({
//     ...state.tour,
//   }));
//   const { user } = useSelector(state => ({ ...state.auth }));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { title, description, tags, imageFile } = tourData; // Destructure imageFile
//   const { id } = useParams();

//   // ...

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!tags.length) {
//       setTagErrMsg('Please provide some tags');
//       return;
//     }
//     if (title && description && tags && imageFile) {
//       try {
//         // Send the image to the server and get the image URL
//         const imageResponse = await axios.post('/api/upload', {
//           image: imageFile,
//         });

//         const updatedTourData = {
//           ...tourData,
//           name: user?.result?.name,
//           imageFile: imageResponse.data.imageUrl, // Set the image URL
//         };

//         if (!id) {
//           dispatch(createTour({ updatedTourData, navigate, toast }));
//         } else {
//           dispatch(updateTour({ id, updatedTourData, toast, navigate }));
//         }
//         handleClear();
//       } catch (error) {
//         // Handle error
//         console.error('Error uploading image:', error);
//         toast({
//           title: 'Error',
//           description: 'Failed to upload image. Please try again.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     }
//   };

// ...

//       return (
//     <Box
//       width="100%"
//       height="100vh"
//       bg={colorMode === 'dark' ? '#16151e' : 'transparent'}
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       paddingBottom={'70px'}
//     >
//       <Box
//         boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
//         margin="auto"
//         paddingY={{ base: '20px', sm: '20px', md: '30px', lg: '30px' }}
//         paddingX={{ base: '10px', sm: '15px', md: '30px', lg: '30px' }}
//         w={{
//           base: '96%',
//           sm: '96%',
//           md: '60%',
//           lg: '45%',
//           xl: '35%',
//           '2xl': '30%',
//         }}
//         bg={colorMode === 'dark' ? '#232433' : '#FFFFFF'}
//         alignContent="center"
//         marginTop="120px"
//         className="container"
//         border={`1px solid ${borderColor}`}
//         borderRadius={'md'}
//       >
//         <Box textAlign="center">
//           <Heading as="h2" fontWeight="500" marginBottom="1rem">
//             {id ? 'Update Blog' : 'Create Blog'}
//           </Heading>
//           <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
//             <FormControl>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 placeholder="Enter Title"
//                 value={title}
//                 border={'1px solid gray'}
//                 name="title"
//                 onChange={onInputChange}
//                 required
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Description</FormLabel>
//               <Textarea
//                 placeholder="Enter Description"
//                 border={'1px solid gray'}
//                 value={description}
//                 name="description"
//                 onChange={onInputChange}
//                 required
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Tags</FormLabel>
//               <Box
//                 bg={colorMode === 'dark' ? 'gray.600' : '#FFFFFF'}
//                 border={'1px solid gray'}
//                 borderRadius={'md'}
//               >
//                 <ChipInput
//                   name="tags"
//                   // color="red"
//                   variant="outlined"
//                   placeholder="Enter Tags"
//                   fullWidth
//                   value={tags}
//                   onAdd={tag => handleAddTag(tag)}
//                   onDelete={tag => handleDeleteTag(tag)}
//                   inputProps={{
//                     style: {
//                       color: colorMode === 'dark' ? '#FFFFFF' : 'black',
//                     },
//                     placeholder: 'Enter Tag',
//                     placeholderTextColor:
//                       colorMode === 'dark' ? 'gray.200' : 'gray.600',
//                   }}
//                 />
//               </Box>
//               {tagErrMsg && (
//                 <Box className="tagErrMsg" color="tomato">
//                   {tagErrMsg}
//                 </Box>
//               )}
//             </FormControl>

//             <FormControl>
//               <FormLabel>Image</FormLabel>
//               <Box position="relative" overflow="hidden">
//                 <Button
//                   as="label"
//                   htmlFor="imageInput"
//                   colorScheme="purple"
//                   width="100%"
//                   fontSize="17px"
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                   cursor="pointer"
//                   padding="10px"
//                   borderRadius="5px"
//                   transition="background-color 0.2s"
//                 >
//                   Add Image
//                   <FaFileImage size={18} style={{ marginLeft: '8px' }} />
//                 </Button>
//                 <Input
//                   type="file"
//                   id="imageInput"
//                   accept="image/*"
//                   display="none"
//                   onChange={event => {
//                     const file = event.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.readAsDataURL(file);
//                       reader.onload = () => {
//                         setTourData({ ...tourData, imageFile: reader.result });
//                       };
//                     }
//                   }}
//                 />
//               </Box>
//             </FormControl>

//             <Button
//               type="submit"
//               bg="#4f46e5"
//               color={'#FFFFFF'}
//               width="100%"
//               fontSize={'17px'}
//               rightIcon={id ? <MdSend /> : <MdSend />}
//               iconSpacing={3}
//               _hover={{ bg: '#4f46d1' }}
//             >
//               {id ? 'Update' : 'Post'}
//             </Button>
//             <Button
//               width="100%"
//               mt={2}
//               colorScheme="red"
//               onClick={handleClear}
//               fontSize={'17px'}
//               rightIcon={<ImSpinner11 />}
//               iconSpacing={3}
//             >
//               Clear
//             </Button>
//           </VStack>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddEditBlog;
