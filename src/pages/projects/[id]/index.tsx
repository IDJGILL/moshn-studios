import Inner from '@/components/layout/inner'
import Image from 'next/image'
import Title from '@/components/title'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Project, getProjectBySlug, getProjects } from '@/lib/queries'
import parse from 'html-react-parser'
import Footer from '@/components/footer'

type Props = {
  project: Project
}

export default function ProjectPage({ project }: Props) {
  return (
    <Inner>
      <div className='h-full w-full bg-black'>
        <div className='w-full z-10 bg-black fixed top-0 left-0'>
          <div className='relative h-[calc(100vh-200px)] w-full overflow-hidden flex items-center justify-center px-6 text-center'>
            <Title text={project.title} splitBy='words' className='text-6xl text-center text-balance z-50 text-white' />
            <Image src={project.projectFields.projectThumbnail.node.mediaItemUrl} alt='' fill className='object-cover z-[-1]' />
          </div>
        </div>

        <div className='z-50 bg-black w-full absolute top-[calc(100vh-300px)] left-0 rounded-t-[30px] lg:rounded-t-[60px]'>
          <div className='w-full md:max-w-7xl mx-auto py-10 lg:py-20 min-h-screen px-6 prose prose-invert prose-headings:text-white prose-headings:font-title !text-white'>
            <div>{parse(project.projectFields.projectOverview)}</div>

            <div className='flex flex-col items-center justify-center py-10'>
              <video autoPlay loop muted playsInline className='aspect-[9/16] max-w-[400px]' controls>
                <source src={project.projectFields.video.node.mediaItemUrl} type='video/mp4' />
              </video>
            </div>

            <div className='pb-10'>{parse(project.projectFields.projectDetails)}</div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
              {project.projectFields.imageGrid.map((image, index) => (
                <div key={index} className='relative w-full h-[500px]'>
                  <Image src={image} alt='' fill className='object-cover object-center rounded-3xl overflow-hidden' />
                </div>
              ))}
            </div>

            <div className='pt-40'>{parse(project.projectFields.projectConclusion)}</div>
          </div>
          <Footer />
        </div>
      </div>
    </Inner>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects()

  const paths = projects.map((project) => ({
    params: { id: project.slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.id

  if (!slug || typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  const project = await getProjectBySlug(slug)

  return {
    props: { project },
    revalidate: 60,
  }
}
