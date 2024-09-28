import Inner from '@/components/layout/inner'
import { projects } from '@/components/pages/home/projects-section'
import Title from '@/components/title'
import Image from 'next/image'
import Link from 'next/link'

export default function Projects() {
  return (
    <Inner>
      <div className='min-h-screen bg-black pt-40'>
        <div className='flex items-center justify-center'>
          <Title text='Projects' splitBy='characters' className='text-6xl' />
        </div>

        <div className='grid grid-cols-4 gap-4 mt-20 p-8'>
          {projects.map((item, index) => (
            <div key={item.name} className='flex flex-col items-center justify-center gap-4 w-full max-w-max rounded-3xl overflow-hidden'>
              <Link href={`/projects/${item.name}`}>
                <Image src={item.image} alt='' className='aspect-[9/16]' />
              </Link>
            </div>
          ))}
        </div>

        <div className='text-center py-20'>You are all caught up!</div>
      </div>
    </Inner>
  )
}
