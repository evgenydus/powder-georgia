import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { DeleteTourButton } from '@/components/admin/DeleteTourButton'
import { EditButton } from '@/components/admin/EditButton'
import { PublishTourButton } from '@/components/admin/PublishTourButton'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

async function getTours(): Promise<Tour[]> {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching tours:', error)

    return []
  }
}

const AdminToursPage = async () => {
  const t = await getTranslations('admin')
  const tours = await getTours()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('tours')}</h1>
        <Link href="/admin/tours/new">
          <span className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600">
            Create New
          </span>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-white">
                  {tour.title_en}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-300">
                  ${tour.price_usd}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PublishTourButton isPublished={tour.is_published} tourId={tour.id} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <EditButton href={`/admin/tours/${tour.id}/edit`} />
                    <DeleteTourButton tourId={tour.id} />
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

export default AdminToursPage
