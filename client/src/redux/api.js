import axios from 'axios';
import { apiUrl } from '../utils/constants';

// const devEnv = process.env.NODE_ENV !== "production";

// const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  // baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  baseURL: apiUrl,
});

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const signIn = formData => API.post('/users/signin', formData);

export const signUp = (formData, config) =>
  API.post('/users/signup', formData, config);

export const googleSignIn = result => API.post('/users/googleSignIn', result);

export const createBlog = (blogData, config) =>
  API.post('/blog/create', blogData, config);

export const getBlogs = page => API.get(`/blog/getblogs?page=${page}`);

export const getBlog = id => API.get(`/blog/blog/${id}`);

export const getCreaterDetails = id =>
  API.get(`/users/getcreaterdetails/${id}`);
export const getAllUsers = id => API.get(`/users/getallusers`);

export const deleteBlog = id => API.delete(`/blog/delete/${id}`);

export const updateBlog = (updatedBlogData, id, config) =>
  API.put(`/blog/update/${id}`, updatedBlogData, config);

export const getBlogsByUser = userId => API.get(`/blog/userblogs/${userId}`);

export const getBlogsBySearch = searchQuery =>
  API.get(`/blog/search?searchQuery=${searchQuery}`);

export const getTagBlogs = tag => API.get(`/blog/tag/${tag}`);

export const getRelatedBlogs = tags => API.post(`/blog/relatedBlogs`, tags);

export const likeBlog = id => API.patch(`/blog/like/${id}`);

export const createComment = commentData =>
  API.post('/comment/create', commentData);

export const getComments = blogId => API.get(`/comment/comments/${blogId}`);

export const replyToComment = replyData =>
  API.post('/api/comments/reply', replyData);

export const editComment = (commentId, updatedCommentData) =>
  API.put(`/comment/edit/${commentId}`, updatedCommentData);

export const deleteComment = commentId =>
  API.delete(`/comment/delete/${commentId}`);

export const getBlogsByCategory = searchQuery =>
  API.get(`/blog/search?searchQuery=${searchQuery}`);

export const followUser = (userId, userDetails) =>
  API.post(`/users/follow/${userId}`, userDetails);

export const unfollowUser = userId => API.post(`/users/unfollow/${userId}`);

export const getFollowers = userId => API.get(`/users/${userId}/followers`);
export const getFollowing = userId => API.get(`/users/${userId}/following`);
