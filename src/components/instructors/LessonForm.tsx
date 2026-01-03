'use client'

import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { Select } from '@/components/contact/FormPrimitives'
import { Button, DatePicker, FormField, Input, Textarea } from '@/components/ui'
import { lessonTypes, skillLevels } from './lessonSchema'
import { useLessonForm } from './useLessonForm'

type LessonFormProps = {
  instructorId: string
  onCancel: () => void
  onDirtyChange?: (isDirty: boolean) => void
  onSuccess: () => void
}

export const LessonForm = ({
  instructorId,
  onCancel,
  onDirtyChange,
  onSuccess,
}: LessonFormProps) => {
  const t = useTranslations()
  const { form, isSubmitting, onSubmit } = useLessonForm({ instructorId, onDirtyChange, onSuccess })
  const {
    control,
    formState: { errors },
    register,
  } = form

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input type="hidden" {...register('instructorId')} />
      <FormField
        error={errors.name?.message}
        htmlFor="name"
        label={t('lessonRequest.name')}
        required
      >
        <Input id="name" {...register('name')} />
      </FormField>
      <FormField
        error={errors.email?.message}
        htmlFor="email"
        label={t('lessonRequest.email')}
        required
      >
        <Input id="email" type="email" {...register('email')} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          error={errors.lessonType?.message}
          htmlFor="lessonType"
          label={t('lessonRequest.lessonType')}
          required
        >
          <Select id="lessonType" {...register('lessonType')}>
            {lessonTypes.map((type) => (
              <option key={type} value={type}>
                {t(`contact.fields.lessonTypes.${type}`)}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          error={errors.skillLevel?.message}
          htmlFor="skillLevel"
          label={t('lessonRequest.skillLevel')}
          required
        >
          <Select id="skillLevel" {...register('skillLevel')}>
            {skillLevels.map((level) => (
              <option key={level} value={level}>
                {t(`contact.fields.skillLevels.${level}`)}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField htmlFor="phone" label={t('lessonRequest.phone')}>
          <Input id="phone" type="tel" {...register('phone')} />
        </FormField>
        <FormField htmlFor="groupSize" label={t('lessonRequest.groupSize')}>
          <Input id="groupSize" min={1} type="number" {...register('groupSize')} />
        </FormField>
      </div>
      <FormField htmlFor="preferredDate" label={t('lessonRequest.preferredDate')}>
        <Controller
          control={control}
          name="preferredDate"
          render={({ field }) => (
            <DatePicker
              onChange={(date) => field.onChange(date?.toISOString())}
              placeholder={t('lessonRequest.selectDate')}
              value={field.value ? new Date(field.value) : undefined}
            />
          )}
        />
      </FormField>
      <FormField htmlFor="message" label={t('lessonRequest.message')}>
        <Textarea id="message" maxLength={2000} rows={3} {...register('message')} />
      </FormField>
      <div className="flex gap-3 pt-2">
        <Button className="flex-1" onClick={onCancel} type="button" variant="outline">
          {t('lessonRequest.cancel')}
        </Button>
        <Button className="flex-1" disabled={isSubmitting} type="submit">
          {isSubmitting ? t('lessonRequest.sending') : t('lessonRequest.submit')}
        </Button>
      </div>
    </form>
  )
}
