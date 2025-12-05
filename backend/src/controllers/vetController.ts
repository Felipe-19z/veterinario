
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createVet = async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  try {
    const vet = await prisma.vet.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(vet);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vet' });
  }
};

export const getVets = async (req: Request, res: Response) => {
  try {
    const vets = await prisma.vet.findMany();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vets' });
  }
};

export const updateVet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const vet = await prisma.vet.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(vet);
  } catch (error) {
    res.status(404).json({ message: 'Vet not found' });
  }
};

export const deleteVet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.vet.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Vet deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Vet not found' });
  }
};
