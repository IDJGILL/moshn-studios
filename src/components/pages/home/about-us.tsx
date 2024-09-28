import Image from 'next/image'
import About from '@/assets/images/about-us.png'
import Title from '@/components/title'

export default function AboutUs({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props

  return (
    <section className='flex pt-80 pb-20 px-20'>
      <div className='w-[50%] flex flex-col justify-center'>
        <Title text='About Us' splitBy='words' className='text-8xl tracking-tighter gap-6' />

        <div className='mt-10 space-y-3 text-pretty max-w-xl text-lg'>
          <p>
            We deliver high-quality CGI with precision and attention to detail, ensuring your brand stands out. Our visuals go beyond
            aesthetics, we tell powerful stories that connect with your audience and crate visuals resonate with your brand’s message.
          </p>

          <p>
            We bring your brand and products to life, helping you tell unforgettable stories that captivate and inspire. We create CGI
            content that not only looks great but drives leads and boosts engagement, turning views into conversions.
          </p>
        </div>
      </div>

      <div className='relative h-[800px] w-[50%] overflow-hidden rounded-[60px]'>
        <Image src={About} alt='' fill className='object-cover' />
      </div>
    </section>
  )
}
