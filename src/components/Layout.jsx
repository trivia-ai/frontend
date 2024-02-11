import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Typography, Toolbar, ListItemText, ListItemButton, ListItem, List, IconButton, Drawer, Divider, CssBaseline, Box, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const appName = 'trivia.ai'

const navItems = [
  {name:'Dashboard', link:'/'},
  {name:'Analytics', link:'/analytics'},
];

function DrawerAppBar(props) {
  const email = localStorage.getItem('userEmail')

  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    navigate('/signin')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: '800' }}>
        {appName}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuClick(item.link)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleMenuClick = (link) => {
    console.log(link)
    navigate(link)
  }

  return (
    <Box sx={{ display: 'grid', margin: {
      xs: '1rem',
      sm: '3rem',
      md: '4rem',
    }}}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: '800' }}
          >
            {appName}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {email && navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }} onClick={() => handleMenuClick(item.link)}>
                {item.name}
              </Button>
            ))}

            {email && 
            <>
              <Button sx={{ color: '#fff' }} onClick={handleLogout}> Logout </Button>
              <span className='email_nav'>{email}</span>
            </>}

            

              
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <div>
          {children}
        </div>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;