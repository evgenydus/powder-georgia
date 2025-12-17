import type { CheckedState } from '@radix-ui/react-checkbox'
import { useTranslations } from 'next-intl'

import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'

type ActiveSectionProps = {
  isActive: boolean
  onCheckedChange: (checked: CheckedState) => void
}

const ActiveSection = ({ isActive, onCheckedChange }: ActiveSectionProps) => {
  const t = useTranslations()

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 rounded-md border p-4">
        <Checkbox checked={isActive} id="is_active" onCheckedChange={onCheckedChange} />
        <div>
          <Label htmlFor="is_active">{t('admin.tourForm.active.label')}</Label>
          <p className="text-sm text-gray-500">{t('admin.tourForm.active.description')}</p>
        </div>
      </div>
    </section>
  )
}

export { ActiveSection }
