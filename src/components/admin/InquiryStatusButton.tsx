'use client'

import { CheckCircle, Circle, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/tooltip'

import { supabase } from '@/lib/supabase/client'

type InquiryStatus = 'new' | 'replied' | 'seen'

type InquiryStatusButtonProps = {
  inquiryId: string
  isProcessed: boolean
  isRead: boolean
}

const getStatus = (isRead: boolean, isProcessed: boolean): InquiryStatus => {
  if (isProcessed) return 'replied'
  if (isRead) return 'seen'

  return 'new'
}

const getNextStatus = (current: InquiryStatus): InquiryStatus => {
  const order: InquiryStatus[] = ['new', 'seen', 'replied']
  const currentIndex = order.indexOf(current)

  return order[(currentIndex + 1) % order.length]
}

const statusUpdates: Record<InquiryStatus, { is_processed: boolean; is_read: boolean }> = {
  new: { is_processed: false, is_read: false },
  replied: { is_processed: true, is_read: true },
  seen: { is_processed: false, is_read: true },
}

const statusIcons: Record<InquiryStatus, typeof Circle> = {
  new: Circle,
  replied: CheckCircle,
  seen: Eye,
}

export const InquiryStatusButton = ({
  inquiryId,
  isProcessed,
  isRead,
}: InquiryStatusButtonProps) => {
  const router = useRouter()
  const t = useTranslations('admin.inquiryActions')
  const { toastError, toastInfo, toastSuccess } = useToast()

  const currentStatus = getStatus(isRead, isProcessed)
  const nextStatus = getNextStatus(currentStatus)

  const buttonLabels: Record<InquiryStatus, string> = {
    new: t('markNew'),
    replied: t('markReplied'),
    seen: t('markSeen'),
  }

  const handleToggle = async () => {
    toastInfo(t('updating'))

    const { error } = await supabase
      .from('inquiries')
      .update(statusUpdates[nextStatus])
      .eq('id', inquiryId)

    if (error) {
      toastError(t('updateError'), { error, message: t('updateError') })

      return
    }

    toastSuccess(t('updated'))
    router.refresh()
  }

  const Icon = statusIcons[nextStatus]

  return (
    <Tooltip content={buttonLabels[nextStatus]}>
      <Button onClick={handleToggle} size="icon-sm" variant="ghost">
        <Icon className="size-4" />
      </Button>
    </Tooltip>
  )
}
