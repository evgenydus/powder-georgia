import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/constants'
import { Link } from '@/i18n/navigation'

export const AdminSidebar = () => {
  const t = useTranslations()

  const navLinks = [
    { href: routes.adminTours, label: t('navigation.tours') },
    { href: routes.adminTransfers, label: t('navigation.transfers') },
    { href: routes.adminInstructors, label: t('navigation.instructors') },
    { href: routes.adminApartments, label: t('navigation.apartments') },
  ]

  return (
    <aside className="bg-sidebar flex w-64 flex-col p-4">
      <h2 className="mb-8 text-2xl font-bold">{t('admin.title')}</h2>
      <nav className="flex-1">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span className="hover:bg-sidebar-accent block rounded-lg px-4 py-2 transition-colors">
                  {link.label}
                </span>
              </Link>
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
