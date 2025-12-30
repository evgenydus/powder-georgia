'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

import { submitInquiry } from './actions'
import type { ContactFormData } from './contactSchema'
import { contactSchema, defaultValues } from './contactSchema'

export const useContactForm = (onSuccess?: () => void) => {
  const t = useTranslations()
  const locale = useLocale()
  const { toastError, toastSuccess } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormData>({
    defaultValues,
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const result = await submitInquiry(data, locale)

      if (result.success) {
        toastSuccess(t('contact.success'))
        form.reset()
        onSuccess?.()
      } else {
        toastError(t('contact.error'), { message: result.error })
      }
    } catch (error) {
      toastError(t('contact.error'), { error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    ...form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
