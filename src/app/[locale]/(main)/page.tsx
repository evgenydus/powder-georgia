import Image from 'next/image'
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
      .eq('is_published', true)
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
    <main className="relative min-h-screen ">
      {/* Fixed background image - starts 80px from top */}
      <div className="fixed inset-x-0 top-20 bottom-0 -z-10">
        <Image
          alt="Mountain background"
          className="object-cover object-top"
          fill
          priority
          quality={100}
          src="/images/mainBg.png"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">{t('home.title')}</h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-300">{t('home.subtitle')}</p>
        <Link
          className="bg-accent hover:bg-accent/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
          href={routes.tours}
        >
          {t('home.cta')}
        </Link>
      </section>

      {featuredTours.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
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
      <section className="bg-linear-to-r from-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
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
