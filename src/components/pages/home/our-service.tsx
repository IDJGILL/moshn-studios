import Image from 'next/image'
import Services from '@/assets/images/services.png'
import Title from '@/components/title'

export default function OurService({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props

  return (
    <section className='flex pb-20 pr-20'>
      <div className='relative h-[800px] w-[50%] overflow-hidden'>
        <Image src={Services} alt='' fill className='object-cover' />
      </div>

      <div className='w-[50%] flex flex-col justify-center pl-24'>
        <Title text='Our Service' splitBy='words' className='text-8xl tracking-tighter gap-6' />

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
