import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  current: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const

export const Rating: React.FC<RatingProps> = ({
  current,
  max = 5,
  size = 'md',
  className,
}) => {
  const grades = Array.from({ length: max }, (_, index) => index + 1)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {grades.map((value) => (
        <Star
          key={value}
          className={cn(
            sizeMap[size],
            value <= current
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300',
          )}
        />
      ))}
    </div>
  )
}
