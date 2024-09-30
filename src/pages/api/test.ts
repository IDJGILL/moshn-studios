import { getProjectBySlug, getProjects } from '@/lib/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const project = await getProjectBySlug('/project/some-project')

  const projects = await getProjects()

  return res.status(200).json(projects)
}
