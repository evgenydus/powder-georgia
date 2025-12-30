import { useEffect, useMemo, useState } from 'react'

import { supabase } from '@/lib/supabase/client'
import type { Inquiry } from '@/types'

const TABLE_MAP: Record<string, string> = {
  apartment: 'apartments',
  instructor: 'instructors',
  tour: 'tours',
  transfer: 'transfers',
}

export const useRelatedEntity = (inquiry: Inquiry, open: boolean) => {
  const [cache, setCache] = useState<Record<string, string>>({})

  const cacheKey = inquiry.related_id || ''
  const table = TABLE_MAP[inquiry.inquiry_type]
  const shouldFetch = open && inquiry.related_id && inquiry.inquiry_type !== 'general' && table

  useEffect(() => {
    if (!shouldFetch || !inquiry.related_id || cache[cacheKey]) {
      return
    }

    let cancelled = false

    const fetchEntity = async () => {
      const isInstructor = inquiry.inquiry_type === 'instructor'
      const column = isInstructor ? 'name' : 'title_en'

      const { data } = await supabase
        .from(table)
        .select(column)
        .eq('id', inquiry.related_id)
        .single()

      if (!cancelled && data) {
        const name = (data as Record<string, string>)[column]

        setCache((prev) => ({ ...prev, [cacheKey]: name }))
      }
    }

    void fetchEntity()

    return () => {
      cancelled = true
    }
  }, [cache, cacheKey, inquiry.inquiry_type, inquiry.related_id, shouldFetch, table])

  return useMemo(() => {
    if (!shouldFetch) return null

    return cache[cacheKey] || null
  }, [cache, cacheKey, shouldFetch])
}
