import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { TourGrid } from '@/components/tours'

import { Link } from '@/i18n/navigation'
import type { Tour } from '@/types'

type FeaturedToursSectionProps = {
  tours: Tour[]
}

export const FeaturedToursSection = async ({ tours }: FeaturedToursSectionProps) => {
  const t = await getTranslations()

  if (tours.length === 0) return null

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">{t('home.featured')}</h2>
          <p className="text-muted-foreground">{t('tours.description')}</p>
        </div>

        <TourGrid tours={tours} />

        <div className="mt-12 text-center">
          <Link
            className="bg-accent hover:bg-accent/90 text-accent-foreground inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
            href={routes.tours}
          >
            {t('tours.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
