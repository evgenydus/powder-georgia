import type { SupabaseClient } from '@supabase/supabase-js'

import type { Media, MediaEntityType } from '@/types'

type EntityWithMedia<T> = T & { media: Media[] }

type EntityMediaRow = {
  entity_id: string
  media: Media | null
}

const fetchMediaForEntities = async <T extends { id: string }>(
  supabase: SupabaseClient,
  entities: T[],
  entityType: MediaEntityType,
): Promise<EntityWithMedia<T>[]> => {
  if (entities.length === 0) return []

  const entityIds = entities.map((e) => e.id)

  const { data: entityMedia, error } = await supabase
    .from('entity_media')
    .select('entity_id, media:media_id(*)')
    .eq('entity_type', entityType)
    .in('entity_id', entityIds)
    .order('position', { ascending: true })

  if (error) {
    console.error('Failed to fetch media for entities:', error.message)
  }

  const mediaByEntityId = new Map<string, Media[]>()

  ;(entityMedia as EntityMediaRow[] | null)?.forEach((em) => {
    const existing = mediaByEntityId.get(em.entity_id) || []

    if (em.media) existing.push(em.media)
    mediaByEntityId.set(em.entity_id, existing)
  })

  return entities.map((entity) => ({
    ...entity,
    media: mediaByEntityId.get(entity.id) || [],
  }))
}

export const fetchMediaForEntity = async <T extends { id: string }>(
  supabase: SupabaseClient,
  entity: T,
  entityType: MediaEntityType,
): Promise<EntityWithMedia<T>> => {
  const result = await fetchMediaForEntities(supabase, [entity], entityType)

  return result[0]
}

export { fetchMediaForEntities }
