import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ease } from './layout/inner'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { cn } from '@/lib/utils'
import { useCursor } from './cursor'

gsap.registerPlugin(ScrollTrigger)

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  text: string
  splitBy?: string
  animateCursor?: boolean
}

export default function Title({ ...props }: TitleProps) {
  const {} = props

  const { setCursor } = useCursor()

  const titleRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.text', {
        yPercent: 130,
        delay: 0.4,
        duration: 0.6,
        stagger: {
          each: 0.12,
          // amount: 0.1,
        },
      })
    },
    { scope: titleRef }
  )

  return (
    <span
      ref={titleRef}
      onMouseOver={() => props.animateCursor && setCursor({ isHovered: true })}
      onMouseOut={() => props.animateCursor && setCursor({ isHovered: false })}
      className={cn('flex flex-wrap text-start gap-2 overflow-hidden', props.className)}
    >
      {props.text.split(props.splitBy ?? ' ').map((text, index) => (
        <span key={index} className='text'>
          {text}
        </span>
      ))}
    </span>
  )
}
