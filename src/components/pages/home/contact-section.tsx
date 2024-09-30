import Link from 'next/link'

export default function ContactSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md px-6'>
      <Link
        href='/contact'
        className='glass mt-10 text-white p-10 text-3xl hover:scale-105 rounded-3xl text-center hover:opacity-85 ease-in-out duration-300 tracking-tighter'
      >
        Get Your Brand In Moshn
      </Link>
    </section>
  )
}
