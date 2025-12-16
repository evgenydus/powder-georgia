import { NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'
import type { Instructor } from '@/types'

export async function GET({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 })
    }

    return NextResponse.json(data as Instructor)
  } catch (error) {
    console.error('Error fetching instructor:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
