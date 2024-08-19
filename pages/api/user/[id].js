import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          goals: true,
          workouts: true,
          meals: true,
          friends: true,
          socialUpdates: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { name, image } = req.body;
    const currentUserId = req.session.user?.id;

    try {
      if (!currentUserId) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: You must be logged in' });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          name,
          image,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}