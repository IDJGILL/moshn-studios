import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { cn } from '@/lib/utils'
import { InView } from 'react-intersection-observer'

gsap.registerPlugin(ScrollTrigger)

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  text: string
  splitBy: 'words' | 'characters'
}

export default function Title({ ...props }: TitleProps) {
  return (
    <InView triggerOnce>
      {({ inView, ref }) => <div ref={ref}>{inView && <Text text={props.text} splitBy={props.splitBy} className={props.className} />}</div>}
    </InView>
  )
}

interface Text extends React.HTMLAttributes<HTMLElement> {
  text: string
  splitBy: 'words' | 'characters'
}

function Text({ ...props }: Text) {
  const titleRef = useRef(null)
  const { splitBy } = props

  useGSAP(
    () => {
      gsap.from('.text', {
        yPercent: 130,
        delay: 0.2,
        duration: 0.4,
        stagger: {
          each: 0.1,
          // amount: 0.1,
        },
      })
    },
    { scope: titleRef }
  )

  return (
    <h3
      ref={titleRef}
      className={cn(
        'flex flex-wrap text-start overflow-hidden py-2 font-title',
        {
          'gap-2': splitBy === 'words',
        },
        props.className
      )}
    >
      {props.text.split(splitBy === 'words' ? ' ' : '').map((text, index) => (
        <span key={index} className='text'>
          {text}
        </span>
      ))}
    </h3>
  )
}
