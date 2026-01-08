import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { ImageGallery } from '@/components/ui'

import { fetchMediaForEntity } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Tour } from '@/types'

async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    if (!data) return null

    return fetchMediaForEntity(supabase, data, 'tour')
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
      <main className="bg-background flex min-h-screen items-center justify-center">
        <h1 className="text-foreground text-2xl">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = tour[`title_${locale as 'en' | 'ka' | 'ru'}`] || tour.title_en
  const description = tour[`description_${locale as 'en' | 'ka' | 'ru'}`] || tour.description_en
  const requiredEquipment =
    tour[`required_equipment_${locale as 'en' | 'ka' | 'ru'}`] || tour.required_equipment_en

  const images = tour.media?.map((media) => media.url) ?? []

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="relative h-96 w-full">
        {images[0] && <Image alt={title} className="object-cover" fill src={images[0]} />}
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

        {images.length > 1 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">{t('tours.gallery')}</h2>
            <ImageGallery alt={title} images={images} />
          </div>
        )}

        <div className="mt-8 text-right">
          <p className="text-accent text-3xl font-bold">${tour.price_usd}</p>
        </div>
      </div>
    </main>
  )
}

export default TourPage
