import Image from 'next/image'
import Fashion from '@/assets/industries/fashion.gif'
import Jewelry from '@/assets/industries/Jewelry.webp'
import Cosmetics from '@/assets/industries/cosmetics.webp'
import Campaign from '@/assets/industries/campaign.webp'
import Product from '@/assets/industries/product.webp'

export default function IndustriesSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className='flex flex-col gap-4 md:px-20 px-4'>
      <div className='col-span-2 h-[400px] md:h-[600px] relative rounded-[60px] overflow-hidden'>
        <Image src={Fashion} alt='' fill className='object-cover' />
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='h-[400px] md:h-[800px] md:w-[58%] col-span-2 relative rounded-[60px] overflow-hidden'>
          <Image src={Cosmetics} alt='' fill className='object-cover' />
        </div>

        <div className='h-[400px] md:h-[800px] md:w-[42%] relative rounded-[60px] overflow-hidden'>
          <Image src={Jewelry} alt='' fill className='object-cover' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='aspect-[9/16] h-[400px] md:h-[800px] md:w-[30%] col-span-2 relative rounded-[60px] overflow-hidden'>
          <Image src={Campaign} alt='' fill className='object-cover' />
        </div>

        <div className='w-full md:w-[70%] h-[400px] md:h-[800px] relative rounded-[60px] overflow-hidden'>
          <Image src={Product} alt='' fill className='object-cover' />
        </div>
      </div>
    </section>
  )
}
