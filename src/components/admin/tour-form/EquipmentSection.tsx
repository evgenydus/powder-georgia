import { useTranslations } from 'next-intl'

import type { RegisterOnlyProps } from './types'
import { FormField } from '../FormField'

const EquipmentSection = ({ register }: RegisterOnlyProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.equipment.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          id="required_equipment_en"
          label={t('admin.tourForm.equipment.labelEn')}
          rows={3}
          type="textarea"
          {...register('required_equipment_en')}
        />
        <FormField
          id="required_equipment_ka"
          label={t('admin.tourForm.equipment.labelKa')}
          rows={3}
          type="textarea"
          {...register('required_equipment_ka')}
        />
        <FormField
          id="required_equipment_ru"
          label={t('admin.tourForm.equipment.labelRu')}
          rows={3}
          type="textarea"
          {...register('required_equipment_ru')}
        />
      </div>
    </section>
  )
}

export { EquipmentSection }
