import type { SectionProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const DescriptionsSection = ({ errors, register }: SectionProps) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Descriptions</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <FormField
        error={!!errors.description_en}
        id="description_en"
        label="Description (EN)"
        required
        type="textarea"
        {...register('description_en')}
      />
      <FormField
        error={!!errors.description_ka}
        id="description_ka"
        label="Description (KA)"
        required
        type="textarea"
        {...register('description_ka')}
      />
      <FormField
        error={!!errors.description_ru}
        id="description_ru"
        label="Description (RU)"
        required
        type="textarea"
        {...register('description_ru')}
      />
    </div>
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { DescriptionsSection }
