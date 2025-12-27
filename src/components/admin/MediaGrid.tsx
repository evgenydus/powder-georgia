'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { Media } from '@/types'

type MediaGridProps = {
  alreadySelected: string[]
  media: Media[]
  onToggle: (url: string) => void
  selected: string[]
}

const MediaGrid = ({ alreadySelected, media, onToggle, selected }: MediaGridProps) => (
  <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
    {media.map((item) => {
      const isDisabled = alreadySelected.includes(item.url)
      const isSelected = selected.includes(item.url)

      return (
        <button
          key={item.id}
          className={cn(
            'relative aspect-square overflow-hidden rounded-lg border-2 transition-all',
            isDisabled ? 'cursor-not-allowed opacity-40' : 'hover:border-primary cursor-pointer',
            isSelected ? 'border-primary ring-primary ring-2' : 'border-muted',
          )}
          disabled={isDisabled}
          onClick={() => onToggle(item.url)}
          type="button"
        >
          <Image alt={item.filename} className="object-cover" fill sizes="150px" src={item.url} />
          {isSelected && (
            <div className="bg-primary/50 absolute inset-0 flex items-center justify-center">
              <Check className="text-primary size-8" />
            </div>
          )}
        </button>
      )
    })}
  </div>
)

export { MediaGrid }
