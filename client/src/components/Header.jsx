import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MsuBarodaLogo from '../assets/Msu_baroda_logo.png';
import Logout from '../components/Logout';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      Logout();
      setIsLoggedIn(false);ī
    } else {
      navigate('/login');
    }
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
        <Button color="inherit" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
