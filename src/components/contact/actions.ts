'use server'

import { contactSchema } from './contactSchema'

import { locales } from '@/i18n/config'
import { sendInquiryNotification } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

type SubmitInquiryResult = {
  error?: string
  success: boolean
}

export const submitInquiry = async (
  data: unknown,
  language: string,
): Promise<SubmitInquiryResult> => {
  try {
    const parsed = contactSchema.safeParse(data)

    if (!parsed.success) {
      return { error: 'Invalid form data', success: false }
    }

    const { email, inquiryType, message, name, phone } = parsed.data
    const validLanguage = locales.includes(language as (typeof locales)[number]) ? language : 'en'
    const supabase = await createClient()

    const { error } = await supabase.from('inquiries').insert({
      client_email: email,
      client_name: name,
      client_phone: phone || null,
      inquiry_type: inquiryType,
      language: validLanguage,
      message: message,
    })

    if (error) {
      console.error('Supabase error:', error)

      return { error: 'Failed to submit inquiry', success: false }
    }

    // Send email notification (don't fail the request if email fails)
    const emailResult = await sendInquiryNotification({
      clientEmail: email,
      clientName: name,
      clientPhone: phone,
      inquiryType: inquiryType,
      language: validLanguage,
      message: message,
    })

    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error)
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting inquiry:', error)

    return { error: 'An unexpected error occurred', success: false }
  }
}
