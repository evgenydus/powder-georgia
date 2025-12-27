import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const AmenitiesSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.apartmentForm.amenities.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="amenities_en"
          label={t('admin.apartmentForm.amenities.labelEn')}
          type="textarea"
          {...register('amenities_en')}
        />
        <FormField
          id="amenities_ka"
          label={t('admin.apartmentForm.amenities.labelKa')}
          type="textarea"
          {...register('amenities_ka')}
        />
        <FormField
          id="amenities_ru"
          label={t('admin.apartmentForm.amenities.labelRu')}
          type="textarea"
          {...register('amenities_ru')}
        />
      </div>
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { AmenitiesSection }
