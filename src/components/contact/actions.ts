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

    const {
      email,
      groupSize,
      inquiryType,
      lessonType,
      message,
      name,
      phone,
      preferredDate,
      preferredDateEnd,
      route,
      skillLevel,
    } = parsed.data

    const validLanguage = locales.includes(language as (typeof locales)[number]) ? language : 'en'
    const supabase = await createClient()

    const { error } = await supabase.from('inquiries').insert({
      client_email: email,
      client_name: name,
      client_phone: phone || null,
      group_size: groupSize ? parseInt(groupSize, 10) : null,
      inquiry_type: inquiryType,
      language: validLanguage,
      lesson_type: lessonType || null,
      message: message || null,
      preferred_date: preferredDate || null,
      preferred_date_end: preferredDateEnd || null,
      route: route || null,
      skill_level: skillLevel || null,
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
      groupSize: groupSize ? parseInt(groupSize, 10) : undefined,
      inquiryType,
      language: validLanguage,
      lessonType,
      message,
      preferredDate,
      preferredDateEnd,
      route,
      skillLevel,
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
