'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Tour } from '@/types'

interface TourCardProps {
  tour: Tour
  locale: string
}

export function TourCard({ tour, locale }: TourCardProps) {
  const t = useTranslations()

  // Get localized title and description
  const title = tour[`title_${locale as 'en' | 'ka' | 'ru'}`] || tour.title_en
  const description =
    tour[`description_${locale as 'en' | 'ka' | 'ru'}`] || tour.description_en

  return (
    <Link href={`/${locale}/tours/${tour.slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-700">
          {tour.images && tour.images.length > 0 ? (
            <Image
              src={tour.images[0]}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              {t('tours.noImage')}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-300">{description}</p>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <span>⛰️</span>
              <span>
                {t('tours.difficulty')}: {tour.difficulty}/5
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>
                {tour.duration_hours}h
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>
                {tour.group_size_min}-{tour.group_size_max}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>
                {tour.vertical_drop_m}m
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <span className="text-sm font-semibold text-orange-400">
              ${tour.price_usd}
            </span>
            <span className="text-xs text-orange-400 font-medium">
              {t('tours.viewDetails')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
