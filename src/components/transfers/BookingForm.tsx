'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import type { Resolver } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

import { Button, DatePicker, FormField, Input, Textarea } from '@/components/ui'
import { submitBooking } from './bookingActions'
import type { BookingFormData } from './bookingSchema'
import { bookingSchema, defaultValues } from './bookingSchema'

type BookingFormProps = {
  maxCapacity: number
  onCancel: () => void
  onSuccess: () => void
  transferId: string
}

export const BookingForm = ({ maxCapacity, onCancel, onSuccess, transferId }: BookingFormProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const { toastError } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<BookingFormData>({
    defaultValues: { ...defaultValues, transferId },
    resolver: zodResolver(bookingSchema) as Resolver<BookingFormData>,
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    try {
      const result = await submitBooking(data, locale)

      if (result.success) {
        onSuccess()
      } else {
        toastError(t('request.error'), { message: result.error })
      }
    } catch (error) {
      toastError(t('request.error'), { error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('transferId')} />
      <FormField error={errors.name?.message} htmlFor="name" label={t('request.name')} required>
        <Input id="name" {...register('name')} />
      </FormField>
      <FormField error={errors.email?.message} htmlFor="email" label={t('request.email')} required>
        <Input id="email" type="email" {...register('email')} />
      </FormField>
      <FormField error={errors.route?.message} htmlFor="route" label={t('request.route')} required>
        <Input id="route" placeholder={t('request.routePlaceholder')} {...register('route')} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField htmlFor="phone" label={t('request.phone')}>
          <Input id="phone" type="tel" {...register('phone')} />
        </FormField>
        <FormField htmlFor="groupSize" label={t('request.groupSize')}>
          <Input
            id="groupSize"
            max={maxCapacity}
            min={1}
            type="number"
            {...register('groupSize')}
          />
        </FormField>
      </div>
      <FormField htmlFor="preferredDate" label={t('request.preferredDate')}>
        <Controller
          control={control}
          name="preferredDate"
          render={({ field }) => (
            <DatePicker
              onChange={(date) => field.onChange(date?.toISOString())}
              placeholder={t('request.selectDate')}
              value={field.value ? new Date(field.value) : undefined}
            />
          )}
        />
      </FormField>
      <FormField htmlFor="message" label={t('request.message')}>
        <Textarea id="message" maxLength={2000} rows={3} {...register('message')} />
      </FormField>
      <div className="flex gap-3 pt-2">
        <Button className="flex-1" onClick={onCancel} type="button" variant="outline">
          {t('request.cancel')}
        </Button>
        <Button className="flex-1" disabled={isSubmitting} type="submit">
          {isSubmitting ? t('request.sending') : t('request.submit')}
        </Button>
      </div>
    </form>
  )
}
