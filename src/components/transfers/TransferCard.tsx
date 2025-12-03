'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Transfer } from '@/types'

interface TransferCardProps {
  transfer: Transfer
  locale: string
}

export function TransferCard({ transfer, locale }: TransferCardProps) {
  const t = useTranslations()

  // Get localized title and route
  const title = transfer[`title_${locale as 'en' | 'ka' | 'ru'}`] || transfer.title_en
  const route = transfer[`route_${locale as 'en' | 'ka' | 'ru'}`] || transfer.route_en

  return (
    <Link href={`/${locale}/transfers/${transfer.slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-700">
          <Image
            src={transfer.image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>

          {/* Route */}
          <p className="mb-4 text-sm text-gray-300">{route}</p>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <span>🚗</span>
              <span>{transfer.vehicle_type}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{t('transfers.capacity')}: {transfer.capacity}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <span className="text-sm font-semibold text-orange-400">
              ${transfer.price_usd}
            </span>
            <span className="text-xs text-orange-400 font-medium">
              {t('transfers.inquire')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
