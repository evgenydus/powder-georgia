import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

const primaryNavLinks = [
  { href: routes.adminApartments, labelKey: 'navigation.apartments' },
  { href: routes.adminInstructors, labelKey: 'navigation.instructors' },
  { href: routes.adminTours, labelKey: 'navigation.tours' },
  { href: routes.adminTransfers, labelKey: 'navigation.transfers' },
]

const secondaryNavLinks = [{ href: routes.adminInquiries, labelKey: 'navigation.inquiries' }]

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href}>
    <span className="hover:bg-sidebar-accent block rounded-lg px-4 py-2 transition-colors">
      {label}
    </span>
  </Link>
)

export const AdminSidebar = () => {
  const t = useTranslations()

  return (
    <aside className="bg-sidebar flex w-64 shrink-0 flex-col p-4">
      <Link href={routes.admin}>
        <h2 className="mb-8 text-2xl font-bold">{t('admin.title')}</h2>
      </Link>

      <nav className="flex-1 space-y-6">
        <ul className="space-y-4">
          {primaryNavLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={t(link.labelKey)} />
            </li>
          ))}
        </ul>

        <hr />

        <ul className="space-y-4">
          {secondaryNavLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={t(link.labelKey)} />
            </li>
          ))}
        </ul>
      </nav>
      <Link
        className="text-muted-foreground hover:bg-sidebar-accent hover:text-foreground mt-auto flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
        href={routes.home}
      >
        <Home className="size-4" />
        {t('navigation.home')}
      </Link>
    </aside>
  )
}
