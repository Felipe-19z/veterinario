import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const VetLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login({ email, password, role: 'VET' });
      localStorage.setItem('userId', data.user.id);
      navigate('/vet'); // Redirect to vet page
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login de Veterinário
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Não tem uma conta? <Link to="/vet/register">Registre-se</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default VetLoginPage;
