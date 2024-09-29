import Inner from '@/components/layout/inner'
import Image from 'next/image'
import Car from '@/assets/images/car.png'
import Title from '@/components/title'
import project1 from '@/assets/images/project-1.png'

export default function ProjectPage() {
  return (
    <Inner>
      <div className='h-full bg-black'>
        <div className='w-full z-10 bg-black fixed top-0 left-0'>
          <div className='relative h-[calc(100vh-200px)] w-full overflow-hidden flex items-center justify-center px-6 text-center'>
            <Image src={Car} alt='' fill className='object-cover opacity-60' />

            <Title text='The Future of Mobility' splitBy='words' className='text-6xl text-center text-balance' />
          </div>
        </div>

        <div className='z-50 bg-black w-full absolute top-[calc(100vh-300px)] left-0 rounded-t-[30px] lg:rounded-t-[60px]'>
          <div className='md:max-w-7xl mx-auto py-10 lg:py-20 min-h-screen px-6'>
            <section className='flex flex-col lg:flex-row gap-20'>
              <div className='lg:w-[50%] text-xl md:text-2xl'>
                <div className='border-b-2 border-white/40 pb-4 flex items-center gap-4'>
                  <div>
                    <h3 className='text-gray-400'>Client: </h3>
                  </div>

                  <div>Ford</div>
                </div>

                <div className='border-b-2 border-white/40 py-4 flex items-center gap-4'>
                  <div>
                    <h3 className='text-gray-400'>Timeline: </h3>
                  </div>

                  <div>05/04/2023 - 10/05/2023</div>
                </div>

                <div className='py-10 flex flex-col gap-4'>
                  <h3 className='text-gray-400'>Overview</h3>

                  <p className='text-base'>
                    We partnered with Ford to create an immersive 3D animation that showcases their latest electric vehicle lineup. This
                    project aimed to highlight Ford’s commitment to innovation and sustainability while captivating audiences with visually
                    stunning graphics and storytelling.
                  </p>
                </div>
              </div>

              <div className='flex-1'>
                <Image src={project1} alt='' className='aspect-[9/16]' />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Inner>
  )
}
