'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScrollLock from '@/hooks/useScrollLock'
import { ArrowUpRight, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import blackLogoText from '@/assets/brand/logo-text-black.png'
import GrayLogoText from '@/assets/brand/logo-text-gray.png'
import blackLogoIcon from '@/assets/brand/logo-icon-black.png'
import grayLogoIcon from '@/assets/brand/logo-icon-gray.png'
import { DateTime } from 'luxon'
import { usePathname } from 'next/navigation'
import { useUpdateEffect } from 'react-use'
import { ease } from './layout/inner'
import Title from './title'
import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export default function Header({ ...props }: HeaderProps) {
  const [visible, setVisibleMenu] = useState(false)
  const { setScroll } = useScrollLock()
  const scrollDirection = useScrollDirection()

  const menuElementsAnimation = {
    navigationHeader: {
      default: {
        y: 0,
        x: 0,
      },
      active: {
        y: 'var(--nav-menu-y, 1vw)',
        x: 'var(--nav-menu-x, -1.4vw)',
      },
    },
    dropdown: {
      default: {
        scale: 0,
      },
      active: {
        scale: 1,
        transformOrigin: 'top right',
      },
    },
    header: {
      default: {
        y: 0,
      },
      active: {
        y: -100,
      },
    },
  }

  const path = usePathname()

  useUpdateEffect(() => {
    if (visible) {
      setScroll()
      setVisibleMenu(false)
    }
  }, [scrollDirection, path])

  function handleMenuTrigger() {
    setVisibleMenu((prev) => !prev)

    if (visible) {
      setScroll()
    } else {
      setScroll(undefined, { zIndex: 999 })
    }
  }

  const now = DateTime.now().setZone('Europe/Berlin')

  const formattedTime = now.toFormat('hh:mm ')
  const amPm = now.toFormat('a')

  return (
    <motion.header
      variants={menuElementsAnimation.header}
      initial='default'
      animate={scrollDirection === 'up' ? 'default' : 'active'}
      transition={{
        type: 'tween',
        duration: 0.3,
      }}
      className='sticky top-0 -mb-[15.38vw] md:-mb-[clamp(45px,3.57vw,200px)] inset-x-0 h-[15.38vw] md:h-[clamp(45px,3.57vw,200px)] z-[1000] flex items-center [--nav-menu-y:4vw] md:[--nav-menu-y:1vw]'
    >
      <div className='relative w-full h-full'>
        <div className='absolute flex items-center left-0 top-0 w-full h-full'>
          <div className='moshn-container'>
            <div className='flex items-center justify-between w-full'>
              <Link href='/'>
                <div className='w-[30.38vw] md:w-[clamp(45px,10.57vw,160px)] flex gap-4 items-center'>
                  <Image src={grayLogoIcon} alt='' className='max-w-[50px]' /> <Image src={GrayLogoText} alt='' className='w-full h-full' />
                </div>
              </Link>

              <div className='z-[99999999999999]'>
                <motion.div
                  variants={menuElementsAnimation.navigationHeader}
                  initial='default'
                  animate={visible ? 'active' : 'default'}
                  transition={{
                    duration: 0.5,
                    ease: ease,
                  }}
                  className='flex items-center justify-end md:justify-between w-[clamp(25vw,100vw,30.8vw)] will-change-transform'
                >
                  <div className='hidden md:block text-[0.7vw] uppercase text-slate-400 font-medium font-title'>
                    Milan, Italy <span className='font-semibold '>{formattedTime}</span>
                    {amPm}
                  </div>

                  <motion.button
                    className='flex items-center'
                    onClick={() => handleMenuTrigger()}
                    transition={{
                      duration: 0.5,
                      ease: ease,
                    }}
                  >
                    <div
                      className={cn(
                        'relative !text-xs overflow-hidden md:block text-small-uppercase font-title leading-none mt-1 bg-white px-4 py-2 rounded-full text-black',
                        {
                          'text-white bg-black': visible,
                        }
                      )}
                    >
                      <motion.div
                        animate={{
                          y: visible ? 200 : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: ease,
                        }}
                      >
                        Menu
                      </motion.div>

                      <motion.div
                        initial={{ top: -200 }}
                        animate={{
                          top: visible ? 1 : -200,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: ease,
                        }}
                        className='absolute left-1/2 -translate-x-1/2 translate-y-1/2'
                      >
                        Close
                      </motion.div>
                    </div>

                    {/* <div className='ml-[2.05vw] md:ml-[0.71vw] inline-block'>
                      <div className='relative w-[clamp(10px,10.26vw,55px)] h-[clamp(10px,10.26vw,55px)] md:w-[2.38vw] md:h-[2.38vw] overflow-hidden aspect-square border rounded-full flex items-center justify-center cursor-pointer group'>
                        {!visible && (
                          <>
                            <Image src={grayLogoIcon} alt='' className='w-8 h-8 z-10 hidden group-hover:block' />

                            <Image src={blackLogoIcon} alt='' className='w-8 h-8 z-10 group-hover:hidden' />
                          </>
                        )}

                        {visible && <X className='text-black group-hover:text-white stroke-1 z-10 ease-in-out duration-300' />}

                        <motion.span className='w-full h-full aspect-square absolute top-0 inset-0 rounded-full scale-0 ease-in-out duration-500 group-hover:scale-100 bg-black' />
                      </div>
                    </div> */}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            variants={menuElementsAnimation.dropdown}
            initial='default'
            animate={visible ? 'active' : 'default'}
            transition={{
              duration: 0.5,
              ease: ease,
            }}
            exit={{ scale: 0, opacity: 0 }}
            className='z-[99999] shadow-2xl will-change-transform fixed top-[10px] right-[10px] left-[10px] md:left-auto md:right-[calc(1rem+2vw)] rounded-[clamp(22px,2vw,48px)] bg-white overflow-hidden text-black w-[calc(100vw-20px)] md:w-[clamp(25vw,100vw,34.6vw)] origin-top-right'
          >
            <div className='flex flex-col justify-between h-full pt-[88px] pr-[6.15vw] pb-[8.21vw] pl-[6.15vw] md:pt-[calc(16px+4vw)] md:pr-[1.67vw] md:pb-[2.38vw] md:pl-[2.8vw]'>
              <nav className='font-title mb-24 md:mb-10'>
                <ul className='text-[6.2vw] md:text-[2vw] flex flex-col [&>a]:py-[1vw] md:[&>a]:py-[.4vw]'>
                  <Link href='/'>
                    <li>
                      <Title text='Home' splitBy='' className='gap-0' />
                    </li>
                  </Link>

                  <Link href='/showcase'>
                    <li>
                      <Title text='Showcase' splitBy='' className='gap-0' />
                    </li>
                  </Link>

                  <Link href='/services'>
                    <li>
                      <Title text='Services' splitBy='' className='gap-0' />
                    </li>
                  </Link>

                  <Link href='/about-us'>
                    <li>
                      <Title text='About us' splitBy='' className='gap-0' />
                    </li>
                  </Link>

                  <Link href='/contact'>
                    <li>
                      <Title text='Contact' splitBy='' className='gap-0' />
                    </li>
                  </Link>
                </ul>
              </nav>

              <div className='grid grid-cols-2 gap-4 font-bold text-small'>
                <div className='flex items-end'>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    Email us here
                    <div>
                      <ArrowUpRight className='w-6 h-6' />
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-end'>
                  <nav>
                    <ul className='flex flex-col [&>a]:py-[.4vw]'>
                      <Link href='/'>
                        <li className='flex items-center justify-between gap-4'>
                          behance{' '}
                          <span className='md:h-[1vw] md:w-[1vw]'>
                            <svg className='-rotate-45' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <line x1='0.00195313' y1='8.85474' x2='15.0966' y2='8.85474' stroke='black' stroke-width='1.64208'></line>
                              <path d='M8.52832 2.69751L14.6861 8.8553L8.93884 14.6026' stroke='black' stroke-width='1.64208'></path>
                            </svg>
                          </span>
                        </li>
                      </Link>

                      <Link href='/'>
                        <li className='flex items-center justify-between gap-4'>
                          dribbble{' '}
                          <span className='md:h-[1vw] md:w-[1vw]'>
                            <svg className='-rotate-45' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <line x1='0.00195313' y1='8.85474' x2='15.0966' y2='8.85474' stroke='black' stroke-width='1.64208'></line>
                              <path d='M8.52832 2.69751L14.6861 8.8553L8.93884 14.6026' stroke='black' stroke-width='1.64208'></path>
                            </svg>
                          </span>
                        </li>
                      </Link>

                      <Link href='/'>
                        <li className='flex items-center justify-between gap-4'>
                          instagram{' '}
                          <span className='md:h-[1vw] md:w-[1vw]'>
                            <svg className='-rotate-45' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <line x1='0.00195313' y1='8.85474' x2='15.0966' y2='8.85474' stroke='black' stroke-width='1.64208'></line>
                              <path d='M8.52832 2.69751L14.6861 8.8553L8.93884 14.6026' stroke='black' stroke-width='1.64208'></path>
                            </svg>
                          </span>
                        </li>
                      </Link>

                      <Link href='/'>
                        <li className='flex items-center justify-between gap-4'>
                          linkedin{' '}
                          <span className='md:h-[1vw] md:w-[1vw]'>
                            <svg className='-rotate-45' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <line x1='0.00195313' y1='8.85474' x2='15.0966' y2='8.85474' stroke='black' stroke-width='1.64208'></line>
                              <path d='M8.52832 2.69751L14.6861 8.8553L8.93884 14.6026' stroke='black' stroke-width='1.64208'></path>
                            </svg>
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            <div className='md:hidden absolute top-[7vw] left-[6.15vw] text-[clamp(10px,0.55vw,0.55vw)] uppercase text-slate-600 font-medium font-title'>
              Milan, Italy <span className='font-semibold text-black'>{formattedTime}</span>
              {amPm}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('up')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection) // add event listener

    return () => {
      window.removeEventListener('scroll', updateScrollDirection) // clean up
    }
  }, [scrollDirection])

  return scrollDirection
}
