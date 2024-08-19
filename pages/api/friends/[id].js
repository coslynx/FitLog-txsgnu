import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const friend = await prisma.user.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          friends: true,
          socialUpdates: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
      }

      res.status(200).json(friend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { userId } = req.body;
    const currentUserId = req.session.user?.id;

    try {
      if (!currentUserId) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: You must be logged in' });
      }

      const friendRequest = await prisma.friendRequest.create({
        data: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      res.status(200).json(friendRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { userId } = req.body;
    const currentUserId = req.session.user?.id;

    try {
      if (!currentUserId) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: You must be logged in' });
      }

      const friend = await prisma.user.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          friends: {
            connect: {
              id: currentUserId,
            },
          },
        },
      });

      res.status(200).json(friend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const currentUserId = req.session.user?.id;

    try {
      if (!currentUserId) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: You must be logged in' });
      }

      const friend = await prisma.user.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          friends: {
            disconnect: {
              id: currentUserId,
            },
          },
        },
      });

      res.status(200).json(friend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}