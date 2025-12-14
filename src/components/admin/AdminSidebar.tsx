import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function AdminSidebar() {
  const t = useTranslations('admin')

  const navLinks = [
    { href: '/admin/tours', label: t('tours') },
    { href: '/admin/transfers', label: t('transfers') },
    { href: '/admin/instructors', label: t('instructors') },
    { href: '/admin/apartments', label: t('apartments') },
  ]

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <h2 className="mb-8 text-2xl font-bold">{t('title')}</h2>
      <nav>
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span className="block rounded-lg px-4 py-2 transition-colors hover:bg-gray-700">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
