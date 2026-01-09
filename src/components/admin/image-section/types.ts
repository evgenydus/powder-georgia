import type { Media, MediaEntityType } from '@/types'

export type ImageSectionProps = {
  entityType: MediaEntityType
  initialMedia?: Media[]
  limit?: number
  onChange?: (mediaIds: string[]) => void
}

export type ImagePreviewProps = {
  isCover?: boolean
  media: Media
  onRemove: () => void
}

export type MediaItemProps = {
  isDisabled?: boolean
  isSelected: boolean
  media: Media
  onToggle: () => void
}

export type MediaLibraryDialogProps = {
  entityType: MediaEntityType
  maxSelectable: number
  onOpenChange: (open: boolean) => void
  onSelect: (media: Media[]) => void
  open: boolean
  selectedIds: string[]
}
