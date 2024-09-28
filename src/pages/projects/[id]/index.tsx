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
          <div className='relative h-[460px] w-full overflow-hidden flex items-center justify-center'>
            <Image src={Car} alt='' fill className='object-cover opacity-60' />

            <Title text='The Future of Mobility' splitBy='words' className='text-6xl' />
          </div>
        </div>

        <div className='z-50 bg-black w-full absolute top-[400px] left-0 rounded-t-[60px]'>
          <div className='max-w-7xl mx-auto py-20 min-h-screen'>
            <section className='flex gap-20'>
              <div className='w-[50%] text-2xl'>
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
