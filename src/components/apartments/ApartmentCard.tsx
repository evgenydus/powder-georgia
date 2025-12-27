'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'
import type { Apartment } from '@/types'

interface ApartmentCardProps {
  apartment: Apartment
}

export const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  const locale = useLocale()
  const t = useTranslations()

  const title = apartment[`title_${locale as 'en' | 'ka' | 'ru'}`] || apartment.title_en

  return (
    <Link href={`${routes.apartments}/${apartment.slug}`}>
      <div className="group bg-card cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        <div className="bg-muted relative h-48 w-full overflow-hidden">
          {apartment.images && apartment.images.length > 0 ? (
            <Image
              alt={title}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              fill
              src={apartment.images[0]}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              {t('apartments.noImage')}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground mb-2 text-lg font-bold">{title}</h3>
          <div className="text-muted-foreground mb-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>
                {t('apartments.capacity')}: {apartment.capacity}
              </span>
            </div>
          </div>
          <div className="border-border flex items-center justify-between border-t pt-3">
            <span className="text-accent text-sm font-semibold">
              ${apartment.price_per_night_usd}/night
            </span>
            <span className="text-accent text-xs font-medium">{t('apartments.viewDetails')} →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
