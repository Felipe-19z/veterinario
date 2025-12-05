
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById, updateAppointment } from '../services/appointmentService';
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  MenuItem,
} from '@mui/material';
import Layout from '../components/Layout'; // Import Layout

const EditAppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!id) return;
      try {
        const response = await getAppointmentById(id);
        const { date, status } = response.data;
        setDate(new Date(date).toISOString().slice(0, 16));
        setStatus(status);
      } catch (err) {
        setError('Failed to fetch appointment details.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateAppointment(id, { date, status });
      navigate('/vet/appointments');
    } catch (err) {
      setError('Failed to update appointment.');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Layout title="Editar Consulta">
      <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Data e Hora"
            type="datetime-local"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Status"
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="PENDING">Pendente</MenuItem>
            <MenuItem value="SCHEDULED">Agendada</MenuItem>
            <MenuItem value="COMPLETED">Concluída</MenuItem>
            <MenuItem value="CANCELED">Cancelada</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth>
            Guardar Alterações
          </Button>
        </form>
      </Paper>
    </Layout>
  );
};

export default EditAppointmentPage;
