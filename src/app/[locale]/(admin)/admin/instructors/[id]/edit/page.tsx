import { getTranslations } from 'next-intl/server'

import { InstructorForm } from '@/components/admin/InstructorForm'

import { createClient } from '@/lib/supabase/server'
import type { Instructor } from '@/types'

async function getInstructorById(id: string): Promise<Instructor | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('instructors').select('*').eq('id', id).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching instructor:', error)

    return null
  }
}

const EditInstructorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const t = await getTranslations('admin')
  const { id } = await params
  const instructor = await getInstructorById(id)

  if (!instructor) {
    return <div>{t('instructorNotFound')}</div>
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('editInstructor')}</h1>
      <InstructorForm instructor={instructor} />
    </div>
  )
}

export default EditInstructorPage
