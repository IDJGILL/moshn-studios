import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@nextui-org/react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Title from '@/components/title'

interface Options extends React.HTMLAttributes<HTMLElement> {
  items: {
    name: string
    image: StaticImport
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}

export default function ClientsSection({ ...props }: Options) {
  const { items, direction = 'left', speed = 'fast', pauseOnHover = true, className } = props
  const [start, setStart] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse')
      }
    }
  }, [direction])

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }, [speed])

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }, [getDirection, getSpeed])

  useEffect(() => addAnimation(), [addAnimation])

  return (
    <section className='mx-auto py-20 border-b border-white/10'>
      <div
        ref={containerRef}
        className={cn(
          'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap bg-black',
            start && 'animate-scroll ',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
        >
          {items.map((item) => (
            <li
              key={item.name}
              className='w-[240px] max-w-full relative flex-shrink-0 px-8 py-6'
              style={{
                background: 'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
              }}
            >
              <Image src={item.image} alt={item.name} className='filter invert' />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
