import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Link,
  // theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from '../src/components/theme';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import CreateEditBlog from './pages/CreateEditBlog';
import BlogList from './pages/BlogList';
import SingleBlog from './pages/SingleBlog';
import Dashboard from './pages/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import BlogsByTags from './pages/BlogsByTags';
import Admin from './pages/Admin';
import PrivateAdminRoute from './components/PrivateAdminRoute';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  const bodyBg = useColorModeValue('#ffffff', '#16151e');

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* <header className="fixed-header"> */}
        <Header />
        {/* </header> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/createblog"
            element={
              <PrivateRoute>
                <CreateEditBlog />
              </PrivateRoute>
            }
          />
          <Route path="/blogslist" element={<BlogList />} />
          <Route path="/blogs/search" element={<BlogList />} />
          <Route path="/blogs/tag/:tag" element={<BlogsByTags />} />
          <Route path="/user/:id" element={<Dashboard />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <Admin />
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/editblog/:id"
            element={
              <PrivateRoute>
                <CreateEditBlog />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
