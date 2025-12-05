
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getInboxMessages = async (req: Request, res: Response) => {
  // For now, we'll get the userId from the query params.
  // Later, this should come from an authenticated session.
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const inboxMessages = await prisma.inbox.findMany({
      where: {
        userId: parseInt(userId as string),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(inboxMessages);
  } catch (error) {
    console.error('Error retrieving inbox messages:', error);
    res.status(500).json({ message: 'Error retrieving inbox messages' });
  }
};
