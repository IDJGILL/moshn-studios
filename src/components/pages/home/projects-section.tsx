import project1 from '@/assets/images/project-1.png'
import project2 from '@/assets/images/project-2.png'
import project3 from '@/assets/images/project-3.png'
import project4 from '@/assets/images/project-4.png'
import Title from '@/components/title'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const projects = [
  {
    name: 'Upwork',
    image: project1,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Monzo',
    image: project2,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Pendo',
    image: project3,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Canva',
    image: project4,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Pendo',
    image: project3,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Monzo',
    image: project2,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Upwork',
    image: project1,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Monzo',
    image: project2,
    dsc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]

const ProjectsSliderDesktop = dynamic(() => import('@/components/slider/projects-slider-desktop'), { ssr: false })

const ProjectsSliderMobile = dynamic(() => import('@/components/slider/projects-slider-mobile'), { ssr: false })

interface ProjectsSectionProps extends React.HTMLAttributes<HTMLElement> {}

export default function ProjectsSection({ ...props }: ProjectsSectionProps) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })

  return (
    <section>
      <div className='flex items-center justify-center w-full h-[74px] pt-20'>
        <Title text='Our Projects' splitBy='words' className='text-2xl uppercase' />
      </div>

      {isDesktopOrLaptop ? <ProjectsSliderDesktop /> : <ProjectsSliderMobile />}
    </section>
  )
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLElement> {
  item: {
    name: string
    image: StaticImageData
    dsc: string
  }
  index: number
}

export function ProjectCard({ ...props }: ProjectCardProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  const cardAnimation = {
    default: {
      scale: 1,
      zIndex: 0,
    },
    scaled: {
      scale: 1.08,
      zIndex: 50,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className={cn(
        'overflow-hidden shrink-0 h-[calc(100vh-160px)] aspect-[9/16] cursor-pointer card bg-black rounded-3xl',
        props.className
      )}
      variants={cardAnimation}
      initial='default'
    >
      <motion.span>
        <Image src={props.item.image} alt='' className='aspect-[9/16]' priority />
      </motion.span>

      <AnimatePresence>
        {/* 
           <motion.video autoPlay muted loop onLoadedData={handleVideoLoad}>
             <source src='/assets/project-video.mp4' type='video/mp4' />
           </motion.video> */}
      </AnimatePresence>
    </motion.div>
  )
}
