import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const VetDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate('/feedback');
  };

  return (
    <Layout title="Painel do Veterinário">
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Bem-vindo, Dr(a). Veterinário(a)!</Typography>
        <Typography>Este é o seu painel de controle.</Typography>
      </Paper>
      <Button variant="contained" sx={{ mr: 2 }}>Ver Consultas</Button>
      <Button variant="contained" onClick={handleFeedbackClick}>Ver Feedbacks</Button>
    </Layout>
  );
};

export default VetDashboard;
