import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const MetricsSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.metrics.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="difficulty"
          label={t('admin.tourForm.metrics.difficulty')}
          type="number"
          {...register('difficulty')}
        />
        <FormField
          id="duration_hours"
          label={t('admin.tourForm.metrics.duration')}
          type="number"
          {...register('duration_hours')}
        />
        <FormField
          id="price_usd"
          label={t('admin.tourForm.metrics.price')}
          type="number"
          {...register('price_usd')}
        />
      </div>
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { MetricsSection }
