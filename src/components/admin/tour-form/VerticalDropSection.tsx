import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const VerticalDropSection = ({ register }: RegisterOnlyProps) => (
  <section className="space-y-4">
    <FormField
      id="vertical_drop_m"
      label="Vertical Drop (m)"
      type="number"
      {...register('vertical_drop_m')}
    />
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { VerticalDropSection }
