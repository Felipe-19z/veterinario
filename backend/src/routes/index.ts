
import { Router } from 'express';
import authRoutes from './auth';
import vetRoutes from './vets';
import clientRoutes from './clients';
import petRoutes from './pets';
import appointmentRoutes from './appointments';
import inboxRoutes from './inboxRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/vets', vetRoutes);
router.use('/clients', clientRoutes);
router.use('/pets', petRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/inbox', inboxRoutes);

export default router;
