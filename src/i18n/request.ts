import { getRequestConfig } from 'next-intl/server'
import { Locale } from './config'

export default getRequestConfig(async ({ locale }) => ({
  locale: locale as Locale,
  messages: (await import(`../locales/${locale}/common.json`)).default,
}))
