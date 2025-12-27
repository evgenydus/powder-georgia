import { Home } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const AdminSidebar = () => {
  const t = useTranslations()

  const navLinks = [
    { href: '/admin/tours', label: t('navigation.tours') },
    { href: '/admin/transfers', label: t('navigation.transfers') },
    { href: '/admin/instructors', label: t('navigation.instructors') },
    { href: '/admin/apartments', label: t('navigation.apartments') },
  ]

  return (
    <aside className="flex w-64 flex-col bg-gray-800 p-4">
      <h2 className="mb-8 text-2xl font-bold">{t('admin.title')}</h2>
      <nav className="flex-1">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span className="block rounded-lg px-4 py-2 transition-colors hover:bg-gray-700">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        className="mt-auto flex items-center gap-2 rounded-lg px-4 py-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
        href="/"
      >
        <Home className="size-4" />
        {t('navigation.home')}
      </Link>
    </aside>
  )
}
