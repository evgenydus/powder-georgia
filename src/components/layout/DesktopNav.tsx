'use client'

import { useTranslations } from 'next-intl'

import { navLinks } from './constants'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const DesktopNav = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link key={link.href} href={link.href}>
            <span className={cn('hover:text-accent transition-colors', isActive && 'text-accent')}>
              {t(link.labelKey)}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
