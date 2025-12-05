import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { deleteUser } from '../services/api';

const SettingsPage: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('backgroundColor') || '#ffffff');
  const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('backgroundImage') || '');
  const navigate = useNavigate();

  const handleSaveSettings = () => {
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('backgroundImage', backgroundImage);
    alert('Configurações salvas!');
  };

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Por favor, faça login novamente.');
      return;
    }

    try {
      await deleteUser(parseInt(userId, 10));
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  };

  return (
    <Layout title="Configurações">
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Personalização</Typography>
        <TextField
          label="Cor de Fundo"
          type="color"
          fullWidth
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL da Imagem de Fundo"
          fullWidth
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSaveSettings}>
          Salvar Alterações
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">Gerenciamento da Conta</Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAccount} fullWidth>
          Deletar Conta
        </Button>
      </Paper>
    </Layout>
  );
};

export default SettingsPage;
