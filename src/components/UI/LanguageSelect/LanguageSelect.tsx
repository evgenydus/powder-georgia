'use client'

import React, { useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales } from '@/i18n'
import { ChevronDown } from 'lucide-react'

const languageNames: Record<string, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
}

export const LanguageSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()

  const getNewPathname = (newLocale: string) => {
    return pathname.replace(`/${locale}`, `/${newLocale}`)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-100"
      >
        <span className="font-medium">{languageNames[locale]}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border bg-white shadow-lg">
          <ul className="flex flex-col">
            {locales.map((lang) => (
              <li key={lang}>
                <Link
                  href={getNewPathname(lang)}
                  className={`block px-4 py-2 transition-colors ${
                    locale === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {languageNames[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
