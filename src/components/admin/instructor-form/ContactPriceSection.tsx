'use client'

import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const ContactPriceSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.contact.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="contact_email"
          label={t('admin.instructorForm.contact.email')}
          placeholder="instructor@example.com"
          {...register('contact_email')}
        />
        <FormField
          id="contact_phone"
          label={t('admin.instructorForm.contact.phone')}
          placeholder="+995 XXX XXX XXX"
          {...register('contact_phone')}
        />
        <FormField
          id="price_per_hour_usd"
          label={t('admin.instructorForm.contact.price')}
          min={0}
          placeholder={t('admin.instructorForm.contact.pricePlaceholder')}
          type="number"
          {...register('price_per_hour_usd')}
        />
      </div>
    </section>
  )
}

export { ContactPriceSection }
