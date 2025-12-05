
import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'; // Import the Layout component

const VetDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Painel do Veterinário">
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Bem-vindo, Dr(a). Veterinário(a)!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Este é o seu painel de controlo.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/vet/appointments')}
            sx={{ width: '200px' }}
          >
            Ver Consultas
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/vet/register-pet')}
            sx={{ width: '200px' }}
          >
            Registar Pet
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/feedback')}
            sx={{ width: '200px' }}
          >
            Ver Feedbacks
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
};

export default VetDashboardPage;
