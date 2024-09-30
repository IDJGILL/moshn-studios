import { env } from 'process'
import extractImageUrls from './parser'

export type Project = {
  title: string
  slug: string
  projectFields: {
    projectOverview: string
    projectDetails: string
    projectConclusion: string
    imageGrid: string[]
    projectThumbnail: {
      node: {
        mediaItemUrl: string
      }
    }
    video: {
      node: {
        mediaItemUrl: string
      }
    }
    videoPreview: {
      node: {
        mediaItemUrl: string
      }
    }
  }
}

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const query = `query GetProject {
  project(id: "${slug}", idType: SLUG) {
    title
    slug
    projectFields {
      projectOverview
      projectDetails
      projectConclusion
      imageGrid
      projectThumbnail {
        node {
          mediaItemUrl
        }
      }
      video {
        node {
          mediaItemUrl
        }
      }
      videoPreview {
        node {
          mediaItemUrl
        }
      }
    }
  }
}`

  const response = await fetch(`${env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) throw new Error('Something went wrong, please try again later.')

  const data = (await response.json()) as { data: { project: Project } }

  const imageGrid = extractImageUrls(data.data.project.projectFields.imageGrid as unknown as string)

  return {
    ...data.data.project,
    projectFields: {
      ...data.data.project.projectFields,
      imageGrid,
    },
  }
}

export type Projects = {
  title: string
  slug: string
  projectFields: {
    video: {
      node: {
        mediaItemUrl: string
      }
    }
    videoPreview: {
      node: {
        mediaItemUrl: string
      }
    }
  }
}[]

export const getProjects = async (): Promise<Projects> => {
  const query = `query GetProjects {
  projects(first: 10) {
    nodes {
      title
      slug
      projectFields {
        video {
          node {
            mediaItemUrl
          }
        }
        videoPreview {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`

  const response = await fetch(`${env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) throw new Error('Something went wrong, please try again later.')

  const data = (await response.json()) as { data: { projects: { nodes: Project[] } } }

  return data.data.projects.nodes
}
