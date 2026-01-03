'use client'

import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const SpecializationSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.specialization.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="specialization_en"
          label={t('admin.instructorForm.specialization.labelEn')}
          {...register('specialization_en')}
        />
        <FormField
          id="specialization_ka"
          label={t('admin.instructorForm.specialization.labelKa')}
          {...register('specialization_ka')}
        />
        <FormField
          id="specialization_ru"
          label={t('admin.instructorForm.specialization.labelRu')}
          {...register('specialization_ru')}
        />
      </div>
    </section>
  )
}

export { SpecializationSection }
