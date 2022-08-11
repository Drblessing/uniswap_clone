import { client } from '../../lib/sanityClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.createIfNotExists(req.body.userDoc);

  res.status(200).json({ name: 'hey' });
}
