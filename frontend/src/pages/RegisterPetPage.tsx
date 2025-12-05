
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import Layout from '../components/Layout';
import { registerPet } from '../services/petService';

const RegisterPetPage: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !species || !ownerName) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await registerPet({ name, species, ownerName });
      setSuccess(`Pet "${name}" registado com sucesso!`);
      // Clear form
      setName('');
      setSpecies('');
      setOwnerName('');
    } catch (err) {
      setError('Falha ao registar o pet. Tente novamente.');
    }
  };

  return (
    <Layout title="Registar Novo Pet">
      <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Insira os dados do novo pet
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Pet"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Espécie"
            fullWidth
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Nome do Dono"
            fullWidth
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Registar Pet
          </Button>
        </form>
      </Paper>
    </Layout>
  );
};

export default RegisterPetPage;
