import { getTranslations } from 'next-intl/server'

import { InstructorGrid } from '@/components/instructors'

import { createClient } from '@/lib/supabase/server'
import type { Instructor } from '@/types'

async function getInstructors(): Promise<Instructor[]> {
  try {
    const supabase = await createClient()
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
    <>
      <section className="flex min-h-[30vh] items-center justify-center px-4 py-16 sm:px-6 md:min-h-[40svh] lg:px-8">
        <div className="bg-gradient-fade rounded-2xl px-8 py-8 text-center md:px-16">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('instructors.title')}
          </h1>
          <p className="text-foreground/80">{t('instructors.description')}</p>
        </div>
      </section>

      <div className="bg-background flex-1">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <InstructorGrid instructors={instructors} />
          </div>
        </section>
      </div>
    </>
  )
}

export default InstructorsPage
