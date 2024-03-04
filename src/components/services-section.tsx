interface ServicesSectionProps extends React.HTMLAttributes<HTMLElement> {}

export default function ServicesSection({ ...props }: ServicesSectionProps) {
  const {} = props

  return (
    <section className='pb-20 '>
      <div className='flex items-center moshn-container justify-between py-5 md:py-20'>
        <div className='w-1/2'>
          <h2 className='text-xxl font-title'>
            {/* Our <br /> */}
            Services
          </h2>
        </div>

        <div className='w-1/2 flex items-center justify-end'>
          <div className='text-[2vw] font-medium leading-[120%]'>
            Lorem Ipsum is simply dummy <br /> text of the printing and industry.
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row border-y divide-x text-lg font-normal md:h-[70vh]'>
        <div className='p-[2vw] flex flex-col justify-between py-5'>
          <div>
            <h3 className='font-title text-large mb-4'>Advertising</h3>
            <p className='mb-6 text-small'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {`industry's`}
              standard dummy text ever since the 1500s
            </p>
          </div>

          <div className='h-[22vh] bg-slate-300 rounded-3xl'></div>
        </div>

        <div className='p-[2vw] flex flex-col justify-between py-5'>
          <div>
            <h3 className='font-title text-large mb-4'>3D Modeling</h3>
            <p className='mb-6 text-small'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {`industry's`}
              standard dummy text ever since the 1500s
            </p>
          </div>

          <div className='h-[22vh] bg-slate-300 rounded-3xl'></div>
        </div>

        <div className='p-[2vw] flex flex-col justify-between py-5'>
          <div>
            <h3 className='font-title text-large mb-4'>Marketing</h3>
            <p className='mb-6 text-small'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {`industry's`}
              standard dummy text ever since the 1500s
            </p>
          </div>

          <div className='h-[22vh] bg-slate-300 rounded-3xl'></div>
        </div>

        <div className='p-[2vw] flex flex-col justify-between py-5'>
          <div>
            <h3 className='font-title text-large mb-4'>Advertising</h3>
            <p className='mb-6 text-small'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {`industry's`}
              standard dummy text ever since the 1500s
            </p>
          </div>

          <div className='h-[22vh] bg-slate-300 rounded-3xl'></div>
        </div>
      </div>
    </section>
  )
}
