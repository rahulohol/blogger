import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, chkkratoast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);

      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// chkkratoast({
//   title: 'Login Successfully',
//   description: "We've created your account for you.",
//   status: 'success',
//   duration: 9000,
//   isClosable: true,
// });

export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, config, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue, config);
      navigate('/blogslist');
      // alert('Account Created');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const googleSignIn = createAsyncThunk(
//   'auth/googleSignIn',
//   async ({ result, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.googleSignIn(result);
//       toast.success('Google Sign-in Successfully');
//       navigate('/');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const followUser = createAsyncThunk(
  'auth/followUser',
  async ({ userId, userDetails }, { rejectWithValue }) => {
    try {
      const response = await api.followUser(userId, userDetails);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.unfollowUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  'auth/fetchFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getFollowers(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'auth/fetchFollowing',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getFollowing(userId);
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
    followers: [],
    following: [],
    creatorDetails: {},
    followUnFollow: false,
    followersCount: 0,
    buttonDisable: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      // localStorage.clear();
      localStorage.removeItem('profile');
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [googleSignIn.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [googleSignIn.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    //   state.user = action.payload;
    // },
    // [googleSignIn.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },

    [followUser.pending]: state => {
      state.loading = true; // You can set a loading state here if needed
      state.buttonDisable = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.followUnFollow = true;
      // state.followersCount = action.payload?.followersCount;

      // Update the followers list
      const followedUser = action.payload?.saveFollowing;
      state.followers = [...state.followers, followedUser];
      state.buttonDisable = false;

      console.log(state.followers);

      // If you also want to update the following list of the current user, you can do this:
      // state.following = [...state.following, followedUser];
    },
    [followUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle the error when the operation is rejected
      state.buttonDisable = false;
    },

    [unfollowUser.pending]: state => {
      state.loading = true;
      state.buttonDisable = true;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.followUnFollow = false;
      // state.followersCount = action.payload?.followersCount;

      // Remove the user from the followers list
      const unfollowedUserId = action.payload?.currentUser;
      state.followers = state.followers.filter(
        follower => follower._id !== unfollowedUserId
      );
      state.buttonDisable = false;
      console.log(action.payload);

      // If you also want to remove the user from the following list of the current user, you can do this:
      // state.following = state.following.filter(
      //   followedUser => followedUser._id !== unfollowedUserId
      // );
    },
    [unfollowUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle the error when the operation is rejected
      state.buttonDisable = false;
    },

    [fetchFollowers.pending]: state => {
      state.loading = true; // You can set a loading state here if needed
    },
    [fetchFollowers.fulfilled]: (state, action) => {
      state.loading = false;
      // Handle the fulfilled action when fetching followers is successful
      state.followers = action.payload; // Update followers list
    },
    [fetchFollowers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle the error when fetching followers is rejected
    },

    [fetchFollowing.pending]: state => {
      state.loading = true; // You can set a loading state here if needed
    },
    [fetchFollowing.fulfilled]: (state, action) => {
      state.loading = false;
      // Handle the fulfilled action when fetching following users is successful
      state.following = action.payload; // Update following users list
    },
    [fetchFollowing.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle the error when fetching following users is rejected
    },

    [getCreaterDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getCreaterDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.creatorDetails = action.payload;
      state.followers = action.payload?.followers;
      state.following = action.payload?.following;
      // state.followersCount = state.followers.length;
      console.log(state.followers);
    },
    [getCreaterDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;

// [unfollowUser.fulfilled]: (state, action) => {
//       state.loading = false;
//       console.log(state.followers);
//       state.followers = state.followers.filter(
//         item => item._id !== action.payload.currentUser
//       );
//       state.followUnFollow = false;
//       state.followersCount = action.payload.followersCount;
//       // Handle the fulfilled action when the operation is successful
//     },

// state.loading = false;
//       // state.followers = state.followers.push(action.payload);
//       state.followers.push(action.payload.saveFollow);
//       state.followUnFollow = true;
//       state.followersCount = action.payload.followersCount;
//       console.log(action.payload);
//       console.log(state.followers);

//       // Handle the fulfilled action when the operation is successful
