import { getTranslations } from 'next-intl/server'

import { TourForm } from '@/components/admin/TourForm'

import { fetchMediaForEntity } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Tour } from '@/types'

async function getTourById(id: string): Promise<Tour | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()

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

const EditTourPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const t = await getTranslations('admin')
  const { id } = await params
  const tour = await getTourById(id)

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

export default EditTourPage
