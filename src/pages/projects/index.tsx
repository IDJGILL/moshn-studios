import Inner from '@/components/layout/inner'
import Title from '@/components/title'
import { Projects, getProjects } from '@/lib/queries'
import { cn } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { useState } from 'react'

interface Props {
  projects: Projects
}

export default function Projects({ projects }: Props) {
  console.log({ projects })
  return (
    <Inner>
      <div className='min-h-screen bg-black pt-40'>
        <div className='flex items-center justify-center'>
          <Title text='Projects' splitBy='characters' className='text-6xl' />
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 p-8'>
          {projects.map((item) => (
            <ProjectCard key={item.slug} project={item} className='!w-full h-auto max-w-none' />
          ))}
        </div>

        <div className='text-center py-20'>You are all caught up!</div>
      </div>
    </Inner>
  )
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLElement> {
  project: Projects[number]
}

export function ProjectCard({ ...props }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`/projects/${props.project.slug}`}
      className={cn(
        'relative overflow-hidden shrink-0 w-full aspect-[9/16] cursor-pointer card bg-black rounded-3xl md:hover:scale-[1.04] ease-in-out duration-300',
        props.className
      )}
    >
      {!isHovered ? (
        <Image
          src={props.project.projectFields.videoThumbnail?.node.mediaItemUrl ?? ''}
          alt=''
          fill
          className='aspect-[9/16] object-cover'
        />
      ) : (
        <video autoPlay muted playsInline loop>
          <source src={props.project.projectFields.videoPreview?.node.mediaItemUrl ?? ''} className='aspect-[9/16]' type='video/mp4' />
        </video>
      )}
    </Link>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await getProjects()

  return {
    props: { projects },
  }
}
