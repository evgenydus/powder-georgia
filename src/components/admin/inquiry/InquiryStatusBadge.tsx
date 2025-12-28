'use client'

import { useTranslations } from 'next-intl'

type InquiryStatus = 'new' | 'replied' | 'seen'

type InquiryStatusBadgeProps = {
  isProcessed: boolean
  isRead: boolean
}

const getStatus = (isRead: boolean, isProcessed: boolean): InquiryStatus => {
  if (isProcessed) return 'replied'
  if (isRead) return 'seen'

  return 'new'
}

const statusStyles: Record<InquiryStatus, string> = {
  new: 'bg-accent text-accent-foreground',
  replied: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  seen: 'bg-muted text-muted-foreground',
}

export const InquiryStatusBadge = ({ isProcessed, isRead }: InquiryStatusBadgeProps) => {
  const t = useTranslations('admin.status')
  const status = getStatus(isRead, isProcessed)

  return (
    <span
      className={`inline-block w-20 rounded-full px-2 py-1 text-center text-xs font-medium ${statusStyles[status]}`}
    >
      {t(status)}
    </span>
  )
}
