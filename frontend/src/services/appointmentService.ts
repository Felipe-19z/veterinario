
import api from './api';

// Fetch all appointments for the vet view
export const getAppointments = () => {
  return api.get('/appointments');
};

// Fetch a single appointment by its ID
export const getAppointmentById = (id: string) => {
  return api.get(`/appointments/${id}`);
};

// Update an appointment's details
export const updateAppointment = (id: string, data: { date?: string; status?: string }) => {
  return api.put(`/appointments/${id}`, data);
};

// Cancel an appointment with a justification
export const cancelAppointment = (id: string, justification: string) => {
  return api.post(`/appointments/${id}/cancel`, { justification });
};
