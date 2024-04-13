import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// Create a thunk for creating a comment
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ commentData }, { rejectWithValue }) => {
    try {
      const response = await api.createComment(commentData);
      return response.data; // Assuming the API returns the created comment
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  'comments/getComments',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await api.getComments(blogId);
      return response.data; // Assuming the API returns the created comment
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create a thunk for editing a comment
export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ commentId, updatedCommentData }, { rejectWithValue }) => {
    console.log('edit', updatedCommentData);

    try {
      const response = await api.editComment(commentId, updatedCommentData);
      return response.data; // Assuming the API returns the edited comment
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create a thunk for deleting a comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(commentId);
      return commentId; // Return the deleted comment ID
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create a thunk for replying to a comment
export const replyToComment = createAsyncThunk(
  'comments/replyToComment',
  async ({ commentId, replyData }, { rejectWithValue }) => {
    try {
      const response = await api.replyToComment(commentId, replyData);
      return response.data; // Assuming the API returns the created reply
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [], // Store comments here
    commentsloading: false,
    error: null,
  },
  reducers: {
    // Define any additional synchronous actions for comments
  },
  extraReducers: {
    // Handle the asynchronous actions (createComment, editComment, deleteComment, replyToComment) here

    // ...

    [getComments.pending]: state => {
      state.commentsloading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentsloading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.commentsloading = false;
      state.error = action.payload;
    },

    [createComment.pending]: state => {
      state.commentsloading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.commentsloading = false;
      state.comments = [...state.comments, action.payload];
    },

    [createComment.rejected]: (state, action) => {
      state.commentsloading = false;
      state.error = action.payload;
    },
    // Handle the 'editComment' thunk lifecycle states

    [editComment.pending]: state => {
      state.commentsloading = true;
    },
    // [editComment.fulfilled]: (state, action) => {
    //   state.commentsloading = false;
    //   // Find and update the edited comment in the 'comments' array based on its ID
    //   const editedCommentIndex = state.comments.findIndex(
    //     comment => comment._id === action.payload._id
    //   );
    //   if (editedCommentIndex !== -1) {
    //     state.comments[editedCommentIndex] = action.payload;
    //   }
    // },

    [editComment.fulfilled]: (state, action) => {
      state.commentsloading = false;
      state.comments = state.comments.map(comment =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    [editComment.rejected]: (state, action) => {
      state.commentsloading = false;
      state.error = action.payload;
    },

    // Handle the 'deleteComment' thunk lifecycle states
    [deleteComment.pending]: state => {
      state.commentsloading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.commentsloading = false;
      // Remove the deleted comment from the 'comments' array based on its ID
      state.comments = state.comments.filter(
        comment => comment._id !== action.payload
      );
    },
    [deleteComment.rejected]: (state, action) => {
      state.commentsloading = false;
      state.error = action.payload;
    },

    // Handle the 'replyToComment' thunk lifecycle states
    [replyToComment.pending]: state => {
      state.commentsloading = true;
    },
    [replyToComment.fulfilled]: (state, action) => {
      state.commentsloading = false;
      // Find the parent comment and add the new reply to it (assuming the API returns the updated comment)
      const parentComment = state.comments.find(
        comment => comment._id === action.payload.parentCommentId
      );
      if (parentComment) {
        parentComment.replies.push(action.payload);
      }
    },
    [replyToComment.rejected]: (state, action) => {
      state.commentsloading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
