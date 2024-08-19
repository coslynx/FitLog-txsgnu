import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const meal = await prisma.meal.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          user: true,
        },
      });

      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' });
      }

      res.status(200).json(meal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { foodName, foodCalories, description } = req.body;

    try {
      const updatedMeal = await prisma.meal.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          foodName,
          foodCalories,
          description,
        },
      });

      res.status(200).json(updatedMeal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedMeal = await prisma.meal.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      res.status(200).json(deletedMeal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}