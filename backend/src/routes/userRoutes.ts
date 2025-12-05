import express from 'express';
import { logoutUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/logout', logoutUser);
router.delete('/:id', deleteUser);

export default router;
