import { getTranslations } from 'next-intl/server'

import { ApartmentGrid } from '@/components/apartments'

import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

async function getApartments(): Promise<Apartment[]> {
  try {
    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching apartments:', error)

    return []
  }
}

const ApartmentsPage = async () => {
  const t = await getTranslations()
  const apartments = await getApartments()

  return (
    <main className="bg-background min-h-screen">
      <section className="to-background from-card bg-gradient-to-b px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('apartments.title')}
          </h1>
          <p className="text-foreground/80">{t('apartments.description')}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ApartmentGrid apartments={apartments} />
        </div>
      </section>
    </main>
  )
}

export default ApartmentsPage
