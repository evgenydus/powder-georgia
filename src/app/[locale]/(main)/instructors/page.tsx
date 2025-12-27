import { getTranslations } from 'next-intl/server'

import { InstructorGrid } from '@/components/instructors'

import { supabase } from '@/lib/supabase'
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

const InstructorsPage = async () => {
  const t = await getTranslations()
  const instructors = await getInstructors()

  return (
    <main className="bg-background min-h-screen">
      <section className="to-background from-card bg-gradient-to-b px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('instructors.title')}
          </h1>
          <p className="text-foreground/80">{t('instructors.description')}</p>
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

export default InstructorsPage
