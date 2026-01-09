import { getTranslations } from 'next-intl/server'

import { ApartmentForm } from '@/components/admin/ApartmentForm'

import { fetchMediaForEntity } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Apartment } from '@/types'

async function getApartmentById(id: string): Promise<Apartment | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('apartments').select('*').eq('id', id).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    if (!data) return null

    return fetchMediaForEntity(supabase, data, 'apartment')
  } catch (error) {
    console.error('Error fetching apartment:', error)

    return null
  }
}

const EditApartmentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const t = await getTranslations('admin')
  const { id } = await params
  const apartment = await getApartmentById(id)

  if (!apartment) {
    return <div>{t('apartmentNotFound')}</div>
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('editApartment')}</h1>
      <ApartmentForm apartment={apartment} />
    </div>
  )
}

export default EditApartmentPage
