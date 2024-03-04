import { MotionProps, motion } from 'framer-motion'
import Header from '../header'
import TransitionScale from '../transitions/scale'

interface InnerProps extends React.HTMLAttributes<HTMLElement> {}

export const anim = (variants: MotionProps['variants']) => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  }
}

export const ease = [0.76, 0, 0.24, 1]

export default function Inner({ ...props }: InnerProps) {
  const {} = props

  const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 1,
    },
  }

  return (
    <TransitionScale>
      <motion.div {...anim(opacity)}>
        <Header />
        {props.children}
      </motion.div>
    </TransitionScale>
  )
}
