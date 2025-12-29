import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const PriceSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.transferForm.price.heading')}</h3>
      <div className="max-w-xs">
        <FormField
          id="price_usd"
          label={t('admin.transferForm.price.label')}
          min={0}
          required
          type="number"
          {...register('price_usd')}
        />
      </div>
    </section>
  )
}

export { PriceSection }
