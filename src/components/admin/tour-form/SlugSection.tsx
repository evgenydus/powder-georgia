import type { SectionProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const SlugSection = ({ errors, register }: SectionProps) => (
  <section className="space-y-4">
    <FormField
      error={!!errors.slug}
      id="slug"
      label="Slug"
      placeholder="unique-tour-slug"
      required
      {...register('slug')}
    />
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { SlugSection }
