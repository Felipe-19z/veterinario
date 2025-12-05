
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cancelAppointment } from '../services/appointmentService';
import {
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import Layout from '../components/Layout'; // Import Layout

const CancelAppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [justification, setJustification] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!justification) {
      setError('A justificação é obrigatória.');
      return;
    }

    try {
      await cancelAppointment(id, justification);
      navigate('/vet/appointments');
    } catch (err) {
      setError('Falha ao cancelar a consulta.');
    }
  };

  return (
    <Layout title="Cancelar Consulta">
      <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Justificação"
            multiline
            rows={4}
            fullWidth
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="error" fullWidth>
            Confirmar Cancelamento
          </Button>
        </form>
      </Paper>
    </Layout>
  );
};

export default CancelAppointmentPage;
