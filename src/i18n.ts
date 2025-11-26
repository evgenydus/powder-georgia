import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'ka', 'ru'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined
  const safeLocale = (locale || 'en') as Locale
  
  return {
    locale: safeLocale,
    messages: (await import(`./locales/${safeLocale}/common.json`)).default,
  }
})
