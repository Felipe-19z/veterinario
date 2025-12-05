
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required' });
  }

  // For now, we only handle CLIENT registration as per the frontend logic
  if (role !== 'CLIENT') {
    return res.status(400).json({ message: 'Registration is currently only available for the CLIENT role' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    // Create the User and the associated Client in a single transaction
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        client: { // Nested write to create a Client simultaneously
          create: {
            name: name,
          },
        },
      },
      include: {
        client: true, // Include the created client profile in the response
      },
    });

    // We don't want to send the password back, even if it's hashed
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (error) {
    console.error(error); // Log the actual error for debugging on the server
    // The unique constraint on user will likely trigger this
    res.status(400).json({ message: 'User with this email and role already exists' });
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
