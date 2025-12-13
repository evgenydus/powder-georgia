'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  const quickLinks = [
    { href: '/tours', label: 'Tours' },
    { href: '/transfers', label: 'Transfers' },
    { href: '/instructors', label: 'Instructors' },
    { href: '/apartments', label: 'Apartments' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Powder Georgia</h3>
            <p className="text-gray-400">{t('copyright')}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quickLinks')}</h3>
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
            <h3 className="text-lg font-bold mb-4">{t('followUs')}</h3>
            <div className="flex space-x-4">
              {/* Add social media links here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
