import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { TourGrid } from '@/components/tours'

import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching tours:', error)

    return []
  }
}

const HomePage = async () => {
  const t = await getTranslations()
  const tours = await getTours()
  const featuredTours = tours.slice(0, 3)

  return (
    <main className="bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="to-primary relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-gray-900 px-4 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">{t('home.title')}</h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-300">{t('home.subtitle')}</p>
        <Link
          className="bg-accent hover:bg-accent/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
          href={routes.tours}
        >
          {t('home.cta')}
        </Link>
      </section>

      {/* Featured Tours Section */}
      {featuredTours.length > 0 && (
        <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">{t('home.featured')}</h2>
              <p className="text-gray-400">{t('tours.description')}</p>
            </div>

            <TourGrid tours={featuredTours} />

            <div className="mt-12 text-center">
              <Link
                className="bg-accent hover:bg-accent/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
                href={routes.tours}
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
          <h2 className="mb-4 text-3xl font-bold text-white">{t('common.ready')}</h2>
          <p className="mb-8 text-gray-300">{t('common.contactUs')}</p>
          <Link
            className="bg-secondary hover:bg-secondary/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
            href={routes.contact}
          >
            {t('navigation.contact')}
          </Link>
        </div>
      </section>
    </main>
  )
}

export default HomePage
