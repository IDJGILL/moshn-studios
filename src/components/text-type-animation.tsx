'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface TextTypeAnimationProps extends React.HTMLAttributes<HTMLElement> {
  texts: string[]
  repeat?: boolean
}

export default function TextTypeAnimation({ ...props }: TextTypeAnimationProps) {
  const { texts, repeat } = props
  const textIndex = useMotionValue(0)

  const baseText = useTransform(textIndex, (latest) => texts[latest] || '')
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest))
  const updatedThisRound = useMotionValue(true)
  const itemRef = useRef(null)
  const inView = useInView(itemRef, { once: true })

  useEffect(() => {
    console.log({ inView })
    if (!inView) return

    animate(count, 100, {
      type: 'tween',
      duration: 6,
      ease: 'linear',
      delay: 1,
      repeat: repeat ? Infinity : 0,
      repeatType: 'reverse',
      repeatDelay: 1,
      onUpdate(latest) {
        if (!repeat) return

        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false)
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0)
          } else {
            textIndex.set(textIndex.get() + 1)
          }
          updatedThisRound.set(true)
        }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className={cn('flex items-center md:justify-center w-full', props.className)}>
      <div>
        <motion.span ref={itemRef} className='inline text-white uppercase text-left'>
          {displayText}
        </motion.span>
        <CursorBlinker />
      </div>
    </div>
  )
}

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: 'linear',
      times: [0, 0.5, 0.5, 1],
    },
  },
}

export function CursorBlinker() {
  return <motion.span variants={cursorVariants} animate='blinking' className='inline-block h-4 w-2 ml-2 translate-y-1 bg-white' />
}
