import { getLocale, getTranslations } from 'next-intl/server'
import { supabase } from '@/lib/supabase'
import { InstructorGrid } from '@/components/instructors'
import type { Instructor } from '@/types'

async function getInstructors(): Promise<Instructor[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return []
  }
}

export default async function InstructorsPage() {
  const locale = await getLocale()
  const t = await getTranslations()
  const instructors = await getInstructors()

  return (
    <main className="min-h-screen bg-primary">
      <section className="bg-gradient-to-b from-gray-900 to-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {t('instructors.title')}
          </h1>
          <p className="text-gray-300">{t('instructors.description')}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <InstructorGrid instructors={instructors} />
        </div>
      </section>
    </main>
  )
}
