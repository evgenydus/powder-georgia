import React from 'react'
import { TourCard } from './TourCard'
import type { Tour } from '@/types'

interface ToursProps {
  tours: Tour[]
}

export const Tours: React.FC<ToursProps> = ({ tours }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
