import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import Layout from '../components/Layout';

const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here
    console.log({ name, description });
  };

  return (
    <Layout title="Suporte">
      <Paper elevation={3} sx={{ p: 2 }}>
        <TextField
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
      </Paper>
    </Layout>
  );
};

export default SupportPage;
