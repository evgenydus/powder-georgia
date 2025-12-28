'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { InquiryStatusBadge } from './InquiryStatusBadge'
import { useInquiryDialog } from './useInquiryDialog'

import type { Inquiry } from '@/types'

type InquiryDetailDialogProps = {
  inquiry: Inquiry
  onOpenChange: (open: boolean) => void
  open: boolean
}

const languageLabels: Record<string, string> = { en: 'English', ka: 'ქართული', ru: 'Русский' }

export const InquiryDetailDialog = ({ inquiry, onOpenChange, open }: InquiryDetailDialogProps) => {
  const t = useTranslations('admin.inquiryDetail')
  const tActions = useTranslations('admin.inquiryActions')
  const tContact = useTranslations('contact.types')

  const { handleMarkAsNew, handleMarkAsReplied } = useInquiryDialog(inquiry, open, () =>
    onOpenChange(false),
  )

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{inquiry.client_name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="capitalize">{tContact(inquiry.inquiry_type)}</span>
            <InquiryStatusBadge isProcessed={inquiry.is_processed} isRead={inquiry.is_read} />
          </DialogDescription>
        </DialogHeader>

        <dl className="space-y-3 text-sm">
          <Field label={t('email')} value={inquiry.client_email} />
          <Field label={t('phone')} value={inquiry.client_phone || t('notProvided')} />
          <Field label={t('message')} pre value={inquiry.message || t('notProvided')} />
          <div className="flex gap-6">
            <Field label={t('language')} value={languageLabels[inquiry.language]} />
            <Field label={t('submittedAt')} value={new Date(inquiry.created_at).toLocaleString()} />
          </div>
        </dl>

        <DialogFooter>
          {inquiry.is_processed ? (
            <Button onClick={handleMarkAsNew} size="sm" variant="ghost">
              {tActions('markNew')}
            </Button>
          ) : (
            <Button onClick={handleMarkAsReplied} size="sm">
              {tActions('markReplied')}
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)} variant="outline">
            {t('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type FieldProps = { label: string; pre?: boolean; value: string }

const Field = ({ label, pre, value }: FieldProps) => (
  <div>
    <dt className="text-muted-foreground">{label}</dt>
    <dd className={`text-foreground ${pre ? 'whitespace-pre-wrap' : ''}`}>{value}</dd>
  </div>
)
