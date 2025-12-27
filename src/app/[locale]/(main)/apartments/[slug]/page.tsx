import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { ApartmentStats } from '@/components/apartments'
import { Button, ImageGallery } from '@/components/ui'

import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

async function getApartmentBySlug(slug: string): Promise<Apartment | null> {
  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Supabase error:', error)

    return null
  }

  return data || null
}

const ApartmentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const locale = (await getLocale()) as Locale
  const t = await getTranslations()
  const apartment = await getApartmentBySlug(slug)

  if (!apartment) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center">
        <h1 className="text-foreground text-2xl">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = apartment[`title_${locale}`] || apartment.title_en
  const description = apartment[`description_${locale}`] || apartment.description_en
  const amenities = apartment[`amenities_${locale}`] || apartment.amenities_en

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="relative h-96 w-full">
        <Image alt={title} className="object-cover" fill src={apartment.images[0]} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        <div className="mb-8">
          <ApartmentStats apartment={apartment} size="lg" />
        </div>

        <div className="prose prose-invert max-w-none">
          <p>{description}</p>
        </div>

        {amenities && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">{t('apartments.amenities')}</h2>
            <p>{amenities}</p>
          </div>
        )}

        {apartment.images.length > 1 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">{t('apartments.gallery')}</h2>
            <ImageGallery alt={title} images={apartment.images} />
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <p className="text-accent text-3xl font-bold">
            ${apartment.price_per_night_usd}/{t('apartments.night')}
          </p>
          <Button asChild size="lg">
            <Link href={routes.contact}>{t('apartments.bookNow')}</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ApartmentPage
