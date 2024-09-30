import { Projects } from '@/lib/queries'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

// export const projects = [
//   {
//     name: 'Upwork',
//     image: project1,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Monzo',
//     image: project2,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Pendo',
//     image: project3,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Canva',
//     image: project4,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Pendo',
//     image: project3,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Monzo',
//     image: project2,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Upwork',
//     image: project1,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
//   {
//     name: 'Monzo',
//     image: project2,
//     dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   },
// ]

const ProjectsSliderDesktop = dynamic(() => import('@/components/slider/projects-slider-desktop'), { ssr: false })

const ProjectsSliderMobile = dynamic(() => import('@/components/slider/projects-slider-mobile'), { ssr: false })

interface ProjectsSectionProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects
}

export default function ProjectsSection({ ...props }: ProjectsSectionProps) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })

  return (
    <section>
      {isDesktopOrLaptop ? <ProjectsSliderDesktop projects={props.projects} /> : <ProjectsSliderMobile projects={props.projects} />}
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
        'overflow-hidden shrink-0 h-[calc(100vh-160px)] aspect-[9/16] cursor-pointer card bg-black rounded-3xl hover:scale-[1.08] ease-in-out duration-300',
        props.className
      )}
    >
      {!isHovered ? (
        <Image
          src={props.project.projectFields.videoThumbnail?.node.mediaItemUrl ?? ''}
          width={600}
          height={800}
          alt=''
          className='aspect-[9/16]'
          priority
        />
      ) : (
        <video autoPlay muted playsInline loop>
          <source src={props.project.projectFields.videoPreview?.node.mediaItemUrl ?? ''} className='aspect-[9/16]' type='video/mp4' />
        </video>
      )}
    </Link>
  )
}
