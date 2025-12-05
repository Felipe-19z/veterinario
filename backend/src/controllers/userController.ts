import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Em um cenário real, você invalidaria o token de sessão aqui.
    // Por enquanto, apenas retornamos uma mensagem de sucesso.
    res.status(200).json({ message: 'Logout bem-sucedido' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer logout' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};
