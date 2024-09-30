import Inner from '@/components/layout/inner'
import Title from '@/components/title'
import { Projects, getProjects } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'

interface Props {
  projects: Projects
}

export default function Projects({ projects }: Props) {
  return (
    <Inner>
      <div className='min-h-screen bg-black pt-40'>
        <div className='flex items-center justify-center'>
          <Title text='Projects' splitBy='characters' className='text-6xl' />
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 p-8'>
          {projects.map((item) => (
            <div key={item.slug} className='flex flex-col items-center justify-center gap-4 w-full max-w-max rounded-3xl overflow-hidden'>
              <Link href={`/projects/${item.slug}`}>
                <Image src={item.projectFields.videoPreview.node.mediaItemUrl} alt='' width={800} height={1200} className='aspect-[9/16]' />
              </Link>
            </div>
          ))}
        </div>

        <div className='text-center py-20'>You are all caught up!</div>
      </div>
    </Inner>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await getProjects()

  return {
    props: { projects },
  }
}
