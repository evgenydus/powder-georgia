'use server'

import { bookingSchema } from './bookingSchema'

import { locales } from '@/i18n/config'
import { sendInquiryNotification } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

type SubmitBookingResult = {
  error?: string
  success: boolean
}

export const submitBooking = async (
  data: unknown,
  language: string,
): Promise<SubmitBookingResult> => {
  try {
    const parsed = bookingSchema.safeParse(data)

    if (!parsed.success) {
      return { error: 'Invalid form data', success: false }
    }

    const { email, groupSize, message, name, phone, preferredDate, route, transferId } = parsed.data

    const validLanguage = locales.includes(language as (typeof locales)[number]) ? language : 'en'
    const supabase = await createClient()

    // Build message with route included
    const fullMessage = `Route: ${route}${message ? `\n\nMessage: ${message}` : ''}`

    const { error } = await supabase.from('inquiries').insert({
      client_email: email,
      client_name: name,
      client_phone: phone || null,
      group_size: groupSize || null,
      inquiry_type: 'transfer',
      language: validLanguage,
      message: fullMessage,
      preferred_date: preferredDate || null,
      related_id: transferId,
    })

    if (error) {
      console.error('Supabase error:', error)

      return { error: 'Failed to submit booking', success: false }
    }

    // Send email notification
    const emailResult = await sendInquiryNotification({
      clientEmail: email,
      clientName: name,
      clientPhone: phone,
      inquiryType: 'transfer',
      language: validLanguage,
      message: fullMessage,
    })

    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error)
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting booking:', error)

    return { error: 'An unexpected error occurred', success: false }
  }
}
