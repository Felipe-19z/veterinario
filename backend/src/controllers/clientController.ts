
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createClient = async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  try {
    const client = await prisma.client.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: 'Error creating client' });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clients' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ message: 'Client not found' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.client.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Client not found' });
  }
};
