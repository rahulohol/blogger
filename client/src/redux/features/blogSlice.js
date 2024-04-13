import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { json } from 'react-router-dom';

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ updatedBlogData, config, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(updatedBlogData, config);
      // toast.success('Tour Added Successfully');
      navigate('/blogslist');

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
      navigate('/blogslist');
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

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    // tour: {},
    blog: {},
    blogs: [],
    userBlogs: [],
    tagBlogs: [],
    relatedBlogs: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    loading: false,
    creatorDetails: {},
    categoryBlogs: [],
    buttonDisable: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = [action.payload];
      // console.log(state.blogs);
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
      // console.log(state.blogs);
    },
    [getBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    },
    [getBlogsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.filter(item => item._id !== id);
        state.blogs = state.blogs.filter(item => item._id !== id);
      }
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.map(item =>
          item._id === id ? action.payload : item
        );
        state.blogs = state.blogs.map(item =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeBlog.pending]: (state, action) => {
      state.buttonDisable = true;
    },
    [likeBlog.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.blogs = state.blogs.map(item =>
          item._id === _id ? action.payload : item
        );
        state.userBlogs = state.userBlogs.map(item =>
          item._id === _id ? action.payload : item
        );

        if (_id === state?.blog?._id) {
          state.blog = action.payload;
        }
      }
      state.buttonDisable = false;
    },
    [likeBlog.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.buttonDisable = false;
    },

    [searchBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [searchBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      // localStorage.setItem('blogs', JSON.stringify(action.payload));
      // state.blogs = JSON.parse(localStorage.getItem('blogs'));
    },
    [searchBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogsByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogsByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagBlogs = action.payload;
    },
    [getBlogsByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedBlogs = action.payload;
    },
    [getRelatedBlogs.rejected]: (state, action) => {
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
    [getCategoryBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoryBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryBlogs = action.payload;
    },
    [getCategoryBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = blogSlice.actions;

export default blogSlice.reducer;
