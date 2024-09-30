import { $ContactInput } from '@/lib/schema'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type FormResponse = {
  status: 'validation_failed'
  message: string
  invalid_fields: {
    field: string
    message: string
    idref: null
    error_id: string
  }
  posted_data_hash: string
  into: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body

  try {
    const form = new FormData()

    const input = $ContactInput.parse(JSON.parse(data))

    form.append('your-name', input.name)
    form.append('your-email', input.email)
    form.append('your-phone', input.phone_number)
    form.append('your-company', input.company)
    form.append('your-project-details', input.project_details)
    form.append('your-contact-preference', input.contact_preference)

    const result = await axios.post<FormResponse>(
      'https://admin.moshnstudios.com/wp-json/contact-form-7/v1/contact-forms/9/feedback',
      form,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )

    if (result.data.status === 'validation_failed') {
      return res.status(400).json({ success: false, message: 'Invalid fields, please check your input and try again.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Something went wrong, please try again later.' })
  }
}
