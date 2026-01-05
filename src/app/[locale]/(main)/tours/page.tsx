import { getTranslations } from 'next-intl/server'

import { TourGrid } from '@/components/tours'

import { createClient } from '@/lib/supabase/server'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
    const supabase = await createClient()
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

const ToursPage = async () => {
  const t = await getTranslations()
  const tours = await getTours()

  return (
    <>
      <section className="flex min-h-[30vh] items-center justify-center px-4 py-16 sm:px-6 md:min-h-[40svh] lg:px-8">
        <div className="bg-gradient-fade rounded-2xl px-8 py-8 text-center md:px-16">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('tours.title')}
          </h1>
          <p className="text-foreground/80">{t('tours.description')}</p>
        </div>
      </section>

      <div className="bg-background flex-1">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <TourGrid tours={tours} />
          </div>
        </section>
      </div>
    </>
  )
}

export default ToursPage
