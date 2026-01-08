'use client'

import { useTranslations } from 'next-intl'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Select } from '@/components/contact/FormPrimitives'
import { FormField } from '@/components/ui'
import type { LessonFormData } from './lessonSchema'
import { lessonTypes, skillLevels } from './lessonSchema'

type LessonTypeFieldsProps = {
  errors: FieldErrors<LessonFormData>
  register: UseFormRegister<LessonFormData>
}

export const LessonTypeFields = ({ errors, register }: LessonTypeFieldsProps) => {
  const t = useTranslations()

  return (
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
  )
}
