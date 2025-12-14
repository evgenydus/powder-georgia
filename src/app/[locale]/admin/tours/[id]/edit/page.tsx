import { getTranslations } from 'next-intl/server'

import { TourForm } from '@/components/admin/TourForm'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

async function getTourById(id: string): Promise<Tour | null> {
  try {
    const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()

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

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const t = await getTranslations('admin')
  const tour = await getTourById(params.id)

  if (!tour) {
    return <div>{t('tourNotFound')}</div>
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('editTour')}</h1>
      <TourForm tour={tour} />
    </div>
  )
}
