import { getTranslations } from 'next-intl/server'

import { TourForm } from '@/components/admin/TourForm'

const NewTourPage = async () => {
  const t = await getTranslations('admin')

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('createNewTour')}</h1>
      <TourForm />
    </div>
  )
}

export default NewTourPage
