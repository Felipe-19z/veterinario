"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.createTopic = exports.getTopicById = exports.getAllTopics = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// @desc    Get all feedback topics
// @route   GET /api/feedback/topics
// @access  Public
const getAllTopics = async (req, res) => {
    try {
        const topics = await prisma_1.default.feedbackTopic.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
                _count: {
                    select: { comments: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.status(200).json(topics);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get topics', error: error.message });
    }
};
exports.getAllTopics = getAllTopics;
// @desc    Get a single feedback topic by ID
// @route   GET /api/feedback/topics/:id
// @access  Public
const getTopicById = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await prisma_1.default.feedbackTopic.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.status(200).json(topic);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get topic', error: error.message });
    }
};
exports.getTopicById = getTopicById;
// @desc    Create a new feedback topic
// @route   POST /api/feedback/topics
// @access  Authenticated
const createTopic = async (req, res) => {
    try {
        const { title, description, authorId } = req.body;
        if (!title || !description || !authorId) {
            return res.status(400).json({ message: 'Please provide title, description, and authorId' });
        }
        const newTopic = await prisma_1.default.feedbackTopic.create({
            data: {
                title,
                description,
                authorId,
            },
        });
        res.status(201).json(newTopic);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create topic', error: error.message });
    }
};
exports.createTopic = createTopic;
// @desc    Create a new comment on a topic
// @route   POST /api/feedback/topics/:id/comments
// @access  Authenticated
const createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, authorId } = req.body;
        if (!content || !authorId) {
            return res.status(400).json({ message: 'Please provide content and authorId' });
        }
        const newComment = await prisma_1.default.feedbackComment.create({
            data: {
                content,
                authorId,
                topicId: parseInt(id),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            }
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
};
exports.createComment = createComment;
// @desc    Update a comment
// @route   PUT /api/feedback/comments/:id
// @access  Authenticated (Owner only)
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        // In a real app, you'd get userId from token and check ownership
        // const userId = req.user.id;
        const commentToUpdate = await prisma_1.default.feedbackComment.findUnique({
            where: { id: parseInt(id) }
        });
        // if (commentToUpdate.authorId !== userId) {
        //     return res.status(403).json({ message: "Not authorized to update this comment" });
        // }
        if (!commentToUpdate) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const updatedComment = await prisma_1.default.feedbackComment.update({
            where: { id: parseInt(id) },
            data: {
                content,
                edited: true, // Set edited flag
            },
        });
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error: error.message });
    }
};
exports.updateComment = updateComment;
// @desc    Delete a comment
// @route   DELETE /api/feedback/comments/:id
// @access  Authenticated (Owner only)
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        // In a real app, you'd get userId from token and check ownership
        // const userId = req.user.id; 
        const commentToDelete = await prisma_1.default.feedbackComment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!commentToDelete) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // if (commentToDelete.authorId !== userId) {
        //     return res.status(403).json({ message: "Not authorized to delete this comment" });
        // }
        await prisma_1.default.feedbackComment.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error: error.message });
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=feedbackController.js.map