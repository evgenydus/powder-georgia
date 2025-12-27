'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { AuthControls } from '@/components/auth'
import { LogoAnimated } from '@/components/ui/LogoAnimated'
import { LanguageSwitcher } from './LanguageSwitcher'

import { Link } from '@/i18n/navigation'

export const Header = () => {
  const t = useTranslations()

  const navLinks = [
    { href: routes.tours, label: t('navigation.tours') },
    { href: routes.transfers, label: t('navigation.transfers') },
    { href: routes.instructors, label: t('navigation.instructors') },
    { href: routes.apartments, label: t('navigation.apartments') },
    { href: routes.about, label: t('navigation.about') },
    { href: routes.contact, label: t('navigation.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href={routes.home}>
          <LogoAnimated />
        </Link>
        {/*<Link href={routes.home}>*/}
        {/*  <span className="text-2xl font-bold text-white">{t('common.siteName')}</span>*/}
        {/*</Link>*/}
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="transition-colors hover:text-orange-400">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <AuthControls />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="absolute -bottom-6 h-6 w-full bg-linear-to-b from-gray-900 to-transparent" />
    </header>
  )
}
