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
    { badge: inquiries.new, href: routes.adminInquiries, key: 'inquiries' },
    { href: routes.adminApartments, key: 'apartments' },
    { href: routes.adminInstructors, key: 'instructors' },
    { href: routes.adminTours, key: 'tours' },
    { href: routes.adminTransfers, key: 'transfers' },
  ]

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('admin.dashboard')}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ badge, href, key }) => {
          const Icon = icons[key as keyof typeof icons]
          const entity = entities[key]
          const total = key === 'inquiries' ? inquiries.total : (entity?.total ?? 0)

          return (
            <Link
              key={key}
              className="bg-card hover:bg-muted relative rounded-lg p-6 transition-colors"
              href={href}
            >
              {badge && badge > 0 ? (
                <span className="bg-info text-info-foreground absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full text-xs font-bold shadow-lg">
                  {badge}
                </span>
              ) : null}
              <div className="mb-4 flex items-center justify-between">
                <Icon className="text-accent size-8" />
                <span className="text-3xl font-bold">{total}</span>
              </div>
              <h2 className="text-foreground mb-1 font-semibold">{t(`navigation.${key}`)}</h2>
              <p className="text-muted-foreground text-sm">
                {key === 'inquiries'
                  ? `${badge} ${t('admin.status.new')}`
                  : `${entity?.active ?? 0} ${t('admin.published')} / ${(entity?.total ?? 0) - (entity?.active ?? 0)} ${t('admin.draft')}`}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboard
