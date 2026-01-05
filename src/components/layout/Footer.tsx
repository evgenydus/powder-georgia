'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { FollowUsBlock } from '@/components/contact'

import { Link } from '@/i18n/navigation'

const quickLinks = [
  { href: routes.tours, labelKey: 'navigation.tours' },
  { href: routes.transfers, labelKey: 'navigation.transfers' },
  { href: routes.instructors, labelKey: 'navigation.instructors' },
  { href: routes.apartments, labelKey: 'navigation.apartments' },
  { href: routes.contact, labelKey: 'navigation.contact' },
]

export const Footer = () => {
  const t = useTranslations()

  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="order-last md:order-first">
            <h3 className="mb-4 text-lg font-bold">{t('common.siteName')}</h3>
            <p className="text-muted-foreground">{t('footer.copyright')}</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="hover:text-accent transition-colors">{t(link.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <FollowUsBlock />
        </div>
      </div>
    </footer>
  )
}
