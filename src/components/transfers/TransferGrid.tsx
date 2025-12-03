'use client'

import { TransferCard } from './TransferCard'
import type { Transfer } from '@/types'

interface TransferGridProps {
  transfers: Transfer[]
  locale: string
}

export function TransferGrid({ transfers, locale }: TransferGridProps) {
  if (transfers.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">No transfers available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {transfers.map((transfer) => (
        <TransferCard key={transfer.id} transfer={transfer} locale={locale} />
      ))}
    </div>
  )
}
