import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Box from '@mui/material/Box';
import { useState } from 'react';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="">
          <Outlet />
        </main>
    </>
  );
};

export default Layout;