import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Link,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  // const colorChange = localStorage.getItem('chakra-ui-color-mode');
  // const [change, setChange] = useState(colorChange);
  // useEffect(() => {
  //   setChange(colorChange);
  // }, [colorChange]);
  // console.log(change);
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
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
