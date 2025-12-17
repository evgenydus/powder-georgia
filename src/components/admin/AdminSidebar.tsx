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
    <aside className="w-64 bg-gray-800 p-4">
      <h2 className="mb-8 text-2xl font-bold">{t('admin.title')}</h2>
      <nav>
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
    </aside>
  )
}
