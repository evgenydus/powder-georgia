import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui'
import { formatPrice } from '@/utils'
import { Users } from 'lucide-react'
import type { Transfer } from '@/types'

interface TransferCardProps {
  transfer: Transfer
}

export const TransferCard: React.FC<TransferCardProps> = ({ transfer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{transfer.title}</CardTitle>
        <CardDescription>{transfer.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">Capacity: {transfer.capacity} persons</span>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Available</Badge>
          <span className="font-semibold">{formatPrice(transfer.price)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
