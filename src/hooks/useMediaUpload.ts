'use client'

import { useCallback, useRef, useState } from 'react'

import { supabase } from '@/lib/supabase'
import type { Media, MediaEntityType } from '@/types'

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
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

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
