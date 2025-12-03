import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const tours: Tour[] = (data || [])

    return NextResponse.json(tours)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
