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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data as Tour[])
  } catch (error) {
    console.error('Error fetching tours:', error)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
