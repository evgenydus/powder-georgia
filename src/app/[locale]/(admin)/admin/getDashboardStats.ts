import { createClient } from '@/lib/supabase/server'

type EntityStats = { active: number; total: number }

const tables = [
  { activeField: 'is_published', name: 'apartments' },
  { activeField: 'is_active', name: 'instructors' },
  { activeField: 'is_published', name: 'tours' },
  { activeField: 'is_active', name: 'transfers' },
]

export async function getDashboardStats() {
  const supabase = await createClient()

  const entityQueries = tables.flatMap(({ activeField, name }) => [
    supabase.from(name).select('*', { count: 'exact', head: true }),
    supabase.from(name).select('*', { count: 'exact', head: true }).eq(activeField, true),
  ])

  const inquiryQueries = [
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .eq('is_processed', false),
  ]

  const [entityResponses, inquiryResponses] = await Promise.all([
    Promise.all(entityQueries),
    Promise.all(inquiryQueries),
  ])

  const entities: Record<string, EntityStats> = {}

  tables.forEach(({ name }, i) => {
    entities[name] = {
      active: entityResponses[i * 2 + 1].count ?? 0,
      total: entityResponses[i * 2].count ?? 0,
    }
  })

  return {
    entities,
    inquiries: { new: inquiryResponses[1].count ?? 0, total: inquiryResponses[0].count ?? 0 },
  }
}
