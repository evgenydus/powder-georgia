'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const Footer = () => {
  const t = useTranslations()

  const quickLinks = [
    { href: routes.tours, label: t('navigation.tours') },
    { href: routes.transfers, label: t('navigation.transfers') },
    { href: routes.instructors, label: t('navigation.instructors') },
    { href: routes.apartments, label: t('navigation.apartments') },
  ]

  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">{t('common.siteName')}</h3>
            <p className="text-muted-foreground">{t('footer.copyright')}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="hover:text-accent transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">{t('footer.followUs')}</h3>
            <div className="flex space-x-4">{/* Add social media links here */}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
