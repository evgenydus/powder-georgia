'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from '@/hooks'
import { Icon } from '@/components/ui'
import { LanguageSelect } from '@/components/UI/LanguageSelect'
import { MobileMenu } from './Mobile/MobileMenu'
import { navMenuItems } from './constants'

export const NavMenu: React.FC = () => {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  const currentPath = pathname.replace(`/${locale}`, '') || '/'

  return (
    <nav className="flex items-center justify-end gap-5 lg:min-h-16">
      {/* Desktop Menu */}
      <ul className="hidden gap-2 px-1 xl:flex">
        {navMenuItems
          .filter((item) => !item.isHidden)
          .map((item) => (
            <li key={item.id}>
              <Link
                href={`/${locale}${item.path}`}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  currentPath === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon name={item.icon as any} size="md" />
                <span>{t(item.titleId)}</span>
              </Link>
            </li>
          ))}
      </ul>

      {/* Language Select & Mobile Menu */}
      <LanguageSelect />
      <MobileMenu currentPath={currentPath} />
    </nav>
  )
}
