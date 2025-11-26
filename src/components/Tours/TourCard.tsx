import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Rating } from '@/components/ui'
import { formatPrice, formatDuration } from '@/utils'
import type { Tour } from '@/types'

interface TourCardProps {
  tour: Tour
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/tours/${tour.id}`}>
      <Card className="h-full cursor-pointer transition-transform hover:scale-105">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{tour.title}</CardTitle>
            <Badge className={difficultyColors[tour.difficulty]}>
              {tour.difficulty}
            </Badge>
          </div>
          <CardDescription>{tour.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Rating current={4} max={5} size="sm" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Duration: {formatDuration(tour.duration)}</span>
            <span className="font-semibold">{formatPrice(tour.price)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
