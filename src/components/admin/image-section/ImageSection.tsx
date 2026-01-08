'use client'

import { useEffect, useState } from 'react'
import { ImagePlus, Library } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useImageUpload } from '@/hooks/useImageUpload'

import { Button } from '@/components/ui/Button'
import { ImagePreview } from './ImagePreview'
import { MediaLibraryDialog } from './MediaLibraryDialog'
import type { ImageSectionProps } from './types'

import type { Media } from '@/types'

const DEFAULT_LIMIT = 10

const ImageSection = ({
  entityType,
  initialMedia = [],
  limit = DEFAULT_LIMIT,
  onChange,
}: ImageSectionProps) => {
  const t = useTranslations()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [media, setMedia] = useState<Media[]>(initialMedia)

  // Sync media IDs to parent via useEffect (not during render)
  useEffect(() => {
    onChange?.(media.map((m) => m.id))
  }, [media, onChange])

  const { inputRef, isUploading, openPicker, upload } = useImageUpload({
    entityType,
    onSuccess: (uploaded) => {
      setMedia((prev) => [...prev, ...uploaded].slice(0, limit))
    },
  })

  const handleRemove = (mediaId: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== mediaId))
  }

  const handleLibrarySelect = (selected: Media[]) => {
    setMedia((prev) => [...prev, ...selected].slice(0, limit))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void upload(e.target.files)
  }

  const canAdd = media.length < limit
  const maxSelectable = limit - media.length
  const currentIds = media.map((m) => m.id)

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.media.heading')}</h3>
      {media.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {media.map((item, index) => (
            <ImagePreview
              key={item.id}
              isCover={index === 0 && limit > 1}
              media={item}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{t('admin.media.empty')}</p>
      )}
      {canAdd ? (
        <div className="flex gap-2">
          <Button disabled={isUploading} onClick={openPicker} type="button" variant="outline">
            <ImagePlus className="mr-2 size-4" />
            {isUploading ? t('admin.media.uploading') : t('admin.media.upload')}
          </Button>
          <Button onClick={() => setDialogOpen(true)} type="button" variant="outline">
            <Library className="mr-2 size-4" />
            {t('admin.media.chooseFromLibrary')}
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{t('admin.media.maxReached', { limit })}</p>
      )}
      <p className="text-muted-foreground text-xs">{t('admin.media.hint')}</p>
      <input
        ref={inputRef}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        multiple={limit > 1}
        onChange={handleFileChange}
        type="file"
      />
      <MediaLibraryDialog
        entityType={entityType}
        maxSelectable={maxSelectable}
        onOpenChange={setDialogOpen}
        onSelect={handleLibrarySelect}
        open={dialogOpen}
        selectedIds={currentIds}
      />
    </section>
  )
}

export { ImageSection }
