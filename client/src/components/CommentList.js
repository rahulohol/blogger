import React, { useEffect, useState } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Spinner,
} from '@chakra-ui/react';

import { createComment, deleteComment } from '../redux/features/commentsSlice';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import Comment from './Comment';
import { getComments, editComment } from '../redux/features/commentsSlice';

import CommentEditModal from './CommentEditModal';

import { IoMdMore } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';

import { AiFillDownCircle, AiFillUpCircle } from 'react-icons/ai';
import CommentReplies from './CommentReplies';
import { GoVerified } from 'react-icons/go';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils/constants';

// const apiUrl = 'http://localhost:8000';

const CommentList = ({ blogId }) => {
  const { comments, commentsloading } = useSelector(state => ({
    ...state.comments,
  }));

  const { user } = useSelector(state => ({ ...state.auth }));

  const dispatch = useDispatch();
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [showReplies, setShowReplies] = useState({});

  const [replyInputText, setReplyInputText] = useState('');

  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    dispatch(getComments({ blogId }));
  }, [blogId]);

  let totalComments = 0;
  if (!commentsloading && comments) {
    totalComments = comments?.filter(el => el.mainParent == null).length;
  }

  const toggleReplies = commentId => {
    setShowReplies(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleAddCommentReply = (commentId, mainParent, parent) => {
    if (replyInputText && user?.result) {
      const commentData = {
        mainParent,
        parent,
        // commentText: replyInputText,
        commentText: replyInputText[commentId],
        creatorName: user?.result?.name,
        blogId,
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

  // const handleEdit = () => {};

  //start of edit
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  //delete

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
  return commentsloading ? (
    <Box display={'flex'} justifyContent={'center'} mt={5}>
      <Spinner />
    </Box>
  ) : (
    <Box w={'100%'} pl={2}>
      <Text size={'lg'} mt={3} mb={2} fontWeight={600}>
        {totalComments} Comments
      </Text>
      {!commentsloading &&
        comments &&
        comments
          ?.filter(el => el.mainParent == null)
          .reverse()
          .map((rootcomment, index) => {
            const commentId = rootcomment._id;
            const isRepliesVisible = showReplies[commentId] || false;
            return (
              <>
                <Box
                  display={'flex'}
                  mt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Link to={`/user/${rootcomment.creator}`}>
                    <Box display={'flex'} alignItems={'center'}>
                      <Avatar
                        name={rootcomment?.creatorName}
                        size="sm"
                        src={rootcomment?.creatorImage}
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
                            {rootcomment.creatorName}
                          </Text>
                          {rootcomment.isCreatorVerified && (
                            <Icon
                              as={GoVerified}
                              ml={1}
                              color={'blue.500'}
                              mb={-1.5}
                            />
                          )}
                        </Box>
                        <Text as="small" color="gray" ml={'7px'}>
                          {moment(rootcomment.createdAt).fromNow()}
                        </Text>
                      </Box>
                    </Box>
                  </Link>

                  {(user?.result?._id === rootcomment.creator ||
                    user?.result?.role === 'admin') && (
                    <Menu
                      // isOpen={isOpen} onClose={() => setIsOpen(false)}
                      _hover={{ bg: 'transparent' }}
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
                          onClick={() => handleEdit(rootcomment)}
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
                          onClick={() => handleDelete(commentId)}
                          // onClick={() => {
                          //   handleDelete(commentId);
                          // }}
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
                      // size={{ base: 'sm' }}
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
                              console.log(
                                'commentToDeleteId',
                                commentToDeleteId
                              );
                              dispatch(
                                deleteComment({ commentId: commentToDeleteId })
                              );
                              setIsDeleteModalOpen(false);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => setIsDeleteModalOpen(false)}
                            ml={2}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}
                </Box>
                <Text mb={1} fontWeight={500}>
                  {rootcomment.commentText}
                </Text>
                <Button
                  size={'sm'}
                  mb={2}
                  onClick={() =>
                    toggleReplyInput(commentId, rootcomment.creatorName)
                  } // Toggle reply input visibility for this comment
                >
                  REPLY
                  {/* {replyInputText[commentId] || 'REPLY'} */}
                </Button>

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
                      <Box
                        display={'flex'}
                        gap={4}
                        mt={2}
                        justifyContent={'end'}
                      >
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
                            user?.result
                              ? () =>
                                  handleAddCommentReply(
                                    commentId,
                                    commentId,
                                    commentId
                                  )
                              : handelAlert
                          }
                        >
                          Reply
                        </Button>
                      </Box>
                    )}
                  </>
                )}

                <Box
                  display={'flex'}
                  alignItems={'center'}
                  mb={1}
                  onClick={() => toggleReplies(commentId)}
                  cursor={'pointer'}
                >
                  <Icon
                    as={isRepliesVisible ? AiFillUpCircle : AiFillDownCircle}
                    boxSize={5}
                    // Toggle replies visibility
                    cursor="pointer"
                  />
                  <Text ml={2} fontWeight={700}>
                    {isRepliesVisible ? 'Hide Replies' : 'View Replies'}
                  </Text>
                </Box>
                {isRepliesVisible &&
                  comments
                    ?.filter(el => el.mainParent === commentId)
                    .map((reply, replyIndex) => (
                      <>
                        <Divider borderColor={'gray.400'} />

                        <CommentReplies reply={reply} />
                      </>
                    ))}
                <Divider borderColor={'gray.400'} />

                {/* <Box display={'flex'} alignItems={'center'} mb={1}>
                  <Icon as={AiFillDownCircle} boxSize={5} />
                  <Text ml={2} fontWeight={700}>
                    View Replies
                  </Text>
                </Box>
                <hr></hr> */}
              </>
            );
          })}
    </Box>
  );
  // <Box>
  //   {comments.map(comment => (
  //     <Comment key={comment.id} comment={comment} />
  //   ))}
  // </Box>
};

export default CommentList;
