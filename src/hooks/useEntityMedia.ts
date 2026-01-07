'use client'

import { useCallback, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Media, MediaEntityType } from '@/types'

type UseEntityMediaOptions = {
  entityId?: string
  entityType: MediaEntityType
}

const useEntityMedia = ({ entityId, entityType }: UseEntityMediaOptions) => {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMedia = useCallback(async () => {
    if (!entityId) {
      setMedia([])

      return
    }

    setIsLoading(true)

    const { data, error } = await supabase
      .from('entity_media')
      .select('media_id, position, media:media_id(*)')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('position', { ascending: true })

    if (error) {
      console.error('Failed to fetch entity media:', error.message)
      setMedia([])
    } else {
      const mediaList = data?.map((item) => item.media as unknown as Media).filter(Boolean) ?? []

      setMedia(mediaList)
    }

    setIsLoading(false)
  }, [entityId, entityType])

  useEffect(() => {
    void fetchMedia()
  }, [fetchMedia])

  const addMedia = useCallback(
    async (mediaIds: string[]) => {
      if (!entityId || mediaIds.length === 0) return

      const currentMax = media.length
      const records = mediaIds.map((mediaId, index) => ({
        entity_id: entityId,
        entity_type: entityType,
        media_id: mediaId,
        position: currentMax + index,
      }))

      const { error } = await supabase.from('entity_media').insert(records)

      if (error) {
        console.error('Failed to add media:', error.message)

        return
      }

      await fetchMedia()
    },
    [entityId, entityType, media.length, fetchMedia],
  )

  const removeMedia = useCallback(
    async (mediaId: string) => {
      if (!entityId) return

      const { error } = await supabase
        .from('entity_media')
        .delete()
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
        .eq('media_id', mediaId)

      if (error) {
        console.error('Failed to remove media:', error.message)

        return
      }

      await fetchMedia()
    },
    [entityId, entityType, fetchMedia],
  )

  const syncMedia = useCallback(
    async (mediaIds: string[], targetEntityId?: string) => {
      const id = targetEntityId ?? entityId

      if (!id) return

      // Delete existing
      await supabase.from('entity_media').delete().eq('entity_type', entityType).eq('entity_id', id)

      // Insert new
      if (mediaIds.length > 0) {
        const records = mediaIds.map((mediaId, index) => ({
          entity_id: id,
          entity_type: entityType,
          media_id: mediaId,
          position: index,
        }))

        const { error } = await supabase.from('entity_media').insert(records)

        if (error) {
          console.error('Failed to sync media:', error.message)
        }
      }

      if (id === entityId) {
        await fetchMedia()
      }
    },
    [entityId, entityType, fetchMedia],
  )

  const mediaIds = media.map((m) => m.id)

  return { addMedia, isLoading, media, mediaIds, refetch: fetchMedia, removeMedia, syncMedia }
}

export { useEntityMedia }
