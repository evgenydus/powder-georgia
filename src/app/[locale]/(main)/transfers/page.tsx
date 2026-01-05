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
    <>
      <section className="flex min-h-[30vh] items-center justify-center px-4 py-16 sm:px-6 md:min-h-[40svh] lg:px-8">
        <div className="bg-gradient-fade rounded-2xl px-8 py-8 text-center md:px-16">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('transfers.title')}
          </h1>
          <p className="text-foreground/80">{t('transfers.description')}</p>
        </div>
      </section>

      <div className="bg-background flex-1">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <TransferGrid transfers={transfers} />
          </div>
        </section>
      </div>
    </>
  )
}

export default TransfersPage
