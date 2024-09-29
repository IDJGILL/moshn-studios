import { Button } from '@nextui-org/react'
import { motion, useMotionValue } from 'framer-motion'
import Link from 'next/link'

export default function ContactSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateXVal = (y / rect.height - 0.5) * 40 // Increased vertical tilt
    const rotateYVal = (x / rect.width - 0.5) * -40 // Increased horizontal tilt

    rotateX.set(rotateXVal)
    rotateY.set(rotateYVal)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md'
    >
      <h3 className='text-6xl text-center text-white relative z-20 flex flex-col gap-4 items-center py-10 capitalize'>
        Bring your idea&apos;s to{' '}
        <span className='ml-4'>
          <motion.div
            className='text-3d !text-9xl'
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transform: `perspective(1000px)`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            3D
          </motion.div>
        </span>
      </h3>

      <Button size='lg' as={Link} href='/contact' className='glass mt-10 text-white text-base px-8'>
        Get in Touch!
      </Button>
    </section>
  )
}
