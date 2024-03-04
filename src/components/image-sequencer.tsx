import { forwardRef, useEffect, useRef, useState } from 'react'
import { Controller, Scene } from 'react-scrollmagic'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageSequencerProps extends React.HTMLAttributes<HTMLElement> {}

export default function ImageSequencer({ ...props }: ImageSequencerProps) {
  const ref = useRef() as React.RefObject<HTMLSpanElement>

  return (
    <section>
      <Controller>
        <Scene duration='200%' triggerHook='onLeave' offset={-880}>
          {(progress: any) => (
            <div className='relative'>
              <div className='sticky top-0 inset-x-0 h-screen w-full'>
                <Sequence progress={progress} />
              </div>
              <div className='bg-gradient-to-b from-transparent to-black w-full h-[300px] absolute bottom-0'></div>

              <div className='h-[600px]'></div>
            </div>
          )}
        </Scene>
      </Controller>
    </section>
  )
}

const currentFrame = (index: number) => `/assets/intro/${index.toString().padStart(4, '0')}.png`

interface SequenceProps extends React.HTMLAttributes<HTMLElement> {
  progress: number
}

function Sequence({ ...props }: SequenceProps) {
  const [images, setImages] = useState<string[]>([]) // Store image URLs in an array
  const [isLoading, setLoading] = useState<boolean>(true)

  const frameCount = 74

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls: string[] = []

      for (let i = 1; i <= frameCount; i++) {
        // Start from 1
        imageUrls.push(currentFrame(i))
      }

      setImages(imageUrls)
      setLoading(false)
    }

    preloadImages()
  }, [])

  const index = Math.round(props.progress * (frameCount - 1)) // Calculate the index based on progress

  if (isLoading) {
    return null
  }

  return (
    <>
      {images.map((item, i) => (
        <Image
          key={item}
          src={item}
          alt=''
          fill
          className={cn('object-cover object-center', {
            hidden: i !== index,
          })}
          priority
        />
      ))}
    </>
  )
}
