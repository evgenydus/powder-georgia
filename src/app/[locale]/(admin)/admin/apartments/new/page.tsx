import { getTranslations } from 'next-intl/server'

import { ApartmentForm } from '@/components/admin/ApartmentForm'

const NewApartmentPage = async () => {
  const t = await getTranslations('admin')

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('createNewApartment')}</h1>
      <ApartmentForm />
    </div>
  )
}

export default NewApartmentPage
