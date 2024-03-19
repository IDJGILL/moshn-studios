'use client'

import Link from 'next/link'
import Logo from './logo'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({ ...props }: FooterProps) {
  const {} = props

  return (
    <footer className='bg-white text-black border-t'>
      <div className='px-4 md:px-20 py-10 md:py-20'>
        <div>
          <div className='pb-10'>
            <Logo colorVariant='black' type='both' />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div>
            <h3 className='text-xxl font-title pb-6 uppercase leading-[130%] tracking-tighter'>
              {`Let's`} just <br /> make it happen!
            </h3>
            <p className='text-lg font-medium pb-10 max-w-sm'>Feel free to reach out if you want to collaborate with us, or simply have a chat.</p>

            <div className='flex items-center gap-4 group max-w-max cursor-pointer pb-14'>
              <div className='font-semibold'>Become a client</div>

              <motion.div className='relative w-11 h-11 overflow-hidden aspect-square border rounded-full flex items-center justify-center cursor-pointer'>
                <motion.div
                  className={cn('w-full h-full aspect-square absolute inset-0 rounded-full scale-0 ease-in-out duration-500 group-hover:scale-100 bg-black')}
                ></motion.div>

                <ArrowRightIcon className='text-black group-hover:text-white stroke-1 z-10 ease-in-out duration-300' />
              </motion.div>
            </div>

            <div className='font-medium hidden md:block'>© Moshn Studios 2023. All rights reserved • Privacy Policy</div>
          </div>

          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 mb-8'>
              <div>
                <div className='text-lg font-semibold mb-3'>Our address</div>
                <ul>
                  <li className='font-medium max-w-[200px]'>Mennica Legacy Tower,Prosta Str. 20, 00-850 Warsaw, Poland</li>
                </ul>
              </div>

              <div className='grid grid-cols-1 gap-10 md:gap-0 md:grid-cols-2'>
                <div>
                  <div className='text-lg font-semibold mb-3'>Follow us</div>
                  <ul className='space-y-2'>
                    <li className='font-medium'>behance</li>
                    <li className='font-medium'>dribbble</li>
                    <li className='font-medium'>clutch</li>
                    <li className='font-medium'>instagram</li>
                    <li className='font-medium'>linkedin</li>
                  </ul>
                </div>

                <div>
                  <div className='text-lg font-semibold mb-3'>Follow us</div>
                  <ul className='space-y-2'>
                    <li className='font-medium'>behance</li>
                    <li className='font-medium'>dribbble</li>
                    <li className='font-medium'>clutch</li>
                    <li className='font-medium'>instagram</li>
                    <li className='font-medium'>linkedin</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='font-medium md:hidden'>© Moshn Studios 2023. All rights reserved • Privacy Policy</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
