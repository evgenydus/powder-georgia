'use client'

import { useLocale as useNextIntlLocale } from 'next-intl'
import type { Locale } from '@/i18n'

export const useLocale = (): Locale => {
  return useNextIntlLocale() as Locale
}
