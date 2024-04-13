import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Textarea, // Import Textarea from Chakra UI
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { editComment } from '../redux/features/commentsSlice';

const CommentEditModal = ({ isOpen, onClose, comment, onSave }) => {
  const [editedText, setEditedText] = useState(comment.commentText);
  const dispatch = useDispatch();

  const handleSave = () => {
    let updatedCommentData = { commentText: editedText };
    dispatch(editComment({ commentId: comment._id, updatedCommentData }));
    onSave();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Comment</ModalHeader>
        <ModalBody>
          {/* Use Textarea instead of Input */}
          <Textarea
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            rows={3} // Set the initial number of rows
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentEditModal;
