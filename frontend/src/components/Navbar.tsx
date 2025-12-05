
import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { logoutUser } from '../services/api';
import PetsIcon from '@mui/icons-material/Pets'; // Vet icon

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/vet/dashboard" // Link to the new Vet Dashboard
          startIcon={<PetsIcon />}
        >
          Painel Veterinário
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/settings"
          startIcon={<SettingsIcon />}
        >
          Configurações
        </Button>
        <IconButton
          color="inherit"
          component={Link}
          to="/inbox"
        >
          <MailIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
