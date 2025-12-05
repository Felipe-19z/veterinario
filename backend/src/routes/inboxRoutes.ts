
import { Router } from 'express';
import { getInboxMessages } from '../controllers/inboxController';

const router = Router();

router.get('/', getInboxMessages);

export default router;
