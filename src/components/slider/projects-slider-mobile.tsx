import { motion } from 'framer-motion'
import { ProjectCard } from '../pages/home/projects-section'
import { cn } from '@nextui-org/react'
import { ArrowRightIcon } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../carousel'
import Link from 'next/link'
import { Projects } from '@/lib/queries'
import { InView } from 'react-intersection-observer'

interface ProjectsSliderMobileProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects
}

export default function ProjectsSliderMobile({ ...props }: ProjectsSliderMobileProps) {
  const { projects } = props

  return (
    <InView threshold={0.8}>
      {({ inView, ref }) => (
        <div ref={ref} className='px-4 py-20'>
          <Carousel>
            <motion.div
              className='fixed bottom-0 left-0 w-full glass z-10 flex items-center justify-center gap-4 p-4'
              initial={{ y: 100, opacity: 0 }} // Start off-screen and invisible
              animate={{
                y: inView ? 0 : 100, // Slide up when inView is true, down when false
                opacity: inView ? 1 : 0, // Fully visible when inView is true, invisible when false
              }}
              transition={{ duration: 0.5 }} // Duration of the animation
            >
              <CarouselPrevious className='w-full' />
              <CarouselNext className='w-full' />
            </motion.div>

            <CarouselContent>
              {projects.map((item) => (
                <CarouselItem key={item.title} className='sm:basis-1/2 md:basis-1/3'>
                  <ProjectCard project={item} className='max-w-full h-auto' />
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
      )}
    </InView>
  )
}
