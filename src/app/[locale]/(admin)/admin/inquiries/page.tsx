import { getTranslations } from 'next-intl/server'

import { InquiryRow } from '@/components/admin'

import { createClient } from '@/lib/supabase/server'
import type { Inquiry } from '@/types'

async function getInquiries(): Promise<Inquiry[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching inquiries:', error)

    return []
  }
}

const AdminInquiriesPage = async () => {
  const t = await getTranslations('admin')
  const inquiries = await getInquiries()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('inquiries')}</h1>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-muted-foreground">{t('noInquiries')}</p>
      ) : (
        <div className="bg-card overflow-x-auto rounded-lg">
          <table className="divide-border min-w-full divide-y">
            <thead className="bg-muted">
              <tr>
                <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  {t('table.clientName')}
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  {t('table.email')}
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  {t('table.type')}
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  {t('table.status')}
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  {t('table.date')}
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {inquiries.map((inquiry) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminInquiriesPage
