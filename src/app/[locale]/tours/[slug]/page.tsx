import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { ImageGallery } from '@/components/ui'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching tour:', error)

    return null
  }
}

const TourPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const locale = await getLocale()
  const t = await getTranslations()
  const tour = await getTourBySlug(slug)

  if (!tour) {
    return (
      <main className="bg-primary flex min-h-screen items-center justify-center">
        <h1 className="text-2xl text-white">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = tour[`title_${locale as 'en' | 'ka' | 'ru'}`] || tour.title_en
  const description = tour[`description_${locale as 'en' | 'ka' | 'ru'}`] || tour.description_en
  const requiredEquipment =
    tour[`required_equipment_${locale as 'en' | 'ka' | 'ru'}`] || tour.required_equipment_en

  return (
    <main className="bg-primary min-h-screen text-white">
      <div className="relative h-96 w-full">
        <Image alt={title} className="object-cover" fill src={tour.images[0]} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛰️</span>
            <div>
              <p className="font-bold">{t('tours.difficulty')}</p>
              <p>{tour.difficulty}/5</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="font-bold">{t('tours.duration')}</p>
              <p>{tour.duration_hours}h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold">{t('tours.groupSize')}</p>
              <p>
                {tour.group_size_min}-{tour.group_size_max}
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p>{description}</p>
        </div>

        {requiredEquipment && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">{t('tours.requiredEquipment')}</h2>
            <p>{requiredEquipment}</p>
          </div>
        )}

        {tour.images.length > 1 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">{t('tours.gallery')}</h2>
            <ImageGallery alt={title} images={tour.images} />
          </div>
        )}

        <div className="mt-8 text-right">
          <p className="text-3xl font-bold text-orange-400">${tour.price_usd}</p>
        </div>
      </div>
    </main>
  )
}

export default TourPage
