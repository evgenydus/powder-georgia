import { type NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'
import type { Instructor } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data as Instructor[])
  } catch (error) {
    console.error('Error fetching instructors:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
