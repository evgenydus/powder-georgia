'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { LanguageSwitcher } from './LanguageSwitcher'

import { Link } from '@/i18n/navigation'

export const Header = () => {
  const t = useTranslations('navigation')

  const navLinks = [
    { href: routes.tours, label: t('tours') },
    { href: routes.transfers, label: t('transfers') },
    { href: routes.instructors, label: t('instructors') },
    { href: routes.apartments, label: t('apartments') },
    { href: routes.about, label: t('about') },
    { href: routes.contact, label: t('contact') },
  ]

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href={routes.home}>
          <span className="text-2xl font-bold text-white">Powder Georgia</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="transition-colors hover:text-orange-400">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
