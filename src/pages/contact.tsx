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
import { $ContactInput, ContactInput } from '@/lib/schema'
import { toast } from 'sonner'

export default function Contact() {
  const [isSuccess, setSuccess] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (input: ContactInput) => {
      const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(input) })

      if (!response.ok) throw new Error('Something went wrong, please try again later.')
    },
    onSuccess: () => setSuccess(true),
    onError: () => {
      toast.error('Something went wrong, please try again later.')
    },
  })

  const { form, handleSubmit } = useForm({
    logger: true,
    schema: $ContactInput,
    onSubmit: (input) => mutate(input),
  })

  return (
    <Inner>
      <div className='bg-black dark px-6 py-20'>
        <div className='max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center'>
          {!isSuccess ? (
            <>
              <Title text='Connect With Us' splitBy='words' className='text-3xl mb-16' />

              <Form form={form} className='w-full'>
                <FormTextInput form={form} name='name' label='Name' placeholder='Enter your name' className='pb-10' />

                <FormTextInput form={form} name='email' label='Email' placeholder='Enter your email' className='pb-14' />

                <FormTextInput form={form} name='company' label='Company' placeholder='Enter your company name' className='pb-14' />

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
                  name='project_details'
                  label='Project Details'
                  placeholder='Enter your project details'
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
                View Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </Inner>
  )
}
