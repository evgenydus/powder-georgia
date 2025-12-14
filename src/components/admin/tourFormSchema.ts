import * as z from 'zod'

const formSchema = z.object({
  description_en: z.string().min(1, 'Description is required'),
  description_ka: z.string().min(1, 'Description is required'),
  description_ru: z.string().min(1, 'Description is required'),
  difficulty: z.coerce.number().min(1).max(5),
  duration_hours: z.coerce.number().min(1),
  group_size_max: z.coerce.number().min(1),
  group_size_min: z.coerce.number().min(1),
  images: z.array(z.string()).optional(),
  is_active: z.boolean(),
  price_usd: z.coerce.number().min(1),
  required_equipment_en: z.string().optional(),
  required_equipment_ka: z.string().optional(),
  required_equipment_ru: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  title_en: z.string().min(1, 'Title is required'),
  title_ka: z.string().min(1, 'Title is required'),
  title_ru: z.string().min(1, 'Title is required'),
  vertical_drop_m: z.coerce.number().min(1),
})

type TourFormValues = z.infer<typeof formSchema>

const defaultTourValues: TourFormValues = {
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

const getInitialValues = (tour?: Partial<TourFormValues>) => ({
  ...defaultTourValues,
  ...tour,
  required_equipment_en: tour?.required_equipment_en ?? defaultTourValues.required_equipment_en,
  required_equipment_ka: tour?.required_equipment_ka ?? defaultTourValues.required_equipment_ka,
  required_equipment_ru: tour?.required_equipment_ru ?? defaultTourValues.required_equipment_ru,
})

export { defaultTourValues, formSchema, getInitialValues }
export type { TourFormValues }
