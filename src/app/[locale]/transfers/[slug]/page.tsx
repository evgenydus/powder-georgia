
import { getLocale, getTranslations } from 'next-intl/server'
import { supabase } from '@/lib/supabase'
import type { Transfer } from '@/types'
import Image from 'next/image'

async function getTransferBySlug(slug: string): Promise<Transfer | null> {
  try {
    const { data, error } = await supabase
      .from('transfers')
      .select('*')
      .eq('slug', slug)
      .single()

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

export default async function TransferPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const locale = await getLocale()
  const t = await getTranslations()
  const transfer = await getTransferBySlug(slug)

  if (!transfer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-primary">
        <h1 className="text-2xl text-white">{t('errors.notFound')}</h1>
      </main>
    )
  }

  const title = transfer[`title_${locale as 'en' | 'ka' | 'ru'}`] || transfer.title_en
  const route = transfer[`route_${locale as 'en' | 'ka' | 'ru'}`] || transfer.route_en
  const description =
    transfer[`description_${locale as 'en' | 'ka' | 'ru'}`] ||
    transfer.description_en

  return (
    <main className="min-h-screen bg-primary text-white">
      <div className="relative h-96 w-full">
        <Image
          src={transfer.image_url}
          alt={title}
          fill
          className="object-cover"
        />
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
          <p className="text-3xl font-bold text-orange-400">${transfer.price_usd}</p>
        </div>
      </div>
    </main>
  )
}
