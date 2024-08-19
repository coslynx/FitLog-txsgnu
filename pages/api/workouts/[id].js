import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const workout = await prisma.workout.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          user: true,
        },
      });

      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }

      res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { workoutType, duration, intensity, caloriesBurned, description } =
      req.body;

    try {
      const updatedWorkout = await prisma.workout.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          workoutType,
          duration,
          intensity,
          caloriesBurned,
          description,
        },
      });

      res.status(200).json(updatedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedWorkout = await prisma.workout.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      res.status(200).json(deletedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}