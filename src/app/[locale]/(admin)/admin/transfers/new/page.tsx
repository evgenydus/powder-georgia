import { getTranslations } from 'next-intl/server'

import { TransferForm } from '@/components/admin/TransferForm'

const NewTransferPage = async () => {
  const t = await getTranslations('admin')

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('createNewTransfer')}</h1>
      <TransferForm />
    </div>
  )
}

export default NewTransferPage
