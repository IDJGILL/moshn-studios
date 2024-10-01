import { Button } from '@nextui-org/react'
import { CornerRightDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroVideo = dynamic(() => import('./hero-video'), { ssr: false })

export function HeroSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='h-[105vh] relative overflow-hidden text-white '>
      <div className='flex md:items-center items-center justify-center p-8 h-screen w-full'>
        <div className='flex flex-col items-center z-20 w-full'>
          <h2 className='text-xl sm:text-2xl text-balance tracking-tight font-light text-center mt-8 !leading-[120%] max-w-2xl'>
            We are a contemporary design studio specializing in digital image making.Offering sophisticated art direction and execution at
            scale. We specialize in elevating brands, launching products, and fostering collaborative relationships with forward-thinking
            clients.
          </h2>

          <Button as={Link} href='/contact' className='glass mt-10 text-white text-base px-8'>
            Let&apos;s Connect
          </Button>
        </div>

        <div className='flex gap-2 absolute bottom-20 right-8 text-sm z-50'>
          <span>Scroll down</span> <CornerRightDown className='stroke-1' />
        </div>
      </div>

      <div className='h-full absolute top-0 left-0 w-full bg-black/40 z-10'></div>

      {/* Gradient fade at the bottom */}
      <div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-black z-20'></div>

      <HeroVideo />
    </section>
  )
}
