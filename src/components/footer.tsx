import Image from 'next/image'
import Link from 'next/link'
import GrayLogoText from '@/assets/brand/logo-text-gray.png'
import { Socials } from './header'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({ ...props }: FooterProps) {
  const {} = props

  return (
    <footer className='bg-black border-t border-white/10 py-4 z-50'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-7xl mx-auto px-6 justify-between'>
        <div className='flex items-center justify-center'>
          <Link href='/'>
            <div className='w-[30.38vw] md:w-[clamp(45px,10.57vw,160px)] flex gap-4 items-center'>
              <Image src={GrayLogoText} alt='' className='w-full h-full' />
            </div>
          </Link>
        </div>

        <div className='flex items-center justify-center h-10 mb-2 md:mb-0'>
          <Socials />
        </div>

        <div className='text-center md:text-end'>©2024 Moshn Studios All rights reserved.</div>
      </div>
    </footer>
  )
}
