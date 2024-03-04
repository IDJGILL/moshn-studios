import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import fonts from 'next/font/local'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence } from 'framer-motion'
import Footer from '@/components/footer'

const localFonts = fonts({
  src: [
    {
      path: '../../public/fonts/monument-extended-black.woff',
      weight: '800',
    },
    {
      path: '../../public/fonts/monument-extended-regular.woff',
      weight: '400',
    },
    {
      path: '../../public/fonts/monument-extended-light.woff',
      weight: '300',
    },
  ],
  variable: '--monument-fonts',
})

const montserrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main className={`${montserrat.className} ${localFonts.variable}`}>
      <AnimatePresence mode='wait'>
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </main>
  )
}
