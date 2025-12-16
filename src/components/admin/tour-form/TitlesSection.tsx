import type { SectionProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const TitlesSection = ({ errors, register }: SectionProps) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Titles</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <FormField
        error={!!errors.title_en}
        id="title_en"
        label="Title (EN)"
        required
        {...register('title_en')}
      />
      <FormField
        error={!!errors.title_ka}
        id="title_ka"
        label="Title (KA)"
        required
        {...register('title_ka')}
      />
      <FormField
        error={!!errors.title_ru}
        id="title_ru"
        label="Title (RU)"
        required
        {...register('title_ru')}
      />
    </div>
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { TitlesSection }
