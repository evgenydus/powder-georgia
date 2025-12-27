import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const CapacityPriceSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.apartmentForm.metrics.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          id="capacity"
          label={t('admin.apartmentForm.capacity.label')}
          min={1}
          type="number"
          {...register('capacity')}
        />
        <FormField
          id="price_per_night_usd"
          label={t('admin.apartmentForm.price.label')}
          min={0}
          type="number"
          {...register('price_per_night_usd')}
        />
      </div>
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { CapacityPriceSection }
