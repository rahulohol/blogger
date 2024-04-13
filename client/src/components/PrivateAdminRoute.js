import React from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import NotAuthAdmin from './NotAuthAdmin';
import NotFound from '../pages/NotFound';

const PrivateAdminRoute = ({ children }) => {
  const { user } = useSelector(state => ({ ...state.auth }));
  return user?.result?.role === 'admin' ? children : <NotFound />;
};

export default PrivateAdminRoute;
