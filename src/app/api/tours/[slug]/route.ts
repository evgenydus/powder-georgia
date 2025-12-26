import { type NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    return NextResponse.json(data as Tour)
  } catch (error) {
    console.error('Error fetching tour:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
