import { z } from 'zod'

export const inquiryTypes = ['general', 'tour', 'transfer', 'instructor', 'apartment'] as const
export const lessonTypes = ['ski', 'snowboard', 'freeride'] as const
export const skillLevels = ['beginner', 'intermediate', 'advanced'] as const

export type InquiryType = (typeof inquiryTypes)[number]

export const contactSchema = z
  .object({
    email: z.email().max(255),
    groupSize: z.string().optional(),
    inquiryType: z.enum(inquiryTypes),
    lessonType: z.enum(lessonTypes).optional(),
    message: z.string().max(2000).optional(),
    name: z.string().min(2).max(100),
    phone: z.string().max(30).optional(),
    preferredDate: z.string().optional(),
    preferredDateEnd: z.string().optional(),
    route: z.string().max(200).optional(),
    skillLevel: z.enum(skillLevels).optional(),
  })
  .superRefine((data, ctx) => {
    // Route required for transfers
    if (data.inquiryType === 'transfer' && !data.route) {
      ctx.addIssue({ code: 'custom', message: 'Route is required', path: ['route'] })
    }

    // Message required for general inquiries
    if (data.inquiryType === 'general' && (!data.message || data.message.length < 10)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Message is required (min 10 chars)',
        path: ['message'],
      })
    }
  })

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultValues: ContactFormData = {
  email: '',
  groupSize: undefined,
  inquiryType: 'general',
  lessonType: undefined,
  message: '',
  name: '',
  phone: '',
  preferredDate: '',
  preferredDateEnd: '',
  route: '',
  skillLevel: undefined,
}
