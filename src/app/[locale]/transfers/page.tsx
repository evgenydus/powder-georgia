import { getTranslations } from 'next-intl/server'
import { supabase } from '@/lib/supabase'
import { TransferGrid } from '@/components/transfers'
import type { Transfer } from '@/types'

async function getTransfers(): Promise<Transfer[]> {
  try {
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

export default async function TransfersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  const transfers = await getTransfers()

  return (
    <main className="min-h-screen bg-primary">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-900 to-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {t('transfers.title')}
          </h1>
          <p className="text-gray-300">
            {t('transfers.description')}
          </p>
        </div>
      </section>

      {/* Transfers Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TransferGrid transfers={transfers} locale={locale} />
        </div>
      </section>
    </main>
  )
}
