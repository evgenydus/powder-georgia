import { z } from 'zod'

export const inquiryTypes = ['general', 'tour', 'transfer', 'instructor', 'apartment'] as const

export type InquiryType = (typeof inquiryTypes)[number]

export const contactSchema = z.object({
  email: z.email().max(255),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().min(10).max(2000),
  name: z.string().min(2).max(100),
  phone: z.string().max(30).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultValues: ContactFormData = {
  email: '',
  inquiryType: 'general',
  message: '',
  name: '',
  phone: '',
}
