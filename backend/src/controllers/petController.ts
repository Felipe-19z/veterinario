
import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Controller to create a pet
export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, species, ownerName } = req.body;

    if (!name || !species || !ownerName) {
      return res.status(400).json({ error: 'All fields are required. Make sure to provide name, species, and ownerName.' });
    }

    // Find the owner by name to get the ownerId
    const owner = await prisma.client.findFirst({
      where: { name: ownerName },
    });

    if (!owner) {
      return res.status(404).json({ error: `Client with name '${ownerName}' not found.` });
    }

    const newPet = await prisma.pet.create({
      data: {
        name,
        species,
        ownerId: owner.id,
      },
    });

    res.status(201).json(newPet);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to register pet', details: error.message });
  }
};

// Placeholder for getPets
export const getPets = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

// Placeholder for updatePet
export const updatePet = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

// Placeholder for deletePet
export const deletePet = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};
