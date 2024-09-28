import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import fonts from 'next/font/local'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from '@/components/smooth-scroll'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const helvetica = fonts({
  src: [
    {
      path: '../../public/fonts/HelveticaNeueLight.woff',
      weight: '300',
    },
    {
      path: '../../public/fonts/HelveticaNeueRoman.woff',
      weight: '400',
    },
    {
      path: '../../public/fonts/HelveticaNeueMedium.woff',
      weight: '500',
    },
    {
      path: '../../public/fonts/HelveticaNeueBold.woff',
      weight: '700',
    },
  ],
  variable: '--helvetica-neue-font',
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={`${helvetica.variable} bg-black font-sans text-white antialiased tracking-tighter`}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode='wait'>
          <Component key={router.route} {...pageProps} />
          <SmoothScroll />
        </AnimatePresence>
      </QueryClientProvider>
    </main>
  )
}
