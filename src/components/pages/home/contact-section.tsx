import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function ContactSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md'>
      <Button size='lg' as={Link} href='/contact' className='glass mt-10 text-white text-base px-8'>
        Get Your Brand In Moshn
      </Button>
    </section>
  )
}
