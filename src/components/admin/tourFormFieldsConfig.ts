import type { FieldPath } from 'react-hook-form'

import type { TourFormValues } from './tourFormSchema'

type FieldConfig = {
  label: string
  name: FieldPath<TourFormValues>
  type?: 'number'
}

const titleFields: FieldConfig[] = [
  { label: 'Title (EN)', name: 'title_en' },
  { label: 'Title (KA)', name: 'title_ka' },
  { label: 'Title (RU)', name: 'title_ru' },
]

const descriptionFields: FieldConfig[] = [
  { label: 'Description (EN)', name: 'description_en' },
  { label: 'Description (KA)', name: 'description_ka' },
  { label: 'Description (RU)', name: 'description_ru' },
]

const metricsFields: FieldConfig[] = [
  { label: 'Difficulty', name: 'difficulty', type: 'number' },
  { label: 'Duration (hours)', name: 'duration_hours', type: 'number' },
  { label: 'Price (USD)', name: 'price_usd', type: 'number' },
]

const groupFields: FieldConfig[] = [
  { label: 'Min Group Size', name: 'group_size_min', type: 'number' },
  { label: 'Max Group Size', name: 'group_size_max', type: 'number' },
]

const equipmentFields: FieldConfig[] = [
  { label: 'Required Equipment (EN)', name: 'required_equipment_en' },
  { label: 'Required Equipment (KA)', name: 'required_equipment_ka' },
  { label: 'Required Equipment (RU)', name: 'required_equipment_ru' },
]

const verticalField: FieldConfig = {
  label: 'Vertical Drop (m)',
  name: 'vertical_drop_m',
  type: 'number',
}

export {
  descriptionFields,
  equipmentFields,
  groupFields,
  metricsFields,
  titleFields,
  verticalField,
}
export type { FieldConfig }
