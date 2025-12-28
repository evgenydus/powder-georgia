import { z } from 'zod'

export const inquiryTypes = ['general', 'tour', 'transfer', 'instructor', 'apartment'] as const

export type InquiryType = (typeof inquiryTypes)[number]

export const contactSchema = z.object({
  email: z.string().email(),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().min(10),
  name: z.string().min(2),
  phone: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultValues: ContactFormData = {
  email: '',
  inquiryType: 'general',
  message: '',
  name: '',
  phone: '',
}
