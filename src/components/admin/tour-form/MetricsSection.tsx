import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const MetricsSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.metrics.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="difficulty"
          label={t('admin.tourForm.metrics.difficulty')}
          max={5}
          min={1}
          type="number"
          {...register('difficulty')}
        />
        <FormField
          id="duration_hours"
          label={t('admin.tourForm.metrics.duration')}
          min={1}
          type="number"
          {...register('duration_hours')}
        />
        <FormField
          id="price_usd"
          label={t('admin.tourForm.metrics.price')}
          min={0}
          type="number"
          {...register('price_usd')}
        />
      </div>
    </section>
  )
}

export { MetricsSection }
