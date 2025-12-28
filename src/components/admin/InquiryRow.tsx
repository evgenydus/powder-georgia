'use client'

import { useState } from 'react'

import { Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton'
import { Button } from '@/components/ui/Button'

import type { Inquiry } from '@/types'

import { InquiryDetailDialog } from './InquiryDetailDialog'
import { InquiryStatusBadge } from './InquiryStatusBadge'
import { InquiryStatusButton } from './InquiryStatusButton'

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
        <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
          {inquiry.client_name}
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
          {inquiry.client_email}
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap capitalize">
          {tContact(inquiry.inquiry_type)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <InquiryStatusBadge
            isProcessed={inquiry.is_processed}
            isRead={inquiry.is_read}
          />
        </td>
        <td className="text-foreground/80 px-6 py-4 text-sm whitespace-nowrap">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center justify-end gap-1">
            <Button
              onClick={() => setIsDialogOpen(true)}
              size="icon-sm"
              variant="ghost"
            >
              <Eye className="size-4" />
            </Button>
            <InquiryStatusButton
              inquiryId={inquiry.id}
              isProcessed={inquiry.is_processed}
              isRead={inquiry.is_read}
            />
            <DeleteEntityButton entityId={inquiry.id} tableName="inquiries" />
          </div>
        </td>
      </tr>
      <InquiryDetailDialog
        inquiry={inquiry}
        onOpenChange={setIsDialogOpen}
        open={isDialogOpen}
      />
    </>
  )
}
