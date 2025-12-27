'use client'

import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { MediaGrid } from '../MediaGrid'

import type { Media } from '@/types'

type MediaContentProps = {
  alreadySelected: string[]
  isLoading: boolean
  media: Media[]
  onToggle: (url: string) => void
  selected: string[]
}

export const MediaContent = ({
  alreadySelected,
  isLoading,
  media,
  onToggle,
  selected,
}: MediaContentProps) => {
  const t = useTranslations()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    )
  }

  if (media.length === 0) {
    return <p className="text-muted-foreground py-12 text-center">{t('admin.media.empty')}</p>
  }

  return (
    <MediaGrid
      alreadySelected={alreadySelected}
      media={media}
      onToggle={onToggle}
      selected={selected}
    />
  )
}
