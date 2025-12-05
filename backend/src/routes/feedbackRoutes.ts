
import { Router } from 'express';
import {
    getAllTopics,
    getTopicById,
    createTopic,
    createComment,
    updateComment,
    deleteComment
} from '../controllers/feedbackController';
// import { protect } from '../middleware/authMiddleware'; // We will add this later

const router = Router();

// Unprotected routes
router.get('/topics', getAllTopics);
router.get('/topics/:id', getTopicById);

// Authenticated routes (we'll add middleware later)
router.post('/topics', createTopic); 
router.post('/topics/:id/comments', createComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router;
