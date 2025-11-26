import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
} as const

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn('animate-spin', sizeMap[size], className)} />
    </div>
  )
}
