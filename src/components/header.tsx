import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScrollLock from '@/hooks/useScrollLock'
import { PlusIcon, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import GrayLogoText from '@/assets/brand/logo-text-gray.png'
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
        x: 'var(--nav-menu-x, -0.8vw)',
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
      <div className='flex items-center justify-between w-full pl-6 pr-4'>
        <Link href='/'>
          <div className='w-[30.38vw] md:w-[clamp(45px,10.57vw,160px)] flex gap-4 items-center'>
            <Image src={GrayLogoText} alt='' className='w-full h-full' />
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
            className='flex items-center justify-end w-[clamp(25vw,100vw,30.8vw)] will-change-transform'
          >
            <motion.button
              className='flex items-center'
              onClick={() => handleMenuTrigger()}
              transition={{
                duration: 0.5,
                ease: ease,
              }}
            >
              <div className='ml-[2.05vw] md:ml-[0.71vw] inline-block'>
                <div className='relative w-[clamp(10px,10.26vw,55px)] h-[clamp(10px,10.26vw,55px)] md:w-[2.38vw] md:h-[2.38vw] overflow-hidden aspect-square rounded-full flex items-center justify-center cursor-pointer group'>
                  {!visible && (
                    <PlusIcon className='text-white stroke-1 z-10 ease-in-out duration-300 size-14 scale-[1.1] group-hover:scale-50' />
                  )}

                  {visible && <X className='text-white stroke-1 z-10 ease-in-out duration-300 size-14 scale-100 group-hover:scale-50' />}

                  <motion.span
                    className={cn(
                      'w-full h-full aspect-square absolute top-0 inset-0 rounded-full scale-0 glass ease-in-out duration-500 group-hover:scale-100 grass bg-white'
                    )}
                  />
                </div>
              </div>
            </motion.button>
          </motion.div>
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
            className='z-[99999] shadow-2xl will-change-transform fixed top-[10px] right-[10px] left-[10px] md:left-auto rounded-[clamp(22px,2vw,48px)] overflow-hidden text-white w-[calc(100vw-20px)] md:w-[clamp(25vw,100vw,20.6vw)] origin-top-right h-[calc(100dvh-20px)] glass'
          >
            <div className='flex flex-col justify-between h-full pt-[88px] pr-[6.15vw] pb-[8.21vw] pl-[6.15vw] md:pt-[calc(16px+4vw)] md:pr-[1.67vw] md:pb-[2.38vw] md:pl-[2.8vw]'>
              <nav className='font-title mb-24 md:mb-10'>
                <ul className='text-[6.2vw] md:text-[2vw] flex flex-col [&>a]:py-[1vw] md:[&>a]:py-[.4vw]'>
                  <Link href='/'>
                    <li>
                      <Title splitBy='characters' text='Home' />
                    </li>
                  </Link>

                  <Link href='/projects'>
                    <li>
                      <Title splitBy='characters' text='Projects' />
                    </li>
                  </Link>

                  <Link href='/career'>
                    <li>
                      <Title splitBy='characters' text='Career' />
                    </li>
                  </Link>

                  <Link href='/contact'>
                    <li>
                      <Title splitBy='characters' text='Contact' />
                    </li>
                  </Link>
                </ul>
              </nav>

              <Socials />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Socials({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props
  return (
    <div className='flex items-center gap-4'>
      <Link href='/'>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 32 32'>
          <path
            fill='white'
            d='M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0'
          ></path>
        </svg>
      </Link>

      <Link href='/'>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 32 32'>
          <path
            fill='white'
            d='M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z'
          ></path>
        </svg>
      </Link>

      <Link href='/'>
        <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 32 32'>
          <path
            fill='white'
            d='M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z'
            fill-rule='evenodd'
          ></path>
        </svg>
      </Link>
    </div>
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
