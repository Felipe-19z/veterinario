
import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment, // Import the new cancel function
} from '../controllers/appointmentController';

const router = Router();

// Existing routes
router.post('/', createAppointment);
router.get('/', getAppointments); // This will be used by the vet to see all appointments
router.put('/:id', updateAppointment); // This will be used to edit

// New route for cancellation
router.post('/:id/cancel', cancelAppointment);

export default router;
