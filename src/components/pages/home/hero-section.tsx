import { Button } from '@nextui-org/react'
import { CornerRightDown } from 'lucide-react'
import Link from 'next/link'

export function HeroSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='h-[105vh] relative overflow-hidden text-white rounded-b-[40px]'>
      <div className='flex md:items-center items-center justify-center p-8 h-screen w-full'>
        <div className='flex flex-col items-center z-20 w-full'>
          <div>Welcome</div>

          <h2 className='text-xl sm:text-4xl 2xl:text-7xl text-balance tracking-tight font-light max-w-7xl text-center mt-8 capitalize !leading-[120%]'>
            We specialize in elevating brands, launching products, and creating spectacles through 3D animations and <br />
            experimental digital design.
          </h2>

          <Button as={Link} href='/projects' className='glass mt-20 text-white text-base px-8'>
            Explore More
          </Button>
        </div>

        <div className='flex gap-2 absolute bottom-8 right-8 text-sm z-10'>
          <span>Scroll down</span> <CornerRightDown className='stroke-1' />
        </div>
      </div>

      <div className='h-full absolute top-0 left-0 w-full bg-black/40 z-10'></div>

      <video src='/videos/hero-16-9.mp4' autoPlay loop muted playsInline className='w-full h-full absolute top-0 object-cover'></video>
    </section>
  )
}
