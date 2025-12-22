'use client'

import { ChevronDown, ChevronUp, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

type ImageCardProps = {
  index: number
  isCover: boolean
  isFirst: boolean
  isLast: boolean
  onDelete: () => void
  onMoveDown: () => void
  onMoveUp: () => void
  url: string
}

const ImageCard = ({
  index,
  isCover,
  isFirst,
  isLast,
  onDelete,
  onMoveDown,
  onMoveUp,
  url,
}: ImageCardProps) => {
  const t = useTranslations()

  return (
    <div className="group bg-muted relative aspect-video overflow-hidden rounded-lg border">
      <Image
        alt={`Tour image ${index + 1}`}
        className="object-cover"
        fill
        sizes="300px"
        src={url}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          disabled={isFirst}
          onClick={onMoveUp}
          size="icon-sm"
          type="button"
          variant="secondary"
        >
          <ChevronUp className="size-4" />
        </Button>
        <Button
          disabled={isLast}
          onClick={onMoveDown}
          size="icon-sm"
          type="button"
          variant="secondary"
        >
          <ChevronDown className="size-4" />
        </Button>
        <Button onClick={onDelete} size="icon-sm" type="button" variant="destructive">
          <X className="size-4" />
        </Button>
      </div>
      {isCover && (
        <span className="bg-primary text-primary-foreground absolute top-2 left-2 rounded px-2 py-0.5 text-xs">
          {t('admin.tourForm.images.cover')}
        </span>
      )}
    </div>
  )
}

export { ImageCard }
