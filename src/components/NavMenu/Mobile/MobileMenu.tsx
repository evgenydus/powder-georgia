'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from '@/hooks'
import { Menu, X } from 'lucide-react'
import { navMenuItems } from '../constants'

interface MobileMenuProps {
  currentPath: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-16 z-50 w-48 rounded-lg border bg-white shadow-lg">
          <ul className="flex flex-col">
            {navMenuItems
              .filter((item) => !item.isHidden)
              .map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${locale}${item.path}`}
                    className={`block px-4 py-2 transition-colors ${
                      currentPath === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.titleId)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
