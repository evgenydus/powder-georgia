import { z } from 'zod'

export const bookingSchema = z.object({
  email: z.email().max(255),
  groupSize: z.coerce.number().min(1),
  message: z.string().max(2000).optional(),
  name: z.string().min(2).max(100),
  phone: z.string().max(30).optional(),
  preferredDate: z.string(),
  route: z.string().min(3).max(200),
  transferId: z.string(),
})

export type BookingFormData = z.infer<typeof bookingSchema>

export const defaultValues: Partial<BookingFormData> = {
  email: '',
  groupSize: undefined,
  message: '',
  name: '',
  phone: '',
  preferredDate: '',
  route: '',
  transferId: '',
}
