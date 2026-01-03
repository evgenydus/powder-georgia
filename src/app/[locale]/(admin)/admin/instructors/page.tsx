import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton'
import { EditButton } from '@/components/admin/EditButton'
import { PublishEntityButton } from '@/components/admin/PublishEntityButton'

import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Instructor } from '@/types'

async function getInstructors(): Promise<Instructor[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching instructors:', error)

    return []
  }
}

const AdminInstructorsPage = async () => {
  const t = await getTranslations('admin')
  const instructors = await getInstructors()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('instructors')}</h1>
        <Link href={`${routes.adminInstructors}/new`}>
          <span className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2 transition-colors">
            {t('createNewInstructor')}
          </span>
        </Link>
      </div>

      <div className="bg-card overflow-x-auto rounded-lg">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted">
            <tr>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Name
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Specialization
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Price/Hour
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {instructor.name}
                </td>
                <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
                  {instructor.specialization_en || '-'}
                </td>
                <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
                  {instructor.price_per_hour_usd ? `$${instructor.price_per_hour_usd}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PublishEntityButton
                    entityId={instructor.id}
                    fieldName="is_active"
                    isPublished={instructor.is_active}
                    tableName="instructors"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <EditButton href={`${routes.adminInstructors}/${instructor.id}/edit`} />
                    <DeleteEntityButton entityId={instructor.id} tableName="instructors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminInstructorsPage
