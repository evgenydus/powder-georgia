import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

async function getApartmentBySlug(slug: string): Promise<Apartment | null> {
  try {
    const { data, error } = await supabase.from('apartments').select('*').eq('slug', slug).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching apartment:', error)

    return null
  }
}

const ApartmentPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const locale = await getLocale()
  const t = await getTranslations()
  const apartment = await getApartmentBySlug(slug)

  if (!apartment) {
    return (
      <main className="bg-primary flex min-h-screen items-center justify-center">
        <h1 className="text-2xl text-white">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = apartment[`title_${locale as 'en' | 'ka' | 'ru'}`] || apartment.title_en
  const description =
    apartment[`description_${locale as 'en' | 'ka' | 'ru'}`] || apartment.description_en
  const amenities = apartment[`amenities_${locale as 'en' | 'ka' | 'ru'}`] || apartment.amenities_en

  return (
    <main className="bg-primary min-h-screen text-white">
      <div className="relative h-96 w-full">
        <Image alt={title} className="object-cover" fill src={apartment.images[0]} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold">{t('apartments.capacity')}</p>
              <p>{apartment.capacity}</p>
            </div>
          </div>
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

        <div className="mt-8 text-right">
          <p className="text-3xl font-bold text-orange-400">
            ${apartment.price_per_night_usd}/night
          </p>
        </div>
      </div>
    </main>
  )
}

export default ApartmentPage
