import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const GroupSizeSection = ({ register }: RegisterOnlyProps) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Group Size</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField
        id="group_size_min"
        label="Min Group Size"
        type="number"
        {...register('group_size_min')}
      />
      <FormField
        id="group_size_max"
        label="Max Group Size"
        type="number"
        {...register('group_size_max')}
      />
    </div>
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { GroupSizeSection }
