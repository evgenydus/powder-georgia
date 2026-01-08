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
  // Delete existing associations first
  const { error: deleteError } = await supabase
    .from('entity_media')
    .delete()
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)

  if (deleteError) {
    console.error('Failed to delete existing entity media:', deleteError.message)

    return { error: deleteError.message, success: false }
  }

  // Insert new associations if any
  if (mediaIds.length === 0) {
    return { success: true }
  }

  const records = mediaIds.map((mediaId, index) => ({
    entity_id: entityId,
    entity_type: entityType,
    media_id: mediaId,
    position: index,
  }))

  const { error: insertError } = await supabase.from('entity_media').insert(records)

  if (insertError) {
    console.error('Failed to sync entity media:', insertError.message)

    return { error: insertError.message, success: false }
  }

  return { success: true }
}
