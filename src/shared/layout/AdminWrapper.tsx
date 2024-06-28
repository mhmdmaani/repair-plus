import LoadingProvider from '@/providers/LoadingProvider';
import { useStateValue } from '@/providers/StateContext';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiInbox,
  FiMail,
  FiMenu,
  FiMoon,
} from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';
import { FaTruckFast, FaUserTie } from 'react-icons/fa6';
import { MdLibraryBooks, MdAlternateEmail } from 'react-icons/md';
import { BiSolidOffer } from 'react-icons/bi';
import { FaTruck, FaCogs } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';

const drawerWidth = 240;

const MainContainer = styled('div')`
  display: flex;
  background-color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.background.default
      : props.theme.palette.grey[100]};
  min-height: calc(100vh - 65px);
`;

const Content = styled('div')``;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useStateValue();
  const { mode } = state;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MainContainer>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ ...(open && { display: 'none', marginBottom: 0 }) }}
            >
              <FiMenu />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Repair Plus
            </Typography>
          </Toolbar>

          <Tooltip title='Open settings'>
            <>
              <IconButton
                onClick={() =>
                  dispatch({
                    type: 'SET_MODE',
                    payload: mode === 'dark' ? 'light' : 'dark',
                  })
                }
              >
                {mode === 'dark' ? <FiMoon /> : <IoSunny />}
              </IconButton>
            </>
          </Tooltip>
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <FiChevronLeft /> : <FiChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton href='/admin/dashboard'>
              <ListItemIcon>
                <FiHome />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href='/admin/brands'>
              <ListItemIcon>
                <FaTruck />
              </ListItemIcon>
              <ListItemText primary={'Brands'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href='/admin/devices'>
              <ListItemIcon>
                <MdLibraryBooks />
              </ListItemIcon>
              <ListItemText primary={'Devices'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href='/admin/subscriptions'>
              <ListItemIcon>
                <MdAlternateEmail />
              </ListItemIcon>
              <ListItemText primary={'Subscriptions'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href='/admin/settings'>
              <ListItemIcon>
                <FaCogs />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href='/admin/term'>
              <ListItemIcon>
                <LiaFileContractSolid />
              </ListItemIcon>
              <ListItemText primary={'Terms & Conditions'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton href='/api/auth/signout'>
              <ListItemIcon>
                <FiInbox />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <LoadingProvider>{children}</LoadingProvider>
      </Main>
    </MainContainer>
  );
}
