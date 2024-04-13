import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Input,
  Stack,
  Textarea,
  Avatar,
  InputGroup,
  useColorMode,
  InputLeftElement,
  Icon,
  Flex,
  Divider,
  useToast,
} from '@chakra-ui/react';

import { createComment } from '../redux/features/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../utils/constants';
// import { editComment, deleteComment } from './commentSlice';

// Import the Reply component here
// import Reply from './Reply';

// const apiUrl = 'http://localhost:8000';

const Comment = ({ blogId, reference }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [updatedText, setUpdatedText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const [commentText, setCommentText] = useState('');

  const { user } = useSelector(state => ({ ...state.auth }));

  // const handleSave = () => {
  //   dispatch(editComment({ commentId: comment.id, updatedText }));
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setUpdatedText(comment.text);
  //   setIsEditing(false);
  // };

  // const handleDelete = () => {
  //   dispatch(deleteComment(comment.id));
  // };
  // console.log(commentText);

  const toast = useToast();

  const handleAddComment = () => {
    if (commentText && user?.result) {
      const commentData = {
        commentText: commentText,
        creatorName: user?.result?.name,
        blogId,
        creatorImage: user?.result?.imgpath,
        isCreatorVerified: user?.result?.isVerified,
      };
      dispatch(createComment({ commentData }));
      setCommentText('');
    }
  };

  const handelAlert = () => {
    toast({
      position: 'top',
      title: 'Please Login to add comment',
      status: 'warning',
      isClosable: true,
    });
  };

  const { colorMode } = useColorMode();

  return (
    <Box w={'100%'} mt={5}>
      <Flex justifyContent={'center'} alignItems="center">
        <Divider flex="1" borderColor="gray.400" />
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          textAlign={'center'}
          fontWeight={600}
          m={{ base: 2, md: 3 }}
          ref={reference}
        >
          Add Comment
        </Text>

        <Divider flex="1" borderColor="gray.400" />
      </Flex>
      <Text
        textAlign={'center'}
        mt={-3}
        mb={2}
        color={colorMode === 'dark' ? 'gray.400' : 'gray.700'}
        fontWeight={600}
      >
        {' '}
        Don't forget to leave a comment. We appreciate your thoughts and
        opinions. Your feedback is what makes us better.
      </Text>
      <Divider borderColor="gray.400" mb={2} />
      <Box display={'flex'} alignItems={'center'}>
        <Avatar
          name={user?.result?.name}
          size="sm"
          src={user?.result?.imgpath}
        />

        <Input
          placeholder="Add a comment"
          // variant={'flushed'}
          bg={colorMode === 'dark' ? '#232433' : 'transparent'}
          pl={2}
          ml={2}
          borderColor={'gray.500'}
          _placeholder={{ color: 'gray.500', fontWeight: 600 }}
          rounded={'md'}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          // type="search"
        />
      </Box>
      {commentText && (
        <Box display={'flex'} gap={4} mt={2} justifyContent={'end'}>
          <Button
            size={{ base: 'sm', sm: 'sm', md: 'md' }}
            onClick={() => setCommentText('')}
          >
            Cancel
          </Button>
          <Button
            bg="#4f46e5"
            color={'#FFFFFF'}
            size={{ base: 'sm', sm: 'sm', md: 'md' }}
            onClick={user?.result ? handleAddComment : handelAlert}
          >
            Comment
          </Button>
        </Box>
      )}
    </Box>
  );

  // return (
  //   <Box borderWidth="1px" p="3" mt="3">
  //     {isEditing ? (
  //       <Stack spacing={2}>
  //         <Textarea
  //           value={updatedText}
  //           onChange={e => setUpdatedText(e.target.value)}
  //         />
  //         <Button colorScheme="teal" size="sm" onClick={handleSave}>
  //           Save
  //         </Button>
  //         <Button colorScheme="red" size="sm" onClick={handleCancel}>
  //           Cancel
  //         </Button>
  //       </Stack>
  //     ) : (
  //       <>
  //         <Text>{comment.text}</Text>
  //         <Button colorScheme="blue" size="sm" onClick={handleEdit}>
  //           Edit
  //         </Button>
  //         <Button colorScheme="red" size="sm" onClick={handleDelete}>
  //           Delete
  //         </Button>
  //         <Button
  //           colorScheme="teal"
  //           size="sm"
  //           onClick={() => setShowReplies(!showReplies)}
  //         >
  //           {showReplies ? 'Hide Replies' : 'Show Replies'}
  //         </Button>
  //         {/* Render replies when showReplies is true */}
  //         {showReplies && (
  //           <Box mt="3">
  //             {/* Assuming replies is an array of reply objects */}
  //             {comment.replies.map(reply => (
  //               <Reply key={reply.id} reply={reply} />
  //             ))}
  //           </Box>
  //         )}
  //       </>
  //     )}
  //   </Box>
  // );
};

export default Comment;
