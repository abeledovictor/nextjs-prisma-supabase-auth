import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle } from '@mui/icons-material';
import TranslateIcon from '@mui/icons-material/Translate';

function Nav(props) {
  const { isLogged, logout } = props
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    handleCloseUserMenu()
    logout?.()
  }

  const onLogin = () => {
    handleCloseUserMenu()
    router.push('/api/auth/signin')
  }

  const onSignup = () => {
    handleCloseUserMenu()
    router.push('/api/auth/signin')
  }

  const onHome = () => {
    handleCloseUserMenu()
    router.push('/')
  }

  return (
    <AppBar position="static" sx={{bgcolor: 'secondary.dark'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TranslateIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOILERPLATE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              <MenuItem onClick={onHome}>
                <Typography textAlign="center">onHome</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <TranslateIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOILERPLATE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={onHome}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{height: '40px', width: '40px'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              {isLogged ? (
                [
                  <MenuItem key="logout" onClick={onLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" onClick={onLogin}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>,
                  <MenuItem key="signup" onClick={onSignup}>
                    <Typography textAlign="center">Create Account</Typography>
                  </MenuItem>
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;