import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const MetricsSection = ({ register }: RegisterOnlyProps) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Metrics</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <FormField
        id="difficulty"
        label="Difficulty (1-5)"
        type="number"
        {...register('difficulty')}
      />
      <FormField
        id="duration_hours"
        label="Duration (hours)"
        type="number"
        {...register('duration_hours')}
      />
      <FormField id="price_usd" label="Price (USD)" type="number" {...register('price_usd')} />
    </div>
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { MetricsSection }
