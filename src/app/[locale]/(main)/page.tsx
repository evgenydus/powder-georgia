import Image from 'next/image'

import { CTASection, FeaturedToursSection, HeroSection } from '@/components/home'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
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
      <div className="relative">
        <Image
          alt="Mountain background"
          className="object-cover object-center md:object-top"
          fill
          priority
          quality={100}
          src="/images/mainBg.png"
        />
        <div className="absolute inset-0 bg-black/40" />

        <HeroSection />
        <FeaturedToursSection tours={featuredTours} />
      </div>

      <CTASection />
    </>
  )
}

export default HomePage
