import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const DescriptionsSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.transferForm.descriptions.heading')}</h3>
      <p className="text-muted-foreground text-sm">{t('admin.transferForm.descriptions.hint')}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="description_en"
          label={t('admin.transferForm.descriptions.labelEn')}
          type="textarea"
          {...register('description_en')}
        />
        <FormField
          id="description_ka"
          label={t('admin.transferForm.descriptions.labelKa')}
          type="textarea"
          {...register('description_ka')}
        />
        <FormField
          id="description_ru"
          label={t('admin.transferForm.descriptions.labelRu')}
          type="textarea"
          {...register('description_ru')}
        />
      </div>
    </section>
  )
}

export { DescriptionsSection }
