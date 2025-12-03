import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { TourGrid } from '@/components/tours'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tours`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) return []
    return response.json()
  } catch {
    return []
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  const tours = await getTours()
  const featuredTours = tours.slice(0, 3)

  return (
    <main className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-primary px-4 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
          {t('home.title')}
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-300">
          {t('home.subtitle')}
        </p>
        <Link
          href={`/${locale}/tours`}
          className="inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
        >
          {t('home.cta')}
        </Link>
      </section>

      {/* Featured Tours Section */}
      {featuredTours.length > 0 && (
        <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">
                {t('home.featured')}
              </h2>
              <p className="text-gray-400">
                {t('tours.description')}
              </p>
            </div>

            <TourGrid tours={featuredTours} locale={locale} />

            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/tours`}
                className="inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
              >
                {t('tours.viewAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            {t('common.ready')}
          </h2>
          <p className="mb-8 text-gray-300">
            {t('common.contactUs')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block rounded-lg bg-secondary px-8 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
          >
            {t('navigation.contact')}
          </Link>
        </div>
      </section>
    </main>
  )
}
