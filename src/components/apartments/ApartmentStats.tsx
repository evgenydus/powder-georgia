import { Bath, BedDouble, Ruler, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { Apartment } from '@/types'

type ApartmentStatsProps = {
  apartment: Pick<Apartment, 'area_sqm' | 'bathrooms' | 'bedrooms' | 'capacity'>
  size?: 'sm' | 'lg'
}

const ApartmentStats = ({ apartment, size = 'sm' }: ApartmentStatsProps) => {
  const t = useTranslations()
  const isLarge = size === 'lg'
  const iconClass = isLarge ? 'size-6' : 'size-4'
  const textClass = isLarge ? 'text-base' : 'text-xs'

  const stats = [
    { icon: Users, label: t('apartments.capacity'), value: apartment.capacity },
    { icon: BedDouble, label: t('apartments.bedrooms'), value: apartment.bedrooms },
    { icon: Bath, label: t('apartments.bathrooms'), value: apartment.bathrooms },
    ...(apartment.area_sqm
      ? [{ icon: Ruler, label: t('apartments.area'), value: `${apartment.area_sqm} m²` }]
      : []),
  ]

  return (
    <div className={`grid grid-cols-2 gap-2 ${isLarge ? 'gap-8 md:grid-cols-4' : ''}`}>
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className={`text-accent ${iconClass}`} />
          <div>
            {isLarge ? (
              <>
                <p className="font-bold">{label}</p>
                <p>{value}</p>
              </>
            ) : (
              <span className={`text-muted-foreground ${textClass}`}>
                {label}: {value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export { ApartmentStats }
