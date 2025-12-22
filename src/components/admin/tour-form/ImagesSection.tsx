'use client'

import { useState } from 'react'
import { ImagePlus, Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { MediaPicker } from '@/components/admin/MediaPicker'
import { Button } from '@/components/ui/Button'
import { ImageCard } from './ImageCard'
import { useImagesManager } from './useImagesManager'

import type { MediaEntityType } from '@/types'

type ImagesSectionProps = {
  entityType: MediaEntityType
  images: string[]
  onImagesChange: (images: string[]) => void
}

const ImagesSection = ({ entityType, images, onImagesChange }: ImagesSectionProps) => {
  const t = useTranslations()
  const [pickerOpen, setPickerOpen] = useState(false)

  const {
    fileInputRef,
    handleMove,
    handleRemove,
    handleSelectFromLibrary,
    handleUpload,
    isUploading,
    openFilePicker,
  } = useImagesManager({ entityType, images, onImagesChange })

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.images.heading')}</h3>
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          type="file"
        />
        <Button
          disabled={isUploading}
          onClick={() => setPickerOpen(true)}
          type="button"
          variant="outline"
        >
          <ImagePlus className="size-4" />
          {t('admin.media.chooseFromLibrary')}
        </Button>
        <Button disabled={isUploading} onClick={openFilePicker} type="button" variant="outline">
          <Upload className="size-4" />
          {isUploading ? t('admin.tourForm.images.uploading') : t('admin.media.upload')}
        </Button>
      </div>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((url, index) => (
            <ImageCard
              key={url}
              index={index}
              isCover={index === 0}
              isFirst={index === 0}
              isLast={index === images.length - 1}
              onDelete={() => handleRemove(index)}
              onMoveDown={() => handleMove(index, 'down')}
              onMoveUp={() => handleMove(index, 'up')}
              url={url}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{t('admin.tourForm.images.noImages')}</p>
      )}
      <MediaPicker
        alreadySelected={images}
        currentEntityType={entityType}
        onOpenChange={setPickerOpen}
        onSelect={handleSelectFromLibrary}
        open={pickerOpen}
      />
    </section>
  )
}

export { ImagesSection }
