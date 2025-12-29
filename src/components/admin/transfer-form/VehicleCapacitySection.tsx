import { useTranslations } from 'next-intl'

import { vehicleTypes } from '@/constants'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

const VehicleCapacitySection = ({ errors, register }: SectionProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.transferForm.vehicle.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="vehicle_type">
            {t('admin.transferForm.vehicle.type')} <span className="text-red-500">*</span>
          </label>
          <select
            className="bg-card border-border w-full rounded-md border px-3 py-2"
            id="vehicle_type"
            {...register('vehicle_type')}
          >
            {Object.entries(vehicleTypes).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.vehicle_type && (
            <p className="text-sm text-red-500">{t('admin.transferForm.validation.required')}</p>
          )}
        </div>
        <FormField
          error={!!errors.capacity}
          errorText={t('admin.transferForm.validation.required')}
          id="capacity"
          label={t('admin.transferForm.vehicle.capacity')}
          min={1}
          required
          type="number"
          {...register('capacity')}
        />
      </div>
    </section>
  )
}

export { VehicleCapacitySection }
