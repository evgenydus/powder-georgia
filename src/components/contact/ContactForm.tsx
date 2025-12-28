'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

import { Button, Input, Textarea } from '@/components/ui'
import { submitInquiry } from './actions'
import type { ContactFormData } from './contactSchema'
import { contactSchema, defaultValues, inquiryTypes } from './contactSchema'

export const ContactForm = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { toastError, toastSuccess } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    defaultValues,
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const result = await submitInquiry(data, locale)

      if (result.success) {
        toastSuccess(t('contact.success'))
        reset()
      } else {
        toastError('ContactForm', { message: result.error })
      }
    } catch (error) {
      toastError('ContactForm', { error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-foreground mb-2 block text-sm font-medium" htmlFor="name">
          {t('contact.name')} *
        </label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-foreground mb-2 block text-sm font-medium" htmlFor="email">
          {t('contact.email')} *
        </label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-foreground mb-2 block text-sm font-medium" htmlFor="phone">
          {t('contact.phone')}
        </label>
        <Input id="phone" type="tel" {...register('phone')} />
      </div>

      <div>
        <label className="text-foreground mb-2 block text-sm font-medium" htmlFor="inquiryType">
          {t('contact.inquiryType')} *
        </label>
        <select
          className="border-input bg-background text-foreground focus:ring-accent w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          id="inquiryType"
          {...register('inquiryType')}
        >
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {t(`contact.types.${type}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-foreground mb-2 block text-sm font-medium" htmlFor="message">
          {t('contact.message')} *
        </label>
        <Textarea id="message" rows={5} {...register('message')} />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? t('contact.sending') : t('contact.send')}
      </Button>
    </form>
  )
}
