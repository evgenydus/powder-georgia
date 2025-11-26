import React from 'react'
import { cn } from '@/lib/utils'

interface ContentContainerProps {
  children: React.ReactNode
  className?: string
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
