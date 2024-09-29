import Inner from '@/components/layout/inner'
import React, { useState } from 'react'
import { z } from 'zod'
import { Form, useForm } from '@/components/form'
import { FormTextInput } from '@/components/form-text-input'
import { Button } from '@nextui-org/react'
import Title from '@/components/title'
import { FormTextAreaInput } from '@/components/form-text-area-input'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FormSelect } from '@/components/form-select'

const $ContactInput = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  details: z.string(),
  contact_preference: z.enum(['Email', 'Phone']),
})

type ContactInput = z.infer<typeof $ContactInput>

export default function Contact() {
  const [isSuccess, setSuccess] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (input: ContactInput) => {
      return fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(input),
      })
    },
    onSuccess: () => setSuccess(true),
  })

  const { form, handleSubmit } = useForm({
    logger: true,
    schema: $ContactInput,
    onSubmit: (input) => mutate(input),
  })

  return (
    <Inner>
      <div className='bg-black h-screen dark px-6'>
        <div className='max-w-4xl mx-auto h-screen flex flex-col items-center justify-center'>
          {!isSuccess ? (
            <>
              <Title text='Connect With Us' splitBy='words' className='text-3xl mb-16' />

              <Form form={form} className='w-full'>
                <FormTextInput form={form} name='name' label='Name' placeholder='karan Gill' className='pb-10' />

                <FormTextInput form={form} name='email' label='Email' placeholder='karangill@gmai.com' className='pb-14' />

                <FormSelect
                  form={form}
                  name='contact_preference'
                  label='Contact Preference'
                  placeholder='Email or Phone'
                  className='pb-10'
                  options={[
                    { label: 'Email', value: 'Email' },
                    { label: 'Phone', value: 'Phone' },
                  ]}
                  selectionMode='single'
                />

                <FormTextAreaInput
                  form={form}
                  name='details'
                  label='Details'
                  placeholder='I need help to bring my imagination to 3D visualization.'
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
