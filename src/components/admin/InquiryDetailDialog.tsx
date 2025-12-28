'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
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

import { supabase } from '@/lib/supabase/client'
import type { Inquiry } from '@/types'

import { InquiryStatusBadge } from './InquiryStatusBadge'

type InquiryDetailDialogProps = {
  inquiry: Inquiry
  onOpenChange: (open: boolean) => void
  open: boolean
}

const languageLabels: Record<string, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
}

export const InquiryDetailDialog = ({
  inquiry,
  onOpenChange,
  open,
}: InquiryDetailDialogProps) => {
  const router = useRouter()
  const t = useTranslations('admin.inquiryDetail')
  const tActions = useTranslations('admin.inquiryActions')
  const tContact = useTranslations('contact.types')

  useEffect(() => {
    const markAsSeen = async () => {
      if (open && !inquiry.is_read) {
        await supabase
          .from('inquiries')
          .update({ is_read: true })
          .eq('id', inquiry.id)

        router.refresh()
      }
    }

    markAsSeen()
  }, [inquiry.id, inquiry.is_read, open, router])

  const handleMarkAsNew = async () => {
    await supabase
      .from('inquiries')
      .update({ is_processed: false, is_read: false })
      .eq('id', inquiry.id)

    router.refresh()
    onOpenChange(false)
  }

  const handleMarkAsReplied = async () => {
    await supabase
      .from('inquiries')
      .update({ is_processed: true, is_read: true })
      .eq('id', inquiry.id)

    router.refresh()
  }

  const isReplied = inquiry.is_processed

  const formattedDate = new Date(inquiry.created_at).toLocaleString()

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{inquiry.client_name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="text-muted-foreground capitalize">
              {tContact(inquiry.inquiry_type)}
            </span>
            <InquiryStatusBadge
              isProcessed={inquiry.is_processed}
              isRead={inquiry.is_read}
            />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="text-foreground">{inquiry.client_email}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">{t('phone')}</p>
            <p className="text-foreground">
              {inquiry.client_phone || t('notProvided')}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">{t('message')}</p>
            <p className="text-foreground whitespace-pre-wrap">
              {inquiry.message || t('notProvided')}
            </p>
          </div>

          <div className="flex gap-4">
            <div>
              <p className="text-muted-foreground text-sm">{t('language')}</p>
              <p className="text-foreground">
                {languageLabels[inquiry.language] || inquiry.language}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{t('submittedAt')}</p>
              <p className="text-foreground">{formattedDate}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          {isReplied ? (
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
