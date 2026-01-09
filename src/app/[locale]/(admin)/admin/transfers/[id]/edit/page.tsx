import { getTranslations } from 'next-intl/server'

import { TransferForm } from '@/components/admin/TransferForm'

import { fetchMediaForEntity } from '@/lib/supabase/queries'
import { createClient } from '@/lib/supabase/server'
import type { Transfer } from '@/types'

async function getTransferById(id: string): Promise<Transfer | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('transfers').select('*').eq('id', id).single()

    if (error) {
      console.error('Supabase error:', error)

      return null
    }

    if (!data) return null

    return fetchMediaForEntity(supabase, data, 'transfer')
  } catch (error) {
    console.error('Error fetching transfer:', error)

    return null
  }
}

const EditTransferPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const t = await getTranslations('admin')
  const { id } = await params
  const transfer = await getTransferById(id)

  if (!transfer) {
    return <div>{t('transferNotFound')}</div>
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('editTransfer')}</h1>
      <TransferForm transfer={transfer} />
    </div>
  )
}

export default EditTransferPage
