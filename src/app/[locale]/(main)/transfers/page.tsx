import { getTranslations } from 'next-intl/server'

import { TransferGrid } from '@/components/transfers'

import { createClient } from '@/lib/supabase/server'
import type { Transfer } from '@/types'

async function getTransfers(): Promise<Transfer[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('transfers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching transfers:', error)

    return []
  }
}

const TransfersPage = async () => {
  const t = await getTranslations()
  const transfers = await getTransfers()

  return (
    <main className="bg-background min-h-screen">
      <section className="to-background from-card bg-gradient-to-b px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('transfers.title')}
          </h1>
          <p className="text-foreground/80">{t('transfers.description')}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TransferGrid transfers={transfers} />
        </div>
      </section>
    </main>
  )
}

export default TransfersPage
