'use client'

import { useState } from 'react'
import { Car, Users } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { vehicleTypes } from '@/constants'

import { Button } from '@/components/ui'
import { BookingModal } from './BookingModal'

import type { Locale } from '@/i18n/config'
import type { Transfer } from '@/types'

type TransferCardProps = {
  transfer: Transfer
}

export const TransferCard = ({ transfer }: TransferCardProps) => {
  const locale = useLocale() as Locale
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const title = transfer[`title_${locale}`] || transfer.title_en
  const description = transfer[`description_${locale}`] || transfer.description_en
  const vehicleLabel = vehicleTypes[transfer.vehicle_type] || transfer.vehicle_type

  return (
    <>
      <div className="bg-card flex flex-col overflow-hidden rounded-lg md:flex-row">
        <div className="bg-muted relative h-48 w-full shrink-0 md:h-auto md:w-64">
          {transfer.media?.[0] ? (
            <Image
              alt={title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              src={transfer.media[0].url}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              <Car className="size-14" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground mb-2 text-xl font-bold">{title}</h3>
            <span className="text-accent text-lg font-bold">
              {t('transfers.priceFrom', { price: transfer.price_usd })}
            </span>
          </div>

          <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Car className="text-accent size-6" />
              {vehicleLabel}
            </span>
            <span className="flex items-center gap-2">
              <Users className="text-accent size-6" />
              {t('transfers.capacity', { count: transfer.capacity })}
            </span>
          </div>

          {description && (
            <p className="text-foreground/80 mb-4 line-clamp-5 text-sm whitespace-pre-line">
              {description}
            </p>
          )}

          <div className="mt-auto flex justify-end">
            <Button onClick={() => setIsModalOpen(true)}>{t('transfers.book')}</Button>
          </div>
        </div>
      </div>
      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} transfer={transfer} />}
    </>
  )
}
