'use client'

import { useCallback, useRef, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Media, MediaEntityType } from '@/types'

const maxFileSize = 5 * 1024 * 1024 // 5MB
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

type UseMediaUploadOptions = {
  entityType?: MediaEntityType | null
  onError?: (message: string) => void
  onSuccess?: (media: Media[]) => void
}

const useMediaUpload = ({ entityType = null, onError, onSuccess }: UseMediaUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return []

      setIsUploading(true)
      const uploaded: Media[] = []

      for (const file of Array.from(files)) {
        if (file.size > maxFileSize) {
          onError?.(`File "${file.name}" exceeds maximum size of 5MB`)
          continue
        }

        if (!allowedMimeTypes.includes(file.type)) {
          onError?.(`File "${file.name}" has unsupported type: ${file.type}`)
          continue
        }

        const dotIndex = file.name.lastIndexOf('.')
        const fileExt = dotIndex > 0 ? file.name.slice(dotIndex + 1) : 'bin'
        const fileName = `${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file)

        if (uploadError) {
          onError?.(uploadError.message)
          continue
        }

        const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName)

        const { data: mediaRecord, error: dbError } = await supabase
          .from('media')
          .insert({
            entity_type: entityType,
            filename: file.name,
            mime_type: file.type,
            size_bytes: file.size,
            url: urlData.publicUrl,
          })
          .select()
          .single()

        if (dbError) {
          await supabase.storage.from('media').remove([fileName])
          onError?.(dbError.message)
          continue
        }

        uploaded.push(mediaRecord)
      }

      if (uploaded.length > 0) onSuccess?.(uploaded)
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''

      return uploaded
    },
    [entityType, onError, onSuccess],
  )

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return { fileInputRef, isUploading, openFilePicker, upload }
}

export { useMediaUpload }
