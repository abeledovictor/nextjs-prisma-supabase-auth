import { getSession } from 'next-auth/react';
import { prisma } from '@/utils/prismaOrm';

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

    if (req.method === 'POST') {
      const { count } = req.body;
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      let counter = await prisma.counter.update({
        where: { userId: user.id },
        data: {count},
      });   


      res.status(200).json(counter);
    } else if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      let counter = {count: 0}
      if(user?.id) {
        counter = await prisma.counter.findUnique({
          where: { userId: user.id },
        });
      }


      res.status(200).json(counter);
    } else {
        res
        .status(405)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } 