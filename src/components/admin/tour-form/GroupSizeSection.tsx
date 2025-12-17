import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const GroupSizeSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.group.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          id="group_size_min"
          label={t('admin.tourForm.group.min')}
          type="number"
          {...register('group_size_min')}
        />
        <FormField
          id="group_size_max"
          label={t('admin.tourForm.group.max')}
          type="number"
          {...register('group_size_max')}
        />
      </div>
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { GroupSizeSection }
