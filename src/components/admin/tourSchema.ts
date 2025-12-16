import { z } from 'zod'

// Simple schema: only types and required fields
const tourSchema = z.object({
  description_en: z.string().min(1),
  description_ka: z.string().min(1),
  description_ru: z.string().min(1),
  difficulty: z.coerce.number(),
  duration_hours: z.coerce.number(),
  group_size_max: z.coerce.number(),
  group_size_min: z.coerce.number(),
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

const getInitialValues = (tour?: Partial<TourFormData>): TourFormData =>
  tour
    ? {
        description_en: tour.description_en ?? defaultValues.description_en,
        description_ka: tour.description_ka ?? defaultValues.description_ka,
        description_ru: tour.description_ru ?? defaultValues.description_ru,
        difficulty: tour.difficulty ?? defaultValues.difficulty,
        duration_hours: tour.duration_hours ?? defaultValues.duration_hours,
        group_size_max: tour.group_size_max ?? defaultValues.group_size_max,
        group_size_min: tour.group_size_min ?? defaultValues.group_size_min,
        is_active: tour.is_active ?? defaultValues.is_active,
        price_usd: tour.price_usd ?? defaultValues.price_usd,
        required_equipment_en: tour.required_equipment_en ?? defaultValues.required_equipment_en,
        required_equipment_ka: tour.required_equipment_ka ?? defaultValues.required_equipment_ka,
        required_equipment_ru: tour.required_equipment_ru ?? defaultValues.required_equipment_ru,
        slug: tour.slug ?? defaultValues.slug,
        title_en: tour.title_en ?? defaultValues.title_en,
        title_ka: tour.title_ka ?? defaultValues.title_ka,
        title_ru: tour.title_ru ?? defaultValues.title_ru,
        vertical_drop_m: tour.vertical_drop_m ?? defaultValues.vertical_drop_m,
      }
    : defaultValues

export { defaultValues, getInitialValues, tourSchema }
export type { TourFormData }
