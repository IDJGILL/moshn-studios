import Image from 'next/image'
import Services from '@/assets/images/services.webp'
import Title from '@/components/title'

export default function OurService({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='flex flex-col-reverse lg:flex-row px-4 lg:pr-20 gap-10'>
      <div className='relative h-[600px] lg:h-[calc(100vh-20px)] lg:w-[50%] overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-[40px] bg-gradient-to-t from-transparent to-black z-20'></div>

        <Image src={Services} alt='' fill className='object-cover' />

        <div className='absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-b from-transparent to-black z-20'></div>
      </div>

      <div className='lg:w-[50%] flex flex-col justify-center lg:pl-24'>
        <Title text='Our Service' splitBy='words' className='text-5xl lg:text-7xl tracking-tighter gap-6' />

        <div className='mt-10 space-y-3 text-pretty max-w-xl text-lg'>
          <p>
            We offer high-quality Virtual visual production, trough delivering visually stunning and story-driven content that elevates your
            brand. We offer product visualization and marketing campaigns through 3D animations and motion graphics.
          </p>

          <p>
            We create dynamic visuals that captivate audiences and drive results. Every project is tailored to your unique needs, ensuring
            our custom solutions align with your vision and goals.
          </p>
        </div>
      </div>
    </section>
  )
}
