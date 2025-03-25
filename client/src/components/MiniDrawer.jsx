import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 340;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const StyledButton = styled(Button)(({ theme, active }) => ({
  textTransform: 'none',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function MiniDrawer({ selectOptions, datachanger, componentChanger }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeOption, setActiveOption] = useState('Profile');

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{
          marginTop: "64px",
          [`& .MuiDrawer-paper`]: {
            marginTop: "73px",
          }}}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        {open ? <StyledButton 
          key={"Profile"}
          {...(activeOption === "Profile" && { active: "true" })}
          onClick = {()=>{setActiveOption("Profile"); componentChanger('Profile');}}>
          <Typography>
            {"Profile"}
          </Typography>  
        </StyledButton> : null}
        {open ? selectOptions?.map((option) => (
          <>
          <StyledButton
            key={option._id}
            {...(activeOption === option._id && { active: "true" })}
            onClick={() => { setActiveOption(option._id); console.log(`option`, option.routes); datachanger(option); componentChanger(null)}}
          >
            <Typography>{option.name}</Typography>
          </StyledButton>
          </>
        )) : null}
       {open ? <StyledButton 
          key={"Generate CV"}
          {...(activeOption === "Generate CV" && { active: "true" })}
          onClick = {()=>{setActiveOption("Generate CV"); componentChanger('Generate CV');}}>
          <Typography>
            {"Generate CV"}
          </Typography>  
        </StyledButton> : null}
      </Drawer>
    </Box>
  );
}