import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login({ email, password, role: 'CLIENT' });
      console.log(data);
      navigate('/client'); // Redirect to client page
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', maxWidth: '400px' }}>
        <Typography component="h1" variant="h5" color="black">
          Login
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/register" style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              fullWidth
              variant="outlined"
            >
              Register
            </Button>
          </Link>
          <Link to="/vet/login" style={{ textDecoration: 'none', width: '100%', display: 'block', textAlign: 'center', marginTop: '10px' }}>
            <Button
              variant="text"
            >
              Login de Veterinário
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
