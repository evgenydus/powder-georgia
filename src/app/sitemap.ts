import { locales } from '@/i18n'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.powder.ge'

const routes = ['', '/about', '/contact', '/tours', '/transfers']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return entries
}
