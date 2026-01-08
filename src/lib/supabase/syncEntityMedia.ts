import type { SupabaseClient } from '@supabase/supabase-js'

import type { MediaEntityType } from '@/types'

type SyncEntityMediaResult = {
  error?: string
  success: boolean
}

export const syncEntityMedia = async (
  supabase: SupabaseClient,
  entityType: MediaEntityType,
  entityId: string,
  mediaIds: string[],
): Promise<SyncEntityMediaResult> => {
  if (mediaIds.length === 0) {
    return { success: true }
  }

  const records = mediaIds.map((mediaId, index) => ({
    entity_id: entityId,
    entity_type: entityType,
    media_id: mediaId,
    position: index,
  }))

  const { error } = await supabase.from('entity_media').insert(records)

  if (error) {
    console.error('Failed to sync entity media:', error.message)

    return { error: error.message, success: false }
  }

  return { success: true }
}
