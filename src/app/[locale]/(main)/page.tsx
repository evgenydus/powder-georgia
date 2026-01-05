import { CTASection, FeaturedToursSection, HeroSection } from '@/components/home'

import { createClient } from '@/lib/supabase/server'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching tours:', error)

    return []
  }
}

const HomePage = async () => {
  const tours = await getTours()
  const featuredTours = tours.slice(0, 3)

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
