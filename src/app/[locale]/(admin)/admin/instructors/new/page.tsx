import { getTranslations } from 'next-intl/server'

import { InstructorForm } from '@/components/admin/InstructorForm'

const NewInstructorPage = async () => {
  const t = await getTranslations('admin')

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('createNewInstructor')}</h1>
      <InstructorForm />
    </div>
  )
}

export default NewInstructorPage
