import { useTranslations } from 'next-intl'

import { TransferCard } from './TransferCard'

import type { Transfer } from '@/types'

type TransferGridProps = {
  transfers: Transfer[]
}

export const TransferGrid = ({ transfers }: TransferGridProps) => {
  const t = useTranslations()

  if (transfers.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{t('transfers.empty')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transfers.map((transfer) => (
        <TransferCard key={transfer.id} transfer={transfer} />
      ))}
    </div>
  )
}
