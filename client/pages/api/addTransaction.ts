import { client } from '../../lib/sanityClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await client.createIfNotExists(req.body);

  await client
    .patch(req.body.fromAddress)
    .setIfMissing({ transactions: [] })
    .insert('after', 'transactions[-1]', [
      {
        _key: req.body.txHash,
        _ref: req.body.txHash,
        _type: 'reference',
      },
    ])
    .commit();

  res.status(200).json({ name: 'hey' });
}
