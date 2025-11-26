import React from 'react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

type IconName = keyof typeof Icons

interface IconProps {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
  '2xl': 'w-8 h-8',
} as const

export const Icon: React.FC<IconProps> = ({ name, size = 'md', className }) => {
  const IconComponent = Icons[name] as React.ComponentType<{ className?: string }>

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`)
    return null
  }

  return <IconComponent className={cn(sizeMap[size], className)} />
}
