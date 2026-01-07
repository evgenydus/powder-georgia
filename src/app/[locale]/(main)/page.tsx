import { CTASection, FeaturedToursSection, HeroSection } from '@/components/home'

import { fetchMediaForEntities } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Tour } from '@/types'

async function getFeaturedTours(): Promise<Tour[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    if (!data || data.length === 0) return []

    return fetchMediaForEntities(supabase, data, 'tour')
  } catch (error) {
    console.error('Error fetching tours:', error)

    return []
  }
}

const HomePage = async () => {
  const featuredTours = await getFeaturedTours()

  return (
    <>
      <HeroSection />
      <FeaturedToursSection tours={featuredTours} />
      <div className="bg-background flex-1">
        <CTASection />
      </div>
    </>
  )
}

export default HomePage
