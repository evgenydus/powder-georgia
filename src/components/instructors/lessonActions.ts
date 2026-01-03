'use server'

import { lessonSchema } from './lessonSchema'

import { locales } from '@/i18n/config'
import { sendInquiryNotification } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

type SubmitLessonResult = {
  error?: string
  success: boolean
}

export const submitLessonRequest = async (
  data: unknown,
  language: string,
): Promise<SubmitLessonResult> => {
  try {
    const parsed = lessonSchema.safeParse(data)

    if (!parsed.success) {
      return { error: 'Invalid form data', success: false }
    }

    const {
      email,
      groupSize,
      instructorId,
      lessonType,
      message,
      name,
      phone,
      preferredDate,
      skillLevel,
    } = parsed.data

    const validLanguage = locales.includes(language as (typeof locales)[number]) ? language : 'en'
    const supabase = await createClient()

    // Fetch instructor name for email
    const { data: instructor } = await supabase
      .from('instructors')
      .select('name')
      .eq('id', instructorId)
      .single()

    const { error } = await supabase.from('inquiries').insert({
      client_email: email,
      client_name: name,
      client_phone: phone || null,
      group_size: groupSize || null,
      inquiry_type: 'instructor',
      language: validLanguage,
      lesson_type: lessonType,
      message: message || null,
      preferred_date: preferredDate || null,
      related_id: instructorId,
      skill_level: skillLevel,
    })

    if (error) {
      console.error('Supabase error:', error)

      return { error: 'Failed to submit request', success: false }
    }

    // Send email notification
    const emailResult = await sendInquiryNotification({
      clientEmail: email,
      clientName: name,
      clientPhone: phone,
      entityName: instructor?.name,
      groupSize: groupSize || undefined,
      inquiryType: 'instructor',
      language: validLanguage,
      lessonType,
      message,
      preferredDate,
      skillLevel,
    })

    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error)
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting lesson request:', error)

    return { error: 'An unexpected error occurred', success: false }
  }
}
