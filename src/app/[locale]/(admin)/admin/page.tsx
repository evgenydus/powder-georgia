import { Car, Home, Map, Mountain } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'

type EntityStats = {
  active: number
  total: number
}

async function getEntityCounts(): Promise<Record<string, EntityStats>> {
  const tables = [
    { activeField: 'is_published', name: 'tours' },
    { activeField: 'is_active', name: 'transfers' },
    { activeField: 'is_active', name: 'instructors' },
    { activeField: 'is_published', name: 'apartments' },
  ]

  const queries = tables.flatMap(({ activeField, name }) => [
    supabase.from(name).select('*', { count: 'exact', head: true }),
    supabase.from(name).select('*', { count: 'exact', head: true }).eq(activeField, true),
  ])

  const responses = await Promise.all(queries)
  const results: Record<string, EntityStats> = {}

  tables.forEach(({ name }, index) => {
    const totalResponse = responses[index * 2]
    const activeResponse = responses[index * 2 + 1]

    results[name] = {
      active: activeResponse.count ?? 0,
      total: totalResponse.count ?? 0,
    }
  })

  return results
}

const icons = {
  apartments: Home,
  instructors: Mountain,
  tours: Map,
  transfers: Car,
}

const AdminDashboard = async () => {
  const t = await getTranslations()
  const counts = await getEntityCounts()

  const cards = [
    { href: routes.adminTours, key: 'tours', label: t('navigation.tours') },
    { href: routes.adminTransfers, key: 'transfers', label: t('navigation.transfers') },
    { href: routes.adminInstructors, key: 'instructors', label: t('navigation.instructors') },
    { href: routes.adminApartments, key: 'apartments', label: t('navigation.apartments') },
  ]

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('admin.dashboard')}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ href, key, label }) => {
          const Icon = icons[key as keyof typeof icons]
          const stats = counts[key]

          return (
            <Link
              key={key}
              className="bg-card hover:bg-muted rounded-lg p-6 transition-colors"
              href={href}
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className="text-accent size-8" />
                <span className="text-3xl font-bold">{stats.total}</span>
              </div>
              <h2 className="text-foreground mb-1 font-semibold">{label}</h2>
              <p className="text-muted-foreground text-sm">
                {stats.active} {t('admin.published')} / {stats.total - stats.active}{' '}
                {t('admin.draft')}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboard
