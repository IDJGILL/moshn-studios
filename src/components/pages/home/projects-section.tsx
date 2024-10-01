import { Projects } from '@/lib/queries'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const ProjectsSliderDesktop = dynamic(() => import('@/components/slider/projects-slider-desktop'), { ssr: false })

interface ProjectsSectionProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects
}

export default function ProjectsSection({ ...props }: ProjectsSectionProps) {
  return (
    <section>
      <ProjectsSliderDesktop projects={props.projects} />
    </section>
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
        'relative overflow-hidden shrink-0 h-[calc(100vh-160px)] w-full md:max-w-max aspect-[9/16] cursor-pointer card bg-black rounded-3xl md:hover:scale-[1.08] ease-in-out duration-300',
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
