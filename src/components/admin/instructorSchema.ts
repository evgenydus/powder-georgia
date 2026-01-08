import { z } from 'zod'

const instructorSchema = z.object({
  bio_en: z.string().optional(),
  bio_ka: z.string().optional(),
  bio_ru: z.string().optional(),
  contact_email: z.email().optional().or(z.literal('')),
  contact_phone: z.string().optional(),
  is_active: z.boolean(),
  name: z.string().min(1),
  price_per_hour_usd: z.coerce.number().min(0).optional(),
  services_en: z.string().optional(),
  services_ka: z.string().optional(),
  services_ru: z.string().optional(),
  slug: z.string().min(1),
  specialization_en: z.string().optional(),
  specialization_ka: z.string().optional(),
  specialization_ru: z.string().optional(),
})

type InstructorFormData = z.infer<typeof instructorSchema>

const defaultValues: InstructorFormData = {
  bio_en: '',
  bio_ka: '',
  bio_ru: '',
  contact_email: '',
  contact_phone: '',
  is_active: false,
  name: '',
  price_per_hour_usd: undefined,
  services_en: '',
  services_ka: '',
  services_ru: '',
  slug: '',
  specialization_en: '',
  specialization_ka: '',
  specialization_ru: '',
}

const getInitialValues = (instructor?: Partial<InstructorFormData>): InstructorFormData => {
  if (!instructor) return defaultValues

  return {
    ...defaultValues,
    ...instructor,
    bio_en: instructor.bio_en ?? '',
    bio_ka: instructor.bio_ka ?? '',
    bio_ru: instructor.bio_ru ?? '',
    contact_email: instructor.contact_email ?? '',
    contact_phone: instructor.contact_phone ?? '',
    services_en: instructor.services_en ?? '',
    services_ka: instructor.services_ka ?? '',
    services_ru: instructor.services_ru ?? '',
    specialization_en: instructor.specialization_en ?? '',
    specialization_ka: instructor.specialization_ka ?? '',
    specialization_ru: instructor.specialization_ru ?? '',
  }
}

export { defaultValues, getInitialValues, instructorSchema }
export type { InstructorFormData }
