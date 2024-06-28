'use client';
import { useStateValue } from '@/providers/StateContext';
import { styled, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { FiMenu, FiMoon } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';

const CustomAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #35145d 0%, #4477ce 197.78%);
`;
const pages = ['Home', 'Companies', 'Saved Items'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Logo = styled('img')`
  height: 50px;
  width: auto;
`;
const MainContainer = styled('div')`
  padding: 0 20px;
`;
function CustomNavbar() {
  const { state, dispatch } = useStateValue();
  const { mode } = state;
  const matches = useMediaQuery('(max-width:1000px)');
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pathname = usePathname();

  if (
    pathname.includes('admin') ||
    pathname.includes('login') ||
    pathname.includes('register')
  ) {
    return null;
  }

  return (
    <CustomAppBar position='static' color='primary'>
      <MainContainer>
        <Toolbar disableGutters>
          <Logo src={'nq.png'} />
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: matches ? 'row-reverse' : 'row',
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <FiMenu />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div
            style={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </div>

          <div style={{ flexGrow: 0 }}>
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
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </MainContainer>
    </CustomAppBar>
  );
}
export default CustomNavbar;
