'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'
import { useMediaUpload } from '@/hooks/useMediaUpload'

import type { MediaEntityType } from '@/types'

type UseImagesManagerOptions = {
  entityType: MediaEntityType
  images: string[]
  maxImages?: number
  onImagesChange: (images: string[]) => void
}

const useImagesManager = ({
  entityType,
  images,
  maxImages = 10,
  onImagesChange,
}: UseImagesManagerOptions) => {
  const t = useTranslations()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const remaining = maxImages - images.length
  const isAtLimit = remaining <= 0

  const { fileInputRef, isUploading, openFilePicker, upload } = useMediaUpload({
    entityType,
    onError: (msg) => toastError(t('admin.tourForm.images.uploadError'), { message: msg }),
    onSuccess: () => toastSuccess(t('admin.tourForm.images.uploadSuccess')),
  })

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || isAtLimit) return

      const filesToUpload = Array.from(files).slice(0, remaining)

      toastInfo(t('admin.tourForm.images.uploading'))
      const uploaded = await upload(
        Object.assign(filesToUpload, {
          item: (i: number) => filesToUpload[i],
        }) as unknown as FileList,
      )

      if (uploaded.length > 0) {
        onImagesChange([...images, ...uploaded.map((m) => m.url)])
      }
    },
    [images, isAtLimit, onImagesChange, remaining, t, toastInfo, upload],
  )

  const handleSelectFromLibrary = useCallback(
    (urls: string[]) => {
      const urlsToAdd = urls.slice(0, remaining)

      onImagesChange([...images, ...urlsToAdd])
    },
    [images, onImagesChange, remaining],
  )

  const handleRemove = useCallback(
    (index: number) => {
      onImagesChange(images.filter((_, i) => i !== index))
    },
    [images, onImagesChange],
  )

  const handleMove = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const newImages = [...images]
      const swapIdx = direction === 'up' ? index - 1 : index + 1

      ;[newImages[index], newImages[swapIdx]] = [newImages[swapIdx], newImages[index]]
      onImagesChange(newImages)
    },
    [images, onImagesChange],
  )

  return {
    fileInputRef,
    handleMove,
    handleRemove,
    handleSelectFromLibrary,
    handleUpload,
    isAtLimit,
    isUploading,
    openFilePicker,
  }
}

export { useImagesManager }
