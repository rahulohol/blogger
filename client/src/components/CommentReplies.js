import {
  Box,
  Text,
  Button,
  Input,
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Divider,
  Icon,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { createComment, deleteComment } from '../redux/features/commentsSlice';
import { GoVerified } from 'react-icons/go';
import CommentEditModal from './CommentEditModal';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils/constants';

// const apiUrl = 'http://localhost:8000';

const CommentReplies = ({ reply }) => {
  const commentId = reply._id;

  const { user } = useSelector(state => ({ ...state.auth }));

  const { commentsloading } = useSelector(state => ({
    ...state.comments,
  }));

  const [showReplyInput, setShowReplyInput] = useState(false);

  const [replyInputText, setReplyInputText] = useState('');

  const { colorMode } = useColorMode();
  const toast = useToast();

  const dispatch = useDispatch();

  const handleAddCommentReply = () => {
    if (replyInputText && user?.result) {
      const commentData = {
        mainParent: reply.mainParent,
        parent: commentId,
        // commentText: replyInputText,
        commentText: replyInputText[commentId],
        creatorName: user?.result?.name,
        blogId: reply.blogId,
        creatorImage: user?.result?.imgpath,
        creator: user?.result?._id,
        isCreatorVerified: user?.result?.isVerified,
      };
      dispatch(createComment({ commentData }));
      setReplyInputText('');
    }
  };

  const handelAlert = () => {
    toast({
      position: 'top',
      title: 'Please Login to Reply',
      status: 'warning',
      isClosable: true,
    });
  };

  const toggleReplyInput = (commentId, parentName) => {
    setReplyInputText(prevText => ({
      ...prevText,
      [commentId]: prevText[commentId] ? '' : `@${parentName} `,
    }));
  };

  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);

  const handleEdit = comment => {
    setSelectedComment(comment);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedComment(null);
  };

  // const handleDelete = commentId => {
  //   dispatch(deleteComment({ commentId }));
  // };

  const handleDelete = commentId => {
    setCommentToDeleteId(commentId);
    setIsDeleteModalOpen(true);
  };

  const openDeleteModal = commentId => {
    setCommentToDeleteId(commentId);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Box
        display={'flex'}
        mt={2}
        justifyContent={'space-between'}
        alignItems={'center'}
        pl={5}
      >
        <Link to={`/user/${reply.creator}`}>
          <Box display={'flex'} alignItems={'center'}>
            <Avatar
              name={reply.creatorName}
              size="sm"
              src={reply.creatorImage}
            />
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
                  mb={-1.5}
                >
                  {reply.creatorName}
                </Text>
                {reply.isCreatorVerified && (
                  <Icon as={GoVerified} ml={1} color={'blue.500'} mb={-1.5} />
                )}
              </Box>
              <Text as="small" color="gray" ml={'7px'}>
                {moment(reply.createdAt).fromNow()}
              </Text>
            </Box>
          </Box>
        </Link>
        {(user?.result?._id === reply.creator ||
          user?.result?.role === 'admin') && (
          <Menu
          // isOpen={isOpen} onClose={() => setIsOpen(false)}
          >
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<IoMdMore />}
              bg="transparent"
              fontSize="25px"
              _hover={{ bg: 'transparent' }}
              // onClick={() => setIsOpen(!isOpen)}
            />
            <MenuList
              minWidth="120px"
              position="absolute"
              bottom="-20"
              left="-20"
              top=".9"
            >
              <MenuItem
                icon={<MdEdit />}
                onClick={() => handleEdit(reply)}
                // bg={'orange'}
                // rounded={'md'}
                fontSize={'17px'}
                fontWeight={600}
                // boxSize={5}
                // color={'#FFFFFF'}
                // h={'50%'}
              >
                Edit
              </MenuItem>
              <Divider />
              <Divider />
              <MenuItem
                icon={<MdDelete />}
                // onClick={() => {

                //   // handleDelete(commentId);
                // }}
                onClick={() => handleDelete(commentId)}
                // bg={'red.500'}
                rounded={'md'}
                fontSize={'17px'}
                fontWeight={600}
                // color={'#FFFFFF'}
                h={'50%'}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {selectedComment && (
          <CommentEditModal
            isOpen={true}
            onClose={() => setSelectedComment(null)}
            comment={selectedComment}
            onSave={() => setSelectedComment(null)}
          />
        )}
        {isDeleteModalOpen && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this comment?
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    console.log('commentToDeleteId', commentToDeleteId);
                    dispatch(deleteComment({ commentId: commentToDeleteId }));
                    setIsDeleteModalOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button onClick={() => setIsDeleteModalOpen(false)} ml={2}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
      <Text mb={1} pl={4} fontWeight={500}>
        {reply.commentText}
      </Text>
      <Box pl={4}>
        <Button
          size={'sm'}
          mb={2}
          onClick={() => toggleReplyInput(commentId, reply.creatorName)} //
        >
          REPLY
          {/* {replyInputText[commentId] || 'REPLY'} */}
        </Button>
      </Box>
      {replyInputText[commentId] && (
        <>
          <Box display={'flex'} alignItems={'center'}>
            <Avatar
              name={user?.result?.name}
              size="sm"
              src={user?.result?.imgpath}
            />

            <Input
              placeholder="Add a comment"
              bg={colorMode === 'dark' ? '#232433' : 'transparent'}
              pl={2}
              ml={2}
              _placeholder={{ color: 'gray.500', fontWeight: 600 }}
              rounded={'md'}
              value={replyInputText[commentId] || ''}
              onChange={e =>
                setReplyInputText(prevText => ({
                  ...prevText,
                  [commentId]: e.target.value,
                }))
              }
            />
          </Box>
          {replyInputText[commentId] && (
            <Box display={'flex'} gap={4} mt={2} justifyContent={'end'}>
              <Button
                size={{ base: 'sm', sm: 'sm', md: 'md' }}
                onClick={() => toggleReplyInput(commentId)} // Toggle reply input visibility for this comment
              >
                Cancel
              </Button>
              <Button
                bg="#4f46e5"
                color={'#FFFFFF'}
                size={{ base: 'sm', sm: 'sm', md: 'md' }}
                onClick={
                  user?.result ? () => handleAddCommentReply() : handelAlert
                }
              >
                Reply
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default CommentReplies;
