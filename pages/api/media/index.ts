import axios from "axios"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://corecmms.com/api/v1/pictures')
    res.status(200).json(response.data)
  } catch(err) {
    res.status(200).json(err)
  }
}