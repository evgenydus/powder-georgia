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
        <p className="text-muted-foreground">No tours available</p>
      </div>
    )
  }

  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
      {tours.map((tour) => (
        <div key={tour.id} className="w-72 shrink-0 snap-center md:w-auto">
          <TourCard tour={tour} />
        </div>
      ))}
    </div>
  )
}
