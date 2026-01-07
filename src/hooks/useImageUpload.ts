'use client'

import { useCallback, useRef, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Media, MediaEntityType } from '@/types'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

type UseImageUploadOptions = {
  entityType: MediaEntityType
  onError?: (message: string) => void
  onSuccess?: (media: Media[]) => void
}

const useImageUpload = ({ entityType, onError, onSuccess }: UseImageUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(
    async (files: FileList | null): Promise<Media[]> => {
      if (!files || files.length === 0) return []

      setIsUploading(true)
      const uploaded: Media[] = []

      for (const file of Array.from(files)) {
        if (file.size > MAX_FILE_SIZE) {
          onError?.(`File "${file.name}" exceeds 5MB limit`)
          continue
        }

        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          onError?.(`File "${file.name}" has unsupported type`)
          continue
        }

        const ext = file.name.split('.').pop() ?? 'bin'
        const fileName = `${crypto.randomUUID()}.${ext}`

        const { error: storageError } = await supabase.storage.from('media').upload(fileName, file)

        if (storageError) {
          onError?.(storageError.message)
          continue
        }

        const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName)

        const { data: record, error: dbError } = await supabase
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

        uploaded.push(record as Media)
      }

      if (uploaded.length > 0) onSuccess?.(uploaded)
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''

      return uploaded
    },
    [entityType, onError, onSuccess],
  )

  const openPicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return { inputRef, isUploading, openPicker, upload }
}

export { useImageUpload }
