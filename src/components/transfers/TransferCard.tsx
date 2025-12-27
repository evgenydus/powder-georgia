'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'
import type { Transfer } from '@/types'

interface TransferCardProps {
  transfer: Transfer
}

export const TransferCard = ({ transfer }: TransferCardProps) => {
  const locale = useLocale()
  const t = useTranslations()

  const title = transfer[`title_${locale as 'en' | 'ka' | 'ru'}`] || transfer.title_en
  const route = transfer[`route_${locale as 'en' | 'ka' | 'ru'}`] || transfer.route_en

  return (
    <Link href={`${routes.transfers}/${transfer.slug}`}>
      <div className="group bg-card cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        <div className="bg-muted relative h-48 w-full overflow-hidden">
          <Image
            alt={title}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            fill
            src={transfer.image_url}
          />
        </div>
        <div className="p-4">
          <h3 className="text-foreground mb-2 text-lg font-bold">{title}</h3>
          <p className="text-foreground/80 mb-4 text-sm">{route}</p>
          <div className="text-muted-foreground mb-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span>🚗</span>
              <span>{transfer.vehicle_type}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>
                {t('transfers.capacity')}: {transfer.capacity}
              </span>
            </div>
          </div>
          <div className="border-border flex items-center justify-between border-t pt-3">
            <span className="text-accent text-sm font-semibold">${transfer.price_usd}</span>
            <span className="text-accent text-xs font-medium">{t('transfers.inquire')} →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
