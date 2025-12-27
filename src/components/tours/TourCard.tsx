'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'
import type { Tour } from '@/types'

interface TourCardProps {
  tour: Tour
}

export const TourCard = ({ tour }: TourCardProps) => {
  const locale = useLocale()
  const t = useTranslations()

  const title = tour[`title_${locale as 'en' | 'ka' | 'ru'}`] || tour.title_en
  const description = tour[`description_${locale as 'en' | 'ka' | 'ru'}`] || tour.description_en

  return (
    <Link className="block h-full" href={`${routes.tours}/${tour.slug}`}>
      <div className="group bg-card flex h-full cursor-pointer flex-col overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        <div className="bg-muted relative h-48 w-full shrink-0 overflow-hidden">
          {tour.images && tour.images.length > 0 ? (
            <Image
              alt={title}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              fill
              src={tour.images[0]}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              {t('tours.noImage')}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-foreground mb-2 line-clamp-1 text-lg font-bold">{title}</h3>
          <p className="text-foreground/80 mb-4 line-clamp-2 text-sm">{description}</p>
          <div className="text-muted-foreground mb-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span>⛰️</span>
              <span>
                {t('tours.difficulty')}: {tour.difficulty}/5
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{tour.duration_hours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>
                {tour.group_size_min}-{tour.group_size_max}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{tour.vertical_drop_m}m</span>
            </div>
          </div>
          <div className="border-border mt-auto flex items-center justify-between border-t pt-3">
            <span className="text-accent text-sm font-semibold">${tour.price_usd}</span>
            <span className="text-accent text-xs font-medium">{t('tours.viewDetails')} →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
