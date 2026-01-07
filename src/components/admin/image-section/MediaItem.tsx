'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'

import type { MediaItemProps } from './types'

import { cn } from '@/lib/utils'

const MediaItem = ({ isDisabled, isSelected, media, onToggle }: MediaItemProps) => {
  const handleClick = () => {
    if (!isDisabled || isSelected) {
      onToggle()
    }
  }

  return (
    <button
      className={cn(
        'relative aspect-square overflow-hidden rounded-lg border-2 transition-all',
        isSelected && 'border-accent ring-accent ring-2',
        !isSelected && 'hover:border-muted-foreground/50 border-transparent',
        isDisabled && !isSelected && 'cursor-not-allowed opacity-50',
      )}
      disabled={isDisabled && !isSelected}
      onClick={handleClick}
      type="button"
    >
      <Image
        alt={media.filename}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 25vw, 16vw"
        src={media.url}
      />
      {isSelected && (
        <div className="bg-accent text-accent-foreground absolute top-2 right-2 flex size-6 items-center justify-center rounded-full">
          <Check className="size-4" />
        </div>
      )}
    </button>
  )
}

export { MediaItem }
