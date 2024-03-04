import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ElementRef, useRef } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TestGsapProps extends React.HTMLAttributes<HTMLElement> {}

export default function TestGsap({ ...props }: TestGsapProps) {
  const {} = props

  const container = useRef<ElementRef<'div'>>(null)

  // useEffect(() => animation(), [])

  // const animation = () => {
  //   gsap.to('#box', {
  //     x: 1000,
  //     display: 'flex',
  //     alignItems: 'center',
  //     scrollTrigger: {
  //       trigger: '#box-container',
  //       start: 'top top',
  //       end: '300% bottom',
  //       scrub: 0.5,
  //       pin: true,
  //       anticipatePin: 1,
  //       markers: true,
  //     },
  //   })
  // }

  useGSAP(
    () => {
      gsap.to('.box', {
        x: 2000,
        scrollTrigger: {
          trigger: '.box-container',
          start: 'top top',
          end: '300% bottom',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          markers: true,
        },
      })
    },
    { scope: container }
  )

  return (
    <div ref={container}>
      <div className='box-container'>
        <div className='box w-[200px] h-[200px] bg-red-500'>k</div>
        <div className='h-[800px]'>s</div>
      </div>
    </div>
  )
}
