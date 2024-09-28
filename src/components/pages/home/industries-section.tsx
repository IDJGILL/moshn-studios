import Title from '@/components/title'
import Image from 'next/image'
import Fashion from '@/assets/industries/fashion.gif'
import Jewelry from '@/assets/industries/Jewelry.png'
import Cosmetics from '@/assets/industries/cosmetics.png'
import Campaign from '@/assets/industries/campaign.png'
import Product from '@/assets/industries/product.png'

export default function IndustriesSection({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props

  return (
    <section className='flex flex-col gap-4 px-20'>
      <div className='col-span-2 h-[600px] relative rounded-[60px] overflow-hidden'>
        <Image src={Fashion} alt='' fill className='object-cover' />
      </div>

      <div className='flex gap-4'>
        <div className='h-[800px] w-[58%] col-span-2 relative rounded-[60px] overflow-hidden'>
          <Image src={Campaign} alt='' fill className='object-cover' />
        </div>

        <div className='h-[800px] w-[42%] relative rounded-[60px] overflow-hidden'>
          <Image src={Cosmetics} alt='' fill className='object-cover' />
        </div>
      </div>

      <div className='flex gap-4'>
        <div className='aspect-[9/16] h-[800px] col-span-2 relative rounded-[60px] overflow-hidden'>
          <Image src={Product} alt='' fill className='object-cover' />
        </div>

        <div className='flex-1 relative rounded-[60px] overflow-hidden'>
          <Image src={Jewelry} alt='' fill className='object-cover' />
        </div>
      </div>
    </section>
  )
}
