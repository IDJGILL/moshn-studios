import extractImageUrls from './parser'

export type Project = {
  slug: string
  projectFields: {
    projectTitle: string
    projectOverview: string
    projectDetails: string
    projectConclusion: string
    imageGrid: string[]
    projectThumbnail: {
      node: {
        mediaItemUrl: string
      }
    } | null
    video: {
      node: {
        mediaItemUrl: string
      }
    } | null
    videoThumbnail: {
      node: {
        mediaItemUrl: string
      }
    } | null
    videoPreview: {
      node: {
        mediaItemUrl: string
      }
    } | null
  }
}

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const query = `query GetProject {
  project(id: "${slug}", idType: SLUG) {
    slug
    projectFields {
      projectTitle
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
      videoThumbnail {
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

  const response = await fetch(`https://admin.moshnstudios.com/graphql`, {
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
  slug: string
  projectFields: {
    video: {
      node: {
        mediaItemUrl: string
      }
    } | null
    videoThumbnail: {
      node: {
        mediaItemUrl: string
      }
    } | null
    videoPreview: {
      node: {
        mediaItemUrl: string
      }
    } | null
  }
}[]

export const getProjects = async (): Promise<Projects> => {
  const query = `query GetProjects {
  projects(first: 10) {
    nodes {
      slug
      projectFields {
        video {
          node {
            mediaItemUrl
          }
        }
        videoThumbnail {
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

  const response = await fetch(`https://admin.moshnstudios.com/graphql`, {
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
