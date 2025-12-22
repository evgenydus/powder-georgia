import { z } from 'zod'

// Simple schema: only types and required fields
// Range constraints (difficulty 1-5, etc.) are enforced via HTML min/max attributes
const tourSchema = z.object({
  description_en: z.string().min(1),
  description_ka: z.string().min(1),
  description_ru: z.string().min(1),
  difficulty: z.coerce.number(),
  duration_hours: z.coerce.number(),
  group_size_max: z.coerce.number(),
  group_size_min: z.coerce.number(),
  images: z.array(z.string().url()).default([]),
  is_active: z.boolean(),
  price_usd: z.coerce.number(),
  required_equipment_en: z.string().optional(),
  required_equipment_ka: z.string().optional(),
  required_equipment_ru: z.string().optional(),
  slug: z.string().min(1),
  title_en: z.string().min(1),
  title_ka: z.string().min(1),
  title_ru: z.string().min(1),
  vertical_drop_m: z.coerce.number(),
})

type TourFormData = z.infer<typeof tourSchema>

const defaultValues: TourFormData = {
  description_en: '',
  description_ka: '',
  description_ru: '',
  difficulty: 3,
  duration_hours: 8,
  group_size_max: 10,
  group_size_min: 1,
  images: [],
  is_active: true,
  price_usd: 100,
  required_equipment_en: '',
  required_equipment_ka: '',
  required_equipment_ru: '',
  slug: '',
  title_en: '',
  title_ka: '',
  title_ru: '',
  vertical_drop_m: 1000,
}

const getInitialValues = (tour?: Partial<TourFormData>): TourFormData => {
  if (!tour) return defaultValues

  return {
    ...defaultValues,
    ...tour,
    // Ensure optional string fields default to empty string, not undefined
    required_equipment_en: tour.required_equipment_en ?? '',
    required_equipment_ka: tour.required_equipment_ka ?? '',
    required_equipment_ru: tour.required_equipment_ru ?? '',
  }
}

export { defaultValues, getInitialValues, tourSchema }
export type { TourFormData }
