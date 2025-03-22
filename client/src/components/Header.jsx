import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import  useAuth  from '../hooks/useAuth';
import MsuBarodaLogo from '../assets/Msu_baroda_logo.png';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();
  const logout  = useLogout();

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/Admin') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, );

  const handleLogout = async () => {
    if ( (location.pathname === '/dashboard'|| location.pathname === '/Admin')) {
      setIsLoggedIn(false);
    }
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0C769F' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img className='max-h-18' src={MsuBarodaLogo} alt="MSU Baroda Logo" style={{ marginRight: 10 }} />
          <Typography variant="h6" component="div">
            The Maharaja Sayajirao University of Baroda
          </Typography>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
