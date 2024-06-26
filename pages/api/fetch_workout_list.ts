import { db } from '@/lib/db';
import { workout } from '@/lib/schema/Workout';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await db.select().from(workout);
  res.status(200).json(data);
}
