import { useTranslations } from 'next-intl'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

const DescriptionsSection = ({ errors, register }: SectionProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.descriptions.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          error={!!errors.description_en}
          errorText={t('admin.tourForm.validation.required')}
          id="description_en"
          label={t('admin.tourForm.descriptions.labelEn')}
          required
          type="textarea"
          {...register('description_en')}
        />
        <FormField
          error={!!errors.description_ka}
          errorText={t('admin.tourForm.validation.required')}
          id="description_ka"
          label={t('admin.tourForm.descriptions.labelKa')}
          required
          type="textarea"
          {...register('description_ka')}
        />
        <FormField
          error={!!errors.description_ru}
          errorText={t('admin.tourForm.validation.required')}
          id="description_ru"
          label={t('admin.tourForm.descriptions.labelRu')}
          required
          type="textarea"
          {...register('description_ru')}
        />
      </div>
    </section>
  )
}

export { DescriptionsSection }
