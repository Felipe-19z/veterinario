import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Box } from '@mui/material';
import Layout from '../components/Layout';

const ClientDashboard: React.FC = () => {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    const applySettings = () => {
      const color = localStorage.getItem('backgroundColor');
      const image = localStorage.getItem('backgroundImage');
      const style = {
        backgroundColor: color || 'transparent',
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      };
      setBackgroundStyle(style);
    };

    applySettings();
    window.addEventListener('storage', applySettings);

    return () => {
      window.removeEventListener('storage', applySettings);
    };
  }, []);

  const handleSchedule = () => {
    console.log({ petName, petBreed, appointmentDate });
    alert('Sua consulta foi solicitada!');
  };

  return (
    <Box sx={backgroundStyle}>
      <Layout title="Consultas">
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <TextField
            label="Nome do Pet"
            fullWidth
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Raça"
            fullWidth
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Data da Consulta"
            type="date"
            fullWidth
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" onClick={handleSchedule}>
            Agendar
          </Button>
        </Paper>

        <Button>Chamar Veterinário</Button>
      </Layout>
    </Box>
  );
};

export default ClientDashboard;
