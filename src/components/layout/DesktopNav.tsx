'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const DesktopNav = () => {
  const t = useTranslations()
  const pathname = usePathname()

  const navLinks = [
    { href: routes.tours, label: t('navigation.tours') },
    { href: routes.transfers, label: t('navigation.transfers') },
    { href: routes.instructors, label: t('navigation.instructors') },
    { href: routes.apartments, label: t('navigation.apartments') },
    { href: routes.about, label: t('navigation.about') },
    { href: routes.contact, label: t('navigation.contact') },
  ]

  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link key={link.href} href={link.href}>
            <span
              className={cn(
                'transition-colors hover:text-orange-400',
                isActive && 'text-orange-400'
              )}
            >
              {link.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
