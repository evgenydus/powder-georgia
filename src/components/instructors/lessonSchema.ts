import { z } from 'zod'

export const lessonTypes = ['ski', 'snowboard', 'freeride'] as const
export const skillLevels = ['beginner', 'intermediate', 'advanced'] as const

export const lessonSchema = z.object({
  email: z.email().max(255),
  groupSize: z.coerce.number().min(1),
  instructorId: z.string(),
  lessonType: z.enum(lessonTypes),
  message: z.string().max(2000).optional(),
  name: z.string().min(2).max(100),
  phone: z.string().max(30).optional(),
  preferredDate: z.string().optional(),
  skillLevel: z.enum(skillLevels),
})

export type LessonFormData = z.infer<typeof lessonSchema>

export const defaultValues: Partial<LessonFormData> = {
  email: '',
  groupSize: 1,
  instructorId: '',
  lessonType: 'ski',
  message: '',
  name: '',
  phone: '',
  preferredDate: '',
  skillLevel: 'beginner',
}
