import { client } from '../../lib/sanityClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = `
    *[_type=="users" && _id == "${req.body.currentAccount}"] {
        "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)
      }
  `;
      
  const clientRes = await client.fetch(query);
  res.status(200).json(clientRes[0]?.transactionList);
}
