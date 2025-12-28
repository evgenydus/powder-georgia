'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton'
import { InquiryDetailDialog } from './InquiryDetailDialog'
import { InquiryStatusBadge } from './InquiryStatusBadge'
import { InquiryStatusButton } from './InquiryStatusButton'

import type { Inquiry } from '@/types'

type InquiryRowProps = {
  inquiry: Inquiry
}

export const InquiryRow = ({ inquiry }: InquiryRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const tContact = useTranslations('contact.types')

  const formattedDate = new Date(inquiry.created_at).toLocaleDateString()

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <button
            className="text-foreground hover:text-accent font-medium hover:underline"
            onClick={() => setIsDialogOpen(true)}
            type="button"
          >
            {inquiry.client_name}
          </button>
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
          {inquiry.client_email}
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap capitalize">
          {tContact(inquiry.inquiry_type)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <InquiryStatusBadge isProcessed={inquiry.is_processed} isRead={inquiry.is_read} />
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">{formattedDate}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center justify-end gap-1">
            <InquiryStatusButton
              inquiryId={inquiry.id}
              isProcessed={inquiry.is_processed}
              isRead={inquiry.is_read}
            />
            <DeleteEntityButton entityId={inquiry.id} tableName="inquiries" />
          </div>
        </td>
      </tr>
      <InquiryDetailDialog inquiry={inquiry} onOpenChange={setIsDialogOpen} open={isDialogOpen} />
    </>
  )
}
