import React from 'react'
import { TransferCard } from './TransferCard'
import type { Transfer } from '@/types'

interface TransfersProps {
  transfers: Transfer[]
}

export const Transfers: React.FC<TransfersProps> = ({ transfers }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {transfers.map((transfer) => (
        <TransferCard key={transfer.id} transfer={transfer} />
      ))}
    </div>
  )
}
