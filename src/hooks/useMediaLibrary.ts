'use client'

import { useCallback, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Media, MediaEntityType } from '@/types'

type CacheEntry = {
  data: Media[]
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 60000 // 1 minute

type UseMediaLibraryOptions = {
  entityType?: MediaEntityType | 'all'
}

const useMediaLibrary = ({ entityType = 'all' }: UseMediaLibraryOptions = {}) => {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const cacheKey = entityType
      const cached = cache.get(cacheKey)
      const now = Date.now()

      if (cached && now - cached.timestamp < CACHE_TTL) {
        if (!cancelled) {
          setMedia(cached.data)
          setIsLoading(false)
        }

        return
      }

      if (!cancelled) setIsLoading(true)

      let query = supabase.from('media').select('*')

      if (entityType !== 'all') {
        query = query.eq('entity_type', entityType)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (!cancelled) {
        if (error) {
          console.error('Failed to fetch media:', error.message)
          setMedia([])
        } else {
          cache.set(cacheKey, { data: data as Media[], timestamp: Date.now() })
          setMedia(data as Media[])
        }

        setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [entityType, refreshKey])

  const refetch = useCallback(() => {
    cache.delete(entityType)
    setRefreshKey((k) => k + 1)
  }, [entityType])

  const invalidateAll = useCallback(() => {
    cache.clear()
  }, [])

  return { invalidateAll, isLoading, media, refetch }
}

export { useMediaLibrary }
