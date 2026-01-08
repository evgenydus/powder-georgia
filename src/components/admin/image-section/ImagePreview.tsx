'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/tooltip'
import type { ImagePreviewProps } from './types'

const ImagePreview = ({ isCover, media, onRemove }: ImagePreviewProps) => {
  const t = useTranslations()

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border">
      <Image
        alt={media.filename}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 33vw, 20vw"
        src={media.url}
      />
      {isCover && (
        <span className="bg-accent text-accent-foreground absolute top-2 left-2 rounded px-2 py-0.5 text-xs font-medium">
          {t('admin.media.cover')}
        </span>
      )}
      <Tooltip content={t('admin.media.remove')}>
        <Button
          className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onRemove}
          size="icon-sm"
          type="button"
          variant="destructive"
        >
          <X className="size-4" />
        </Button>
      </Tooltip>
    </div>
  )
}

export { ImagePreview }
