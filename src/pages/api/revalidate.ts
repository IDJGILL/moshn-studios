import type { NextApiRequest, NextApiResponse } from 'next'

interface Action {
  id: number
  slug: string
  status: 'trash'
  update: true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body

  try {
    console.log('data', data)
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Something went wrong, please try again later.' })
  }
}
