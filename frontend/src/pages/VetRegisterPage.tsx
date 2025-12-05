import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const VetRegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'VET'; // Role is now fixed to VET
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await register({ name, email, password, role });
      console.log(data);
      alert('Your account has been registered!');
      navigate('/vet/login');
    } catch (error) {
      console.error(error);
      // Handle registration error
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
          Registrar Veterinário
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
		      <Link to="/vet/login" style={{ textDecoration: 'none', width: '100%' }}>
				<Button
				fullWidth
				variant="outlined"
				>
				Go to Login
				</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default VetRegisterPage;
