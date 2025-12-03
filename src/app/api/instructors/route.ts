import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Instructor } from '@/types'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const instructors: Instructor[] = (data || [])

    return NextResponse.json(instructors)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
