"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInboxMessages = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getInboxMessages = async (req, res) => {
    // For now, we'll get the userId from the query params.
    // Later, this should come from an authenticated session.
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const inboxMessages = await prisma_1.default.inbox.findMany({
            where: {
                userId: parseInt(userId),
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.status(200).json(inboxMessages);
    }
    catch (error) {
        console.error('Error retrieving inbox messages:', error);
        res.status(500).json({ message: 'Error retrieving inbox messages' });
    }
};
exports.getInboxMessages = getInboxMessages;
//# sourceMappingURL=inboxController.js.map