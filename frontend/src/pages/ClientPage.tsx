import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@mui/material';
import Layout from '../components/Layout';

const ClientPage: React.FC = () => {
  return (
    <Layout title="Client Dashboard">
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Consultas</Typography>
        <Typography>Aqui você pode agendar e ver suas próximas consultas.</Typography>
        <Link to="/consultas" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ mt: 1 }}>Ver Consultas</Button>
        </Link>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Suporte</Typography>
        <Typography>Se precisar de ajuda, entre em contato com nossa equipe de suporte.</Typography>
        <Link to="/suporte" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ mt: 1 }}>Contatar Suporte</Button>
        </Link>
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">Feedback e Reclamações</Typography>
        <Typography>Tem alguma reclamação ou feedback? Nos informe aqui.</Typography>
        <Link to="/feedback" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ mt: 1 }}>Dar Feedback</Button>
        </Link>
      </Paper>
    </Layout>
  );
};

export default ClientPage;
