import { z } from 'zod'

const apartmentSchema = z.object({
  amenities_en: z.string().optional(),
  amenities_ka: z.string().optional(),
  amenities_ru: z.string().optional(),
  area_sqm: z.coerce.number().positive().optional(),
  bathrooms: z.coerce.number().min(1),
  bedrooms: z.coerce.number().min(0),
  capacity: z.coerce.number().min(1),
  description_en: z.string().min(1),
  description_ka: z.string().min(1),
  description_ru: z.string().min(1),
  images: z.array(z.url()).max(10).default([]),
  is_published: z.boolean(),
  price_per_night_usd: z.coerce.number().min(0),
  slug: z.string().min(1),
  title_en: z.string().min(1),
  title_ka: z.string().min(1),
  title_ru: z.string().min(1),
})

type ApartmentFormData = z.infer<typeof apartmentSchema>

const defaultValues: ApartmentFormData = {
  amenities_en: '',
  amenities_ka: '',
  amenities_ru: '',
  area_sqm: undefined,
  bathrooms: 1,
  bedrooms: 1,
  capacity: 2,
  description_en: '',
  description_ka: '',
  description_ru: '',
  images: [],
  is_published: false,
  price_per_night_usd: 50,
  slug: '',
  title_en: '',
  title_ka: '',
  title_ru: '',
}

const getInitialValues = (apartment?: Partial<ApartmentFormData>): ApartmentFormData => {
  if (!apartment) return defaultValues

  return {
    ...defaultValues,
    ...apartment,
    amenities_en: apartment.amenities_en ?? '',
    amenities_ka: apartment.amenities_ka ?? '',
    amenities_ru: apartment.amenities_ru ?? '',
  }
}

export { apartmentSchema, defaultValues, getInitialValues }
export type { ApartmentFormData }
