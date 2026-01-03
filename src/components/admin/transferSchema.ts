import { z } from 'zod'

const transferSchema = z.object({
  capacity: z.coerce.number().min(1),
  description_en: z.string().optional(),
  description_ka: z.string().optional(),
  description_ru: z.string().optional(),
  image_url: z.url().optional().or(z.literal('')),
  is_active: z.boolean(),
  price_usd: z.coerce.number().min(0),
  slug: z.string().min(1),
  title_en: z.string().min(1),
  title_ka: z.string().min(1),
  title_ru: z.string().min(1),
  vehicle_type: z.string().min(1),
})

type TransferFormData = z.infer<typeof transferSchema>

const defaultValues: TransferFormData = {
  capacity: 4,
  description_en: '',
  description_ka: '',
  description_ru: '',
  image_url: '',
  is_active: false,
  price_usd: 50,
  slug: '',
  title_en: '',
  title_ka: '',
  title_ru: '',
  vehicle_type: 'suv',
}

const getInitialValues = (transfer?: Partial<TransferFormData>): TransferFormData => {
  if (!transfer) return defaultValues

  return {
    ...defaultValues,
    ...transfer,
    description_en: transfer.description_en ?? '',
    description_ka: transfer.description_ka ?? '',
    description_ru: transfer.description_ru ?? '',
    image_url: transfer.image_url ?? '',
  }
}

export { defaultValues, getInitialValues, transferSchema }
export type { TransferFormData }
