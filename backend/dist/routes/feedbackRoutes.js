"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedbackController_1 = require("../controllers/feedbackController");
// import { protect } from '../middleware/authMiddleware'; // We will add this later
const router = (0, express_1.Router)();
// Unprotected routes
router.get('/topics', feedbackController_1.getAllTopics);
router.get('/topics/:id', feedbackController_1.getTopicById);
// Authenticated routes (we'll add middleware later)
router.post('/topics', feedbackController_1.createTopic);
router.post('/topics/:id/comments', feedbackController_1.createComment);
router.put('/comments/:id', feedbackController_1.updateComment);
router.delete('/comments/:id', feedbackController_1.deleteComment);
exports.default = router;
//# sourceMappingURL=feedbackRoutes.js.map