import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton'
import { EditButton } from '@/components/admin/EditButton'
import { PublishEntityButton } from '@/components/admin/PublishEntityButton'

import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

async function getApartments(): Promise<Apartment[]> {
  try {
    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching apartments:', error)

    return []
  }
}

const AdminApartmentsPage = async () => {
  const t = await getTranslations('admin')
  const apartments = await getApartments()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('apartments')}</h1>
        <Link href={`${routes.adminApartments}/new`}>
          <span className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2 transition-colors">
            {t('createNewApartment')}
          </span>
        </Link>
      </div>

      <div className="bg-card overflow-x-auto rounded-lg">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted">
            <tr>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Title
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Capacity
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Price/Night
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
            {apartments.map((apartment) => (
              <tr key={apartment.id}>
                <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {apartment.title_en}
                </td>
                <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
                  {apartment.capacity}
                </td>
                <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
                  ${apartment.price_per_night_usd}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PublishEntityButton
                    entityId={apartment.id}
                    fieldName="is_active"
                    isPublished={apartment.is_active}
                    tableName="apartments"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <EditButton href={`${routes.adminApartments}/${apartment.id}/edit`} />
                    <DeleteEntityButton entityId={apartment.id} tableName="apartments" />
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

export default AdminApartmentsPage
