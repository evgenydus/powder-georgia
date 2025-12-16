import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

/* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
const EquipmentSection = ({ register }: RegisterOnlyProps) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Required Equipment</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <FormField
        id="required_equipment_en"
        label="Equipment (EN)"
        rows={3}
        type="textarea"
        {...register('required_equipment_en')}
      />
      <FormField
        id="required_equipment_ka"
        label="Equipment (KA)"
        rows={3}
        type="textarea"
        {...register('required_equipment_ka')}
      />
      <FormField
        id="required_equipment_ru"
        label="Equipment (RU)"
        rows={3}
        type="textarea"
        {...register('required_equipment_ru')}
      />
    </div>
  </section>
)
/* eslint-enable react/jsx-props-no-spreading */

export { EquipmentSection }
