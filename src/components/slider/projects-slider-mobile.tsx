import { motion } from 'framer-motion'
import { ProjectCard, projects } from '../pages/home/projects-section'
import { cn } from '@nextui-org/react'
import { ArrowRightIcon } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '../carousel'
import Link from 'next/link'

export default function ProjectsSliderMobile({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props

  return (
    <div className='px-4 py-20'>
      <Carousel>
        <CarouselContent className=''>
          {projects.map((item, index) => (
            <CarouselItem key={item.name} className='sm:basis-1/2 md:basis-1/3'>
              <ProjectCard item={item} index={index} className='w-full h-auto aspect-[9/16]' />
            </CarouselItem>
          ))}

          <div className='p-6 flex flex-col items-center justify-center overflow-hidden shrink-0 h-[calc(100vh-160px)] aspect-[9/16] cursor-pointer card bg-black text-white'>
            <h3 className='text-large font-title mb-6 text-center'>Want more?</h3>
            <div className='flex items-center gap-4 font-medium'>
              View all projects{' '}
              <Link
                href='/projects'
                className='relative w-11 h-11 overflow-hidden aspect-square border rounded-full flex items-center justify-center cursor-pointer group'
              >
                <motion.div
                  className={cn(
                    'w-full h-full aspect-square absolute inset-0 rounded-full scale-0 ease-in-out duration-500 group-hover:scale-100 bg-white'
                  )}
                ></motion.div>

                <ArrowRightIcon className='text-white group-hover:text-black stroke-1 z-10 ease-in-out duration-300' />
              </Link>
            </div>
          </div>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
