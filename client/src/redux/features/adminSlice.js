import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { json } from 'react-router-dom';

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ updatedBlogData, config, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(updatedBlogData, config);
      // toast.success('Tour Added Successfully');
      navigate('/');
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogs = createAsyncThunk(
  'tour/getBlogs',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getBlogs(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlog = createAsyncThunk(
  'tour/getBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getBlog(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCreaterDetails = createAsyncThunk(
  'creater/getCreaterDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getCreaterDetails(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeBlog = createAsyncThunk(
  'blog/likeBlog',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeBlog(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogsByUser = createAsyncThunk(
  'blog/getBlogsByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getBlogsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBlog(id);
      // toast.success('Tour Deleted Successfully');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, updatedBlogData, config, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateBlog(updatedBlogData, id, config);
      // toast.success('Tour Updated Successfully');
      navigate('/dashboard');
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchBlogs = createAsyncThunk(
  'blog/searchBlogs',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getBlogsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogsByTag = createAsyncThunk(
  'blog/getBlogsByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagBlogs(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedBlogs = createAsyncThunk(
  'blog/getRelatedBlogs',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedBlogs(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getCategoryBlogs = createAsyncThunk(
  'blog/getCategoryBlogs',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedBlogs(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUsers(); // Replace with your API call
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const getAllBlogs = createAsyncThunk(
//   'admin/getAllBlogs',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.getAllBlogs(); // Replace with your API call
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    // tour: {},
    blog: {},
    blogs: [],
    users: [],
    tagBlogs: [],
    relatedBlogs: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    loading: false,
    creatorDetails: {},
    categoryBlogs: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getCreaterDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getCreaterDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.creatorDetails = action.payload;
    },
    [getCreaterDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = adminSlice.actions;

export default adminSlice.reducer;
