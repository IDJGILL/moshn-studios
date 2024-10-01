import { useMediaQuery } from 'react-responsive'

export default function HeroVideo({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })

  return isDesktopOrLaptop ? (
    <video src='/videos/hero-16-9.mp4' autoPlay loop muted playsInline className='w-full h-full absolute top-0 object-cover'></video>
  ) : (
    <video src='/videos/hero-9-16.mp4' autoPlay loop muted playsInline className='w-full h-full absolute top-0 object-cover'></video>
  )
}
