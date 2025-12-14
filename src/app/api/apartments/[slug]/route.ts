import { type NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Apartment not found' }, { status: 404 })
    }

    return NextResponse.json(data as Apartment)
  } catch (error) {
    console.error('Error fetching apartment:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
