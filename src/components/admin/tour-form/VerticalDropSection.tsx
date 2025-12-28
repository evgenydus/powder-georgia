import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const VerticalDropSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <FormField
        id="vertical_drop_m"
        label={t('admin.tourForm.verticalDrop.label')}
        min={0}
        type="number"
        {...register('vertical_drop_m')}
      />
    </section>
  )
}

export { VerticalDropSection }
