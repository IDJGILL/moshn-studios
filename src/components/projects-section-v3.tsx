import { useEffect, useRef, useState } from 'react'
import project1 from '@/assets/images/project-1.png'
import project2 from '@/assets/images/project-2.png'
import project3 from '@/assets/images/project-3.png'
import project4 from '@/assets/images/project-4.png'
import { AnimatePresence, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
// import { useCursor } from './dynamic-cursor'

interface ProjectsSectionV3Props extends React.HTMLAttributes<HTMLElement> {}

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSectionV3({ ...props }: ProjectsSectionV3Props) {
  const {} = props
  // const customCursor = useCursor()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setHovered] = useState(10000)

  useEffect(() => animateCards(), [])

  const animateCards = () => {
    const scrollResizer = () => {
      const container = containerRef.current

      if (!container) return

      const cards = container.querySelectorAll('.card') as NodeListOf<HTMLElement>

      // Calculate total width of cards
      const totalWidth = Array.from(cards).reduce((acc, card) => {
        return acc + card.offsetWidth + parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight)
      }, 0)

      const containerWidth = container.offsetWidth

      return totalWidth - containerWidth
    }

    const section = document.querySelector('.scroll-section') as HTMLElement

    const cardsContainer = document.querySelector('.cards-container') as HTMLElement

    const scrollWidth = scrollResizer()

    if (cardsContainer && section) {
      gsap.to(cardsContainer, {
        x: -(scrollWidth ?? 0),
        ease: 'none',
        display: 'flex',
        alignItems: 'center',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '300% bottom',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: () => {
            scrollResizer()
          },
        },
      })
    }

    window.addEventListener('resize', scrollResizer)

    return () => {
      window.removeEventListener('resize', scrollResizer)
    }
  }

  const handleMouseEnter = (index: number) => {
    setHovered(index)
  }

  const handleMouseLeave = () => {
    // customCursor(null)
    setHovered(1000)
  }

  return (
    <>
      <section className='max-content bg-black pt-40 pb-10 text-white flex flex-col justify-center'>
        <div className='px-[2vw] flex items-center justify-between'>
          <div className='w-1/2'>
            <h2 className='text-xxl font-title mb-12'>
              {/* Our <br /> */}
              Our projects
            </h2>

            <div>
              <div className='flex items-center gap-4 text-2xl font-medium'>
                View all projects
                <motion.div className='relative w-11 h-11 overflow-hidden aspect-square border rounded-full flex items-center justify-center cursor-pointer group'>
                  <motion.div
                    className={cn('w-full h-full aspect-square absolute inset-0 rounded-full scale-0 ease-in-out duration-500 group-hover:scale-100 bg-white')}
                  ></motion.div>

                  <ArrowRightIcon className='text-white group-hover:text-black stroke-1 z-10 ease-in-out duration-300' />
                </motion.div>
              </div>
            </div>
          </div>

          <div className='w-1/2 flex items-center justify-end'>
            <div className='text-[2vw] font-medium leading-[120%]'>
              Lorem Ipsum is simply dummy <br /> text of the printing and industry.
              <br /> text of the printing.
            </div>
          </div>
        </div>
      </section>

      <section className='overflow-hidden'>
        <div className='w-full scroll-section py-20 bg-black'>
          <div ref={containerRef} className='flex max-w-max cards-container will-change-transform'>
            {projects.map((item, index) => (
              <Card key={item.name} item={item} index={index} isHovered={isHovered} Enter={() => handleMouseEnter(index)} Leave={() => handleMouseLeave()} />
            ))}

            <div className='p-6 flex flex-col items-center justify-center overflow-hidden shrink-0 h-[calc(100vh-160px)] aspect-[9/16] cursor-pointer card bg-black text-white'>
              <h3 className='text-large font-title mb-6 text-center'>Want more?</h3>
              <div className='flex items-center gap-4 font-medium'>
                View all projects{' '}
                <motion.div className='relative w-11 h-11 overflow-hidden aspect-square border rounded-full flex items-center justify-center cursor-pointer group'>
                  <motion.div
                    className={cn('w-full h-full aspect-square absolute inset-0 rounded-full scale-0 ease-in-out duration-500 group-hover:scale-100 bg-white')}
                  ></motion.div>

                  <ArrowRightIcon className='text-white group-hover:text-black stroke-1 z-10 ease-in-out duration-300' />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  item: {
    name: string
    image: StaticImageData
    dsc: string
  }
  index: number
  isHovered: number
  Enter: () => void
  Leave: () => void
}

export function Card({ ...props }: CardProps) {
  const isHovered = props.isHovered === props.index
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    console.log('Video loaded')
  }

  const cardAnimation = {
    default: {
      scale: 1,
      zIndex: 0,
    },
    scaled: {
      scale: 1.1,
      zIndex: 50,
      borderRadius: 20,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className='overflow-hidden shrink-0 h-[calc(100vh-160px)] aspect-[9/16] cursor-pointer card bg-black'
      onMouseOver={props.Enter}
      onMouseOut={() => {
        props.Leave()
        setVideoLoaded(false)
      }}
      variants={cardAnimation}
      initial='default'
      animate={isHovered ? 'scaled' : 'default'}
    >
      <motion.span
        animate={{
          display: isHovered ? 'none' : 'block',
        }}
      >
        <Image src={props.item.image} alt='' className='aspect-[9/16]' priority />
      </motion.span>

      <AnimatePresence>
        {isHovered && (
          <motion.video autoPlay muted loop onLoadedData={handleVideoLoad}>
            <source src='/assets/project-video.mp4' type='video/mp4' />
          </motion.video>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

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
