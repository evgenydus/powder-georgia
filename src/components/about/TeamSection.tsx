import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { InstructorCard } from '@/components/instructors'
import { Button } from '@/components/ui'

import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Instructor } from '@/types'

async function getFeaturedInstructors(): Promise<Instructor[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('is_active', true)
      .limit(3)

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

export const TeamSection = async () => {
  const t = await getTranslations()
  const instructors = await getFeaturedInstructors()

  if (instructors.length === 0) return null

  return (
    <section className="bg-card/50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          {t('about.team.title')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href={routes.instructors}>
            <Button size="lg" variant="outline">
              {t('about.team.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
