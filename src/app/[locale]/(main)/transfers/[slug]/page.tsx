import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { supabase } from '@/lib/supabase'
import type { Transfer } from '@/types'

async function getTransferBySlug(slug: string): Promise<Transfer | null> {
  try {
    const { data, error } = await supabase.from('transfers').select('*').eq('slug', slug).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching transfer:', error)

    return null
  }
}

const TransferPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const locale = await getLocale()
  const t = await getTranslations()
  const transfer = await getTransferBySlug(slug)

  if (!transfer) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center">
        <h1 className="text-foreground text-2xl">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = transfer[`title_${locale as 'en' | 'ka' | 'ru'}`] || transfer.title_en
  const route = transfer[`route_${locale as 'en' | 'ka' | 'ru'}`] || transfer.route_en
  const description =
    transfer[`description_${locale as 'en' | 'ka' | 'ru'}`] || transfer.description_en

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="relative h-96 w-full">
        <Image alt={title} className="object-cover" fill src={transfer.image_url} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <div>
              <p className="font-bold">{t('transfers.vehicle')}</p>
              <p>{transfer.vehicle_type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold">{t('transfers.capacity')}</p>
              <p>{transfer.capacity}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="mb-4 text-2xl font-bold">{t('transfers.route')}</h2>
          <p>{route}</p>
          {description && <p>{description}</p>}
        </div>

        <div className="mt-8 text-right">
          <p className="text-accent text-3xl font-bold">${transfer.price_usd}</p>
        </div>
      </div>
    </main>
  )
}

export default TransferPage
