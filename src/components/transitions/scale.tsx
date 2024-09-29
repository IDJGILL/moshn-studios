import { motion } from 'framer-motion'
import { ease } from '../layout/inner'
import { anim } from '../layout/inner'

interface TransitionScaleProps extends React.HTMLAttributes<HTMLElement> {}

export default function TransitionScale({ ...props }: TransitionScaleProps) {
  const {} = props

  const slide = {
    initial: {
      top: '100vh',
      borderRadius: '80px',
    },
    enter: {
      top: '100vh',
      borderRadius: '80px',
    },
    exit: {
      top: '0',
      transition: {
        duration: 1.2,
        ease,
      },
      borderRadius: '0px',
    },
  }

  const perspective = {
    enter: {
      scale: 1,
      opacity: 1,
      height: '100vh',
    },
    exit: {
      y: '-2%',
      scale: 0.9,
      opacity: 0.5,
      transition: {
        duration: 1.2,
        ease,
      },
      height: '100vh',
      borderRadius: '28px',
      overflow: 'hidden',
    },
  }

  return (
    <div className='bg-black h-full'>
      <motion.div {...anim(slide)} className='slide fixed left-0 top-0 w-screen glass !backdrop-blur-2xl h-screen z-[10000000000]' />

      <motion.div {...anim(perspective)}>{props.children}</motion.div>
    </div>
  )
}
