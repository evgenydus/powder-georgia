import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { RequestLessonButton } from '@/components/instructors'

import { fetchMediaForEntity } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Instructor } from '@/types'

async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('instructors').select('*').eq('slug', slug).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    if (!data) return null

    return fetchMediaForEntity(supabase, data, 'instructor')
  } catch (error) {
    console.error('Error fetching instructor:', error)

    return null
  }
}

const InstructorPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const locale = await getLocale()
  const t = await getTranslations()
  const instructor = await getInstructorBySlug(slug)

  if (!instructor) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center">
        <h1 className="text-foreground text-2xl">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const specialization =
    instructor[`specialization_${locale as 'en' | 'ka' | 'ru'}`] || instructor.specialization_en
  const bio = instructor[`bio_${locale as 'en' | 'ka' | 'ru'}`] || instructor.bio_en
  const services = instructor[`services_${locale as 'en' | 'ka' | 'ru'}`] || instructor.services_en

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-4xl p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              {instructor.media?.[0] && (
                <Image
                  alt={instructor.name}
                  className="object-cover"
                  fill
                  src={instructor.media[0].url}
                />
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="mb-2 text-4xl font-bold">{instructor.name}</h1>
            <p className="text-muted-foreground mb-4 text-xl">{specialization}</p>
            <div className="prose prose-invert mb-8 max-w-none">
              <p>{bio}</p>
            </div>
            {services && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">{t('instructors.services')}</h2>
                <p>{services}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-accent text-3xl font-bold">
                {instructor.price_per_hour_usd
                  ? `$${instructor.price_per_hour_usd}/hr`
                  : t('common.inquire')}
              </p>
              <RequestLessonButton instructor={instructor} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default InstructorPage
