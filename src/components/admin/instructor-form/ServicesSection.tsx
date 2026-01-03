'use client'

import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const ServicesSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.services.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="services_en"
          label={t('admin.instructorForm.services.labelEn')}
          rows={3}
          type="textarea"
          {...register('services_en')}
        />
        <FormField
          id="services_ka"
          label={t('admin.instructorForm.services.labelKa')}
          rows={3}
          type="textarea"
          {...register('services_ka')}
        />
        <FormField
          id="services_ru"
          label={t('admin.instructorForm.services.labelRu')}
          rows={3}
          type="textarea"
          {...register('services_ru')}
        />
      </div>
    </section>
  )
}

export { ServicesSection }
