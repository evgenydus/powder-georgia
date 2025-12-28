'use client'

import { useCallback, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Media, MediaEntityType } from '@/types'

type CacheEntry = {
  data: Media[]
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const cacheTTL = 60000 // 1 minute

const getCacheKey = (filter: MediaEntityType | null | undefined) => filter ?? 'all'

const fetchMediaFromDb = async (entityTypeFilter: MediaEntityType | null | undefined) => {
  let query = supabase.from('media').select('*')

  if (entityTypeFilter) {
    query = query.eq('entity_type', entityTypeFilter)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch media:', error.message)

    return []
  }

  return (data as Media[]) ?? []
}

const useMediaLibrary = (entityTypeFilter?: MediaEntityType | null) => {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const key = getCacheKey(entityTypeFilter)
      const cached = cache.get(key)
      const now = Date.now()

      if (cached && now - cached.timestamp < cacheTTL) {
        if (!cancelled) {
          setMedia(cached.data)
          setIsLoading(false)
        }

        return
      }

      if (!cancelled) {
        setIsLoading(true)
      }

      const result = await fetchMediaFromDb(entityTypeFilter)

      if (!cancelled) {
        cache.set(key, { data: result, timestamp: Date.now() })
        setMedia(result)
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [entityTypeFilter, refreshKey])

  const invalidateCache = useCallback(() => {
    cache.clear()
  }, [])

  const refresh = useCallback(() => {
    const key = getCacheKey(entityTypeFilter)

    cache.delete(key)

    setRefreshKey((k) => k + 1)
  }, [entityTypeFilter])

  return { invalidateCache, isLoading, media, refresh }
}

export { useMediaLibrary }
