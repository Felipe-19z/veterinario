
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';

export const register = async (req: Request, res: Response) => {
  // DIAGNOSTIC CHANGE: Only email is now required from the frontend.
  const { email } = req.body;
  const name = req.body.name || 'Test User'; // Use provided name or default
  const password = req.body.password || 'password123'; // Use provided password or default
  const role = 'CLIENT'; // Role is always CLIENT

  if (!email) {
    return res.status(400).json({ message: 'Email is required for this diagnostic test.' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        client: { 
          create: {
            name: name,
          },
        },
      },
      include: {
        client: true,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ message: 'DIAGNOSTIC TEST SUCCESSFUL: User registered', user: userWithoutPassword });
  } catch (error) {
    console.error('DIAGNOSTIC ERROR:', error);
    res.status(400).json({ message: 'User with this email and role already exists', error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email_role: {
          email,
          role,
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const loginVet = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === 'matheus123@gmail.com' && password === '123456') {
    res.status(200).json({ message: 'Vet logged in successfully' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};
