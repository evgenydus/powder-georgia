import { getTranslations } from 'next-intl/server'

import { TourGrid } from '@/components/tours'

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

const ToursPage = async () => {
  const t = await getTranslations()
  const tours = await getTours()

  return (
    <main className="bg-primary min-h-screen">
      <section className="to-primary bg-gradient-to-b from-gray-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{t('tours.title')}</h1>
          <p className="text-gray-300">{t('tours.description')}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TourGrid tours={tours} />
        </div>
      </section>
    </main>
  )
}

export default ToursPage
