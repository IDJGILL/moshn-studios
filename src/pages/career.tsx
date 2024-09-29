import { Form, useForm } from '@/components/form'
import { FormSelect } from '@/components/form-select'
import { FormTextAreaInput } from '@/components/form-text-area-input'
import { FormTextInput } from '@/components/form-text-input'
import Inner from '@/components/layout/inner'
import Title from '@/components/title'
import { Button, Link } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { z } from 'zod'

const $CareerInput = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  position: z.string(),
  portfolio_url: z.string(),
  about_yourself: z.string(),
  work_type: z.enum(['Full Time', 'Part Time', 'Freelance']),
})

type CareerInput = z.infer<typeof $CareerInput>

export default function CareerPage({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const [isSuccess, setSuccess] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (input: CareerInput) => {
      return fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(input),
      })
    },
    onSuccess: () => setSuccess(true),
  })

  const { form, handleSubmit } = useForm({
    logger: true,
    schema: $CareerInput,
    onSubmit: (input) => mutate(input),
  })

  return (
    <Inner>
      <div className='bg-black dark px-6 py-20'>
        <div className='max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center'>
          {!isSuccess ? (
            <>
              <div className='mb-16 flex flex-col items-center justify-center text-center max-w-xl'>
                <Title text='Join Our Team' splitBy='words' className='text-3xl' />
                <p>
                  We’re always looking for talented individuals to join us. If you’re passionate about CGI, storytelling, and creating
                  stunning visuals, apply below!
                </p>
              </div>

              <Form form={form} className='w-full'>
                <FormTextInput form={form} name='name' label='Name' placeholder='karan Gill' className='pb-10' />

                <FormTextInput form={form} name='email' label='Email' placeholder='karangill@gmai.com' className='pb-10' />

                <FormTextInput form={form} name='phone_number' label='Phone Number' placeholder='9565440004' className='pb-10' />

                <FormSelect
                  form={form}
                  name='work_type'
                  label='Preferred Work Type'
                  placeholder='Full Time, Part Time or Freelance'
                  className='pb-10'
                  options={[
                    { label: 'Full Time', value: 'Full Time' },
                    { label: 'Part Time', value: 'Part Time' },
                    { label: 'Freelance', value: 'Freelance' },
                  ]}
                  selectionMode='single'
                />

                <FormTextInput form={form} name='position' label='Position Applied For' placeholder='Video Editor' className='pb-10' />

                <FormTextInput
                  form={form}
                  name='portfolio_url'
                  label='Link To Your Portfolio'
                  placeholder='https://www.myportfolio.com'
                  className='pb-10'
                />

                <FormTextAreaInput
                  form={form}
                  name='about_yourself'
                  label='Details'
                  placeholder='I enjoy creating visually stunning video edits.'
                  className='pb-10'
                />

                <div className='flex justify-end w-full'>
                  <Button size='lg' className='glass' isLoading={isPending} onPress={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center gap-10'>
              <div className='text-xl text-center max-w-xl'>
                Thanks for reaching us, Our representative will shortly get in touch with you. Meanwhile you can explore our projects here:
              </div>

              <Button className='glass' as={Link} href='/projects'>
                Our Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </Inner>
  )
}
