import { CornerRightDown } from 'lucide-react'
import Title from './title'
import TextTypeAnimation from './text-type-animation'

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {}

export default function HeroSection({ ...props }: HeroSectionProps) {
  const {} = props

  return (
    <div className='h-screen relative'>
      <div className='flex md:items-center items-end justify-center p-8 h-screen w-full'>
        <div className='flex flex-col items-start md:items-center z-20 w-full mb-16'>
          <Title
            className='text-2xl uppercase tracking-tight md:text-[6vw] md:gap-6 leading-[90%] font-medium text-white mb-6 md:mb-12 py-2'
            text='Digital Design Studio'
            animateCursor
          />

          <TextTypeAnimation
            texts={['We are a 3D creative digital design studio, specializing in product visualization and commercials.']}
            className='font-space_mono'
          />
        </div>

        <div className='text-white flex gap-2 absolute bottom-8 right-8 text-sm z-10'>
          <span>Scroll down</span> <CornerRightDown className='stroke-1' />
        </div>
      </div>

      <div className='h-screen absolute top-0 left-0 w-full bg-black z-10 bg-opacity-20'></div>

      <video src='bg-video2.mp4' autoPlay loop muted playsInline className='w-full h-full absolute top-0 object-cover'></video>
    </div>
  )
}
