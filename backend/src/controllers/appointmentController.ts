
import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Helper function to format changes for the inbox message
const formatChanges = (oldData: any, newData: any): string => {
  const changes: string[] = [];
  if (newData.date && new Date(oldData.date).toISOString() !== new Date(newData.date).toISOString()) {
    changes.push(`Data alterada de ${new Date(oldData.date).toLocaleString('pt-BR')} para ${new Date(newData.date).toLocaleString('pt-BR')}`);
  }
  if (newData.status && oldData.status !== newData.status) {
    changes.push(`Status alterado de ${oldData.status} para ${newData.status}`);
  }
  // Add other fields as needed
  if (changes.length === 0) {
    return 'Nenhuma alteração detetada.';
  }
  return `A sua consulta foi atualizada: ${changes.join(', ')}.`;
};

export const createAppointment = async (req: Request, res: Response) => {
  const { date, petId, vetId } = req.body;
  try {
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        pet: { connect: { id: petId } },
        vet: { connect: { id: vetId } },
        status: 'PENDING',
      },
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating appointment' });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        pet: {
          include: {
            owner: true,
          },
        },
        vet: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving appointments' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    // 1. Get the original appointment to find the client and compare changes
    const originalAppointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: { pet: { include: { owner: true } } },
    });

    if (!originalAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // 2. Update the appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        date: date ? new Date(date) : undefined,
        status,
      },
    });

    // 3. Create the notification message for the client's inbox
    const messageContent = formatChanges(originalAppointment, updatedAppointment);
    const clientUserId = originalAppointment.pet.owner.userId;

    await prisma.inbox.create({
      data: {
        userId: clientUserId,
        message: messageContent,
        status: 'EDITED',
        appointmentId: updatedAppointment.id,
      },
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { justification } = req.body;

    if (!justification) {
        return res.status(400).json({ message: 'Justification is required for cancellation.' });
    }

    try {
        // 1. Get the original appointment to find the client
        const originalAppointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) },
            include: { pet: { include: { owner: true } } },
        });

        if (!originalAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // 2. Update the appointment to be "CANCELED"
        const canceledAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: 'CANCELED',
                cancellationReason: justification,
            },
        });

        // 3. Create the notification message for the client's inbox
        const messageContent = `A sua consulta agendada para ${new Date(originalAppointment.date).toLocaleString('pt-BR')} foi cancelada. Motivo: ${justification}`;
        const clientUserId = originalAppointment.pet.owner.userId;

        await prisma.inbox.create({
            data: {
                userId: clientUserId,
                message: messageContent,
                status: 'DELETED',
                appointmentId: canceledAppointment.id,
            },
        });

        res.status(200).json(canceledAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error canceling appointment' });
    }
};

