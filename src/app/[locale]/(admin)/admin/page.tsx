import { Car, Home, Mail, Map, Mountain } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { getDashboardStats } from './getDashboardStats'

import { Link } from '@/i18n/navigation'

const icons = {
  apartments: Home,
  inquiries: Mail,
  instructors: Mountain,
  tours: Map,
  transfers: Car,
}

const AdminDashboard = async () => {
  const t = await getTranslations()
  const { entities, inquiries } = await getDashboardStats()

  const cards = [
    {
      href: routes.adminInquiries,
      key: 'inquiries',
      stats: `${inquiries.new} ${t('admin.status.new')}`,
    },
    { href: routes.adminApartments, key: 'apartments', stats: null },
    { href: routes.adminInstructors, key: 'instructors', stats: null },
    { href: routes.adminTours, key: 'tours', stats: null },
    { href: routes.adminTransfers, key: 'transfers', stats: null },
  ]

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('admin.dashboard')}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ href, key, stats }) => {
          const Icon = icons[key as keyof typeof icons]
          const entity = entities[key]
          const total = key === 'inquiries' ? inquiries.total : (entity?.total ?? 0)

          return (
            <Link
              key={key}
              className="bg-card hover:bg-muted rounded-lg p-6 transition-colors"
              href={href}
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className="text-accent size-8" />
                <span className="text-3xl font-bold">{total}</span>
              </div>
              <h2 className="text-foreground mb-1 font-semibold">{t(`navigation.${key}`)}</h2>
              <p className="text-muted-foreground text-sm">
                {stats ??
                  `${entity?.active ?? 0} ${t('admin.published')} / ${(entity?.total ?? 0) - (entity?.active ?? 0)} ${t('admin.draft')}`}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboard
