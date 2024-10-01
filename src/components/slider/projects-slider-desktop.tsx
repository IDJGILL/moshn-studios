import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ElementRef, useRef } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProjectCard } from '../pages/home/projects-section'
import Link from 'next/link'
import { Projects } from '@/lib/queries'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsSliderDesktopProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects
}

export default function ProjectsSliderDesktop({ ...props }: ProjectsSliderDesktopProps) {
  const containerRef = useRef<ElementRef<'div'>>(null)

  useGSAP(
    () => {
      const scrollResizer = () => {
        const container = containerRef.current

        if (!container) return

        const cards = container.querySelectorAll('.card') as NodeListOf<HTMLElement>

        const totalWidth = Array.from(cards).reduce((acc, card) => {
          return acc + card.offsetWidth + parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight)
        }, 0)

        const containerWidth = container.offsetWidth

        return totalWidth - containerWidth
      }

      gsap.to('.cards-wrapper', {
        x: -(scrollResizer() ?? 0),
        ease: 'none',
        display: 'flex',
        alignItems: 'center',
        scrollTrigger: {
          trigger: '.cards-slider-container',
          start: 'top top',
          end: '300% bottom',
          scrub: 0.5,
          pin: true,
          onUpdate: () => {
            scrollResizer()
          },
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className='overflow-hidden'>
      <div className='cards-slider-container relative py-20'>
        <div className='cards-wrapper flex max-w-max cards-container will-change-transform md:pl-8 px-4 md:px-0'>
          {props.projects.map((item, index) => (
            <ProjectCard key={item.slug} project={item} className='mr-4 md:mr-8' />
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
        </div>
      </div>
    </div>
  )
}
