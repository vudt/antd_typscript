import axios from "axios"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == 'POST') {
    try {
      const id: number = req.body
      const response = await axios.post(`https://corecmms.com/api/v1/pictures${id}`)
      res.status(200).json(response.data)
    } catch(err) {
      res.status(200).json(err)
    }
  } else {
    res.status(200).json('ss')
  }
}