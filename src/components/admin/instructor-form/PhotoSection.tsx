'use client'

import { useState } from 'react'
import { ImagePlus, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'
import { useMediaUpload } from '@/hooks/useMediaUpload'

import { MediaPicker } from '@/components/admin/MediaPicker'
import { Button } from '@/components/ui/Button'
import type { PhotoSectionProps } from './types'

const PhotoSection = ({ photoUrl, setValue }: PhotoSectionProps) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const [pickerOpen, setPickerOpen] = useState(false)

  const { fileInputRef, isUploading, openFilePicker, upload } = useMediaUpload({
    entityType: 'instructor',
    onError: (msg) => toastError(t('admin.instructorForm.photo.uploadError'), { message: msg }),
    onSuccess: (media) => {
      setValue('photo_url', media[0].url)
      toastSuccess(t('admin.instructorForm.photo.uploadSuccess'))
    },
  })

  const handleSelectFromLibrary = (urls: string[]) => {
    if (urls.length > 0) setValue('photo_url', urls[0])
    setPickerOpen(false)
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.photo.heading')}</h3>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => upload(e.target.files)}
          type="file"
        />
        <Button
          disabled={isUploading || !!photoUrl}
          onClick={() => setPickerOpen(true)}
          type="button"
          variant="outline"
        >
          <ImagePlus className="size-4" />
          {t('admin.media.chooseFromLibrary')}
        </Button>
        <Button
          disabled={isUploading || !!photoUrl}
          onClick={openFilePicker}
          type="button"
          variant="outline"
        >
          <Upload className="size-4" />
          {isUploading ? t('admin.instructorForm.photo.uploading') : t('admin.media.upload')}
        </Button>
      </div>
      {photoUrl ? (
        <div className="relative w-fit">
          <Image
            alt="Instructor"
            className="rounded-lg object-cover"
            height={200}
            src={photoUrl}
            width={200}
          />
          <Button
            className="absolute top-2 right-2"
            onClick={() => setValue('photo_url', '')}
            size="icon-sm"
            type="button"
            variant="destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{t('admin.instructorForm.photo.noPhoto')}</p>
      )}
      <MediaPicker
        alreadySelected={photoUrl ? [photoUrl] : []}
        currentEntityType="instructor"
        onOpenChange={setPickerOpen}
        onSelect={handleSelectFromLibrary}
        open={pickerOpen}
      />
    </section>
  )
}

export { PhotoSection }
