
'use client'

import { TourCard } from './TourCard'
import type { Tour } from '@/types'

interface TourGridProps {
  tours: Tour[]
}

export const TourGrid = ({ tours }: TourGridProps) => {
  if (tours.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">No tours available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
