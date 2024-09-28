'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { atom, useAtom } from 'jotai'
import { cn } from '@/lib/utils'
import { useBreakpoint } from '@/lib/breakpoint'

const cursorAtom = atom<{ text?: string; isHovered: boolean }>({ isHovered: false })

interface AnimatedCursorProps extends React.HTMLAttributes<HTMLElement> {
  initialSize: number
  hoveredSize: number
}

export default function AnimatedCursor({ ...props }: AnimatedCursorProps) {
  const { initialSize, hoveredSize } = props
  const [cursorSize, cursorSizeSet] = useState(0)

  const screen = useBreakpoint()

  const isTouchDevice = screen === 'SM' || screen === 'MD'

  const [cursor] = useAtom(cursorAtom)

  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)
  const circle = useRef(null)
  const size = cursor.isHovered ? hoveredSize : cursorSize

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e

    mouse.current = {
      x: clientX,
      y: clientY,
    }
  }

  const animate = useCallback(() => {
    const { x, y } = delayedMouse.current

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    }

    moveCircle(delayedMouse.current.x, delayedMouse.current.y)

    rafId.current = window.requestAnimationFrame(animate)
  }, [])

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 })
  }

  const handleCursorSize = useCallback((isVisible: boolean) => cursorSizeSet(isVisible ? initialSize : 0), [initialSize])

  useEffect(() => {
    if (isTouchDevice) return

    animate()

    window.addEventListener('mousemove', manageMouseMove)
    window.addEventListener('mouseover', () => handleCursorSize(true))
    window.addEventListener('mouseout', () => handleCursorSize(false))

    return () => {
      if (!rafId.current) return

      window.cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', manageMouseMove)
      window.removeEventListener('mouseover', () => handleCursorSize(true))
      window.removeEventListener('mouseout', () => handleCursorSize(false))
    }
  }, [animate, handleCursorSize, isTouchDevice])

  return (
    <div
      style={{
        width: size,
        height: size,
        filter: `blur(${cursor.isHovered ? 160 : 0}px)`,
        transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
      }}
      className={cn('top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none z-[1000000000] bg-white', props.className)}
      ref={circle}
    />
  )
}

export const useCursor = () => {
  const [cursor, setCursor] = useAtom(cursorAtom)

  return { cursor, setCursor }
}
