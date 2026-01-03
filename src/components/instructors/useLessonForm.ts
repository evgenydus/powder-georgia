'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

import { submitLessonRequest } from './lessonActions'
import type { LessonFormData } from './lessonSchema'
import { defaultValues, lessonSchema } from './lessonSchema'

type UseLessonFormOptions = {
  instructorId: string
  onDirtyChange?: (isDirty: boolean) => void
  onSuccess: () => void
}

export const useLessonForm = ({ instructorId, onDirtyChange, onSuccess }: UseLessonFormOptions) => {
  const t = useTranslations()
  const locale = useLocale()
  const { toastError } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LessonFormData>({
    defaultValues: { ...defaultValues, instructorId },
    resolver: zodResolver(lessonSchema) as Resolver<LessonFormData>,
  })

  const { isDirty } = form.formState

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  const onSubmit = async (data: LessonFormData) => {
    setIsSubmitting(true)

    try {
      const result = await submitLessonRequest(data, locale)

      if (result.success) {
        onSuccess()
      } else {
        toastError(t('lessonRequest.error'), { message: result.error })
      }
    } catch (error) {
      toastError(t('lessonRequest.error'), { error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, isSubmitting, onSubmit: form.handleSubmit(onSubmit) }
}
