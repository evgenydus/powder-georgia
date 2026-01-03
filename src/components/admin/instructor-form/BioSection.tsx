'use client'

import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const BioSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.bio.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="bio_en"
          label={t('admin.instructorForm.bio.labelEn')}
          rows={4}
          type="textarea"
          {...register('bio_en')}
        />
        <FormField
          id="bio_ka"
          label={t('admin.instructorForm.bio.labelKa')}
          rows={4}
          type="textarea"
          {...register('bio_ka')}
        />
        <FormField
          id="bio_ru"
          label={t('admin.instructorForm.bio.labelRu')}
          rows={4}
          type="textarea"
          {...register('bio_ru')}
        />
      </div>
    </section>
  )
}

export { BioSection }
