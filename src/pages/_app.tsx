import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import fonts from 'next/font/local'
import { Questrial } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from '@/components/smooth-scroll'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const garet = fonts({
  src: [
    {
      path: '../../public/fonts/garet/Garet-Book.woff2',
      weight: '400',
    },
  ],
  variable: '--garet-font',
})

const questrial = Questrial({
  weight: '400',
  style: 'normal',
  variable: '--questrial-font',
  subsets: ['latin'],
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={`${garet.variable} ${questrial.variable} bg-black font-sans text-white antialiased tracking-tighter`}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode='wait'>
          <Component key={router.route} {...pageProps} />
          <SmoothScroll />
        </AnimatePresence>
      </QueryClientProvider>
    </main>
  )
}
