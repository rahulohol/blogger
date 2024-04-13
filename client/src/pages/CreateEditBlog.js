import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  CSSReset,
  Select,
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';

import { ImSpinner11 } from 'react-icons/im';
import { FaFileImage } from 'react-icons/fa';

import ChipInput from 'material-ui-chip-input';

import JoditEditor from 'jodit-react';
import debounce from 'lodash/debounce';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, getBlog, updateBlog } from '../redux/features/blogSlice';
import RichTextEditor from '../components/RichTextEditor';

const initialState = {
  title: '',
  description: '',
  tags: [],
  category: '',
};

const AddEditBlog = () => {
  const [blogData, setBlogData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const toast = useToast();

  const { colorMode } = useColorMode();

  const editor = useRef(null);
  const [content, setContent] = useState('');
  console.log(content);

  const { error, blog } = useSelector(state => ({
    ...state.blog,
  }));

  const { user } = useSelector(state => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = blogData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blog && id) {
      setBlogData({ ...blog });
    }
  }, [blog]);

  const [value, setValue] = useState('');
  const getValue = value => {
    setValue(value);
    // blogData.description = value;

    var tempElement = document.createElement('div');
    tempElement.innerHTML = value;

    // Get all elements within the temporary element
    var elementsInsideRichTextData = tempElement.querySelectorAll('*');

    // Loop through elements inside the rich text data and remove the background-color property
    elementsInsideRichTextData.forEach(function (element) {
      element.style.backgroundColor = 'transparent';
      // element.style.color = '#333';
    });

    // Get the modified rich text data
    // var modifiedRichTextData = tempElement.innerHTML;

    // Get the modified rich text data
    blogData.description = tempElement.innerHTML;
  };

  useEffect(() => {
    error &&
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    //eslint-disable-next-line
  }, [error]);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!Array.isArray(tags) || tags.length === 0) {
      setTagErrMsg('Please provide some tags');
      return;
    }
    if (title && description && tags) {
      const updatedBlogData = {
        ...blogData,
        name: user?.result?.name,
        creatorImage: user?.result?.imgpath,
        isVerified: user?.result?.isVerified,
      };

      if (!id) {
        dispatch(createBlog({ updatedBlogData, config, navigate }));
      } else {
        dispatch(updateBlog({ id, updatedBlogData, config, navigate }));
      }

      toast({
        position: 'top',
        title: 'Success',
        description: 'Blog created/Updated Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleClear();
    }
  };
  // console.log(blogData);
  const onInputChange = e => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleAddTag = tag => {
    setTagErrMsg(null);
    setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
  };

  const handleDeleteTag = deleteTag => {
    console.log('Deleting tag:', deleteTag);
    setBlogData({
      ...blogData,
      tags: blogData.tags.filter(tag => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setBlogData({ title: '', description: '', tags: [] });
  };

  const borderColor = useColorModeValue('transparent', 'gray');

  const editorStyles =
    colorMode === 'dark'
      ? {
          backgroundColor: '#232433',
          color: 'white',
          height: '120px',
          textAlign: 'initial',
          // ... (other styles for dark mode)
        }
      : {
          backgroundColor: '#FFFFFF',
          color: 'black',
          height: '120px',
          textAlign: 'initial',
        };

  return (
    <Box
      width="100%"
      minH="100vh"
      height={'100%'}
      bg={colorMode === 'dark' ? '#0d0c11' : '#FFFFFF'}
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
          md: '70%',
          lg: '60%',
          xl: '50%',
          '2xl': '50%',
        }}
        // bg={colorMode === 'dark' ? '#232433' : '#FFFFFF'}
        alignContent="center"
        marginTop="100px"
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
            {/* <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter Description"
                border={'1px solid gray'}
                value={description}
                name="description"
                onChange={onInputChange}
                required
              />
            </FormControl> */}
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Box position="relative" overflow="hidden">
                <Button
                  as="label"
                  htmlFor="imageInput"
                  // colorScheme="purple"
                  // outline
                  border={'1px solid gray'}
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
                  {!blogData.imageFile ? 'Add Image' : 'Image Added'}
                  <FaFileImage size={18} style={{ marginLeft: '8px' }} />
                </Button>
                <Input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  display="none"
                  onChange={event => {
                    const file = event.target.files[0];
                    setBlogData({ ...blogData, imageFile: file });
                  }}
                />
              </Box>
            </FormControl>
            {id && (
              <Text fontSize={'sm'} color={'red.500'} mt={-1}>
                Update image else previous image will be saved...
              </Text>
            )}
            <FormControl>
              <FormLabel>Description</FormLabel>
              <RichTextEditor
                initialValue={id ? blogData.description : ''}
                getValue={getValue}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select category</FormLabel>
              <Select
                placeholder="Select Category"
                name="category"
                value={blogData.category}
                onChange={onInputChange}
              >
                {/* <option value="All">All</option> */}
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Stories">Stories</option>
                <option value="History">History</option>
                <option value="Arts">Arts</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Enter tags</FormLabel>
              <Box
                bg={colorMode === 'dark' ? '#FFF' : '#FFFFFF'}
                // border={'1px solid gray'}
                borderRadius={'md'}
              >
                {/* <ChipInput
                  name="tags"
                  // color="red"
                  variant="outlined"
                  placeholder="Enter Tags"
                  fullWidth
                  value={tags}
                  onAdd={tag => {
                    console.log(tag);
                    handleAddTag(tag);
                  }}
                  onDelete={tag => {
                    handleDeleteTag(tag);
                  }}
                /> */}
                <ChipInput
                  name="tags"
                  variant="outlined"
                  placeholder="Enter Tag"
                  fullWidth
                  value={tags}
                  onAdd={tag => handleAddTag(tag)}
                  onDelete={tag => handleDeleteTag(tag)}
                />
              </Box>
              {tagErrMsg && (
                <Box className="tagErrMsg" color="tomato">
                  {tagErrMsg}
                </Box>
              )}
            </FormControl>
            <Box
              display={'flex'}
              flexDirection={{
                base: 'column',
                sm: 'column',
                md: 'row',
              }}
            >
              <Button
                type="submit"
                bg="#4f46e5"
                color={'#FFFFFF'}
                _hover={{ bg: '#4f46d1' }}
                width="100%"
                fontSize={'17px'}
                mt={2}
                mr={1}
                rightIcon={id ? <MdSend /> : <MdSend />}
                iconSpacing={3}
              >
                {id ? 'Update' : 'Post'}
              </Button>
              <Button
                width="100%"
                mt={2}
                ml={1}
                // colorScheme="red"
                color={'#FFFFFF'}
                // bg={'red.500'}
                bg={'red.500'}
                onClick={handleClear}
                fontSize={'17px'}
                rightIcon={<ImSpinner11 />}
                iconSpacing={3}
              >
                Clear
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEditBlog;
