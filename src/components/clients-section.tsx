'use client'

import upwork from '@/assets/images/upwork.svg'
import monzo from '@/assets/images/monzo.svg'
import pendo from '@/assets/images/pendo.svg'
import canva from '@/assets/images/canva.svg'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import TextTypeAnimation from './text-type-animation'

interface ClientsSectionProps extends React.HTMLAttributes<HTMLElement> {}

export default function ClientsSection({ ...props }: ClientsSectionProps) {
  const {} = props

  useGSAP(() => {
    const logos = document.querySelectorAll('.logo-wrapper')

    gsap.set(logos, { autoAlpha: 1 })

    logos.forEach((logo, i) => {
      gsap.set(logo, { xPercent: 100 * i })
    })

    if (logos.length > 5) {
      const logosWrap = gsap.utils.wrap(-100, (logos.length - 1) * 100)

      const duration = logos.length * 5

      gsap.to(logos, {
        xPercent: `-=${logos.length * 100}`,
        duration,
        repeat: -1,
        ease: 'none',
        modifiers: {
          xPercent: (xPercent) => logosWrap(parseFloat(xPercent)),
        },
      })
    }
  })

  return (
    <section className='bg-black'>
      <div className='max-content'>
        <TextTypeAnimation texts={['{ Clients we worked with }']} className='font-space_mono pt-10 text-sm' />

        <div className='w-full relative'>
          <div className='bg-gradient-to-r from-transparent to-black h-full w-[10%] absolute top-0 right-0 z-[100000000]'></div>

          <div className='w-full relative overflow-hidden h-[200px]'>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={upwork} alt='' />
            </div>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={monzo} alt='' />
            </div>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={pendo} alt='' />
            </div>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={canva} alt='' />
            </div>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={upwork} alt='' />
            </div>
            <div className='w-[20%] px-4 absolute top-1/2 -translate-y-1/2 logo-wrapper'>
              <Image src={monzo} alt='' />
            </div>
          </div>

          <div className='bg-gradient-to-l from-transparent to-black h-full w-[10%] absolute top-0 left-0 z-[100000000]'></div>
        </div>
      </div>
    </section>
  )
}
