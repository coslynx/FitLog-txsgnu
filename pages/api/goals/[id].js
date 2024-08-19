import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const goal = await prisma.goal.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          user: true,
        },
      });

      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      res.status(200).json(goal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { type, target, timeline, description } = req.body;

    try {
      const updatedGoal = await prisma.goal.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          type,
          target,
          timeline: new Date(timeline),
          description,
        },
      });

      res.status(200).json(updatedGoal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedGoal = await prisma.goal.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      res.status(200).json(deletedGoal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}