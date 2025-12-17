import { useTranslations } from 'next-intl'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const SlugSection = ({ errors, register }: SectionProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <FormField
        error={!!errors.slug}
        errorText={t('admin.tourForm.validation.required')}
        id="slug"
        label={t('admin.tourForm.slug.label')}
        placeholder="unique-tour-slug"
        required
        {...register('slug')}
      />
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { SlugSection }
