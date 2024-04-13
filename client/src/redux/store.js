import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import BlogReducer from './features/blogSlice';
import CommentReducer from './features/commentsSlice';
import AdminReducer from './features/adminSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    blog: BlogReducer,
    comments: CommentReducer,
    admin: AdminReducer,
  },
});
