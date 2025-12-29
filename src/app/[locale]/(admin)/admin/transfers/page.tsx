import { getTranslations } from 'next-intl/server'

import { routes, vehicleTypes } from '@/constants'

import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminTable, Tbody, Td, Th, Thead } from '@/components/admin/AdminTable'
import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton'
import { EditButton } from '@/components/admin/EditButton'
import { PublishEntityButton } from '@/components/admin/PublishEntityButton'

import { createClient } from '@/lib/supabase/server'
import type { Transfer } from '@/types'

const getTransfers = async (): Promise<Transfer[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('transfers')
    .select('*')
    .order('created_at', { ascending: false })

  return data || []
}

const AdminTransfersPage = async () => {
  const t = await getTranslations('admin')
  const transfers = await getTransfers()

  return (
    <div>
      <AdminPageHeader
        createHref={`${routes.adminTransfers}/new`}
        createLabel={t('createNewTransfer')}
        title={t('transfers')}
      />
      <AdminTable>
        <Thead>
          <Th>Title</Th>
          <Th>Vehicle</Th>
          <Th>Capacity</Th>
          <Th>Price</Th>
          <Th>Status</Th>
          <Th />
        </Thead>
        <Tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <Td className="text-foreground font-medium">{transfer.title_en}</Td>
              <Td className="text-foreground/80">
                {vehicleTypes[transfer.vehicle_type] || transfer.vehicle_type}
              </Td>
              <Td className="text-foreground/80">{transfer.capacity}</Td>
              <Td className="text-foreground/80">${transfer.price_usd}</Td>
              <Td>
                <PublishEntityButton
                  entityId={transfer.id}
                  fieldName="is_active"
                  isPublished={transfer.is_active}
                  tableName="transfers"
                />
              </Td>
              <Td>
                <div className="flex justify-end gap-1">
                  <EditButton href={`${routes.adminTransfers}/${transfer.id}/edit`} />
                  <DeleteEntityButton entityId={transfer.id} tableName="transfers" />
                </div>
              </Td>
            </tr>
          ))}
        </Tbody>
      </AdminTable>
    </div>
  )
}

export default AdminTransfersPage
