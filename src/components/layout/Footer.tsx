'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const Footer = () => {
  const t = useTranslations('footer')

  const quickLinks = [
    { href: routes.tours, label: 'Tours' },
    { href: routes.transfers, label: 'Transfers' },
    { href: routes.instructors, label: 'Instructors' },
    { href: routes.apartments, label: 'Apartments' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">Powder Georgia</h3>
            <p className="text-gray-400">{t('copyright')}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="transition-colors hover:text-orange-400">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">{t('followUs')}</h3>
            <div className="flex space-x-4">{/* Add social media links here */}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
