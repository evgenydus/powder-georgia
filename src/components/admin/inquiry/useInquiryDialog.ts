import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'
import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Inquiry } from '@/types'

export const useInquiryDialog = (inquiry: Inquiry, open: boolean, onClose: () => void) => {
  const router = useRouter()
  const t = useTranslations('admin.inquiryActions')
  const { toastError } = useToast()

  useEffect(() => {
    if (open && !inquiry.is_read) {
      supabase
        .from('inquiries')
        .update({ is_read: true })
        .eq('id', inquiry.id)
        .then(({ error }) => {
          if (error) {
            toastError(t('updateError'), { error, message: t('updateError') })
          } else {
            router.refresh()
          }
        })
    }
  }, [inquiry.id, inquiry.is_read, open, router, t, toastError])

  const handleMarkAsNew = async () => {
    const { error } = await supabase
      .from('inquiries')
      .update({ is_processed: false, is_read: false })
      .eq('id', inquiry.id)

    if (error) {
      toastError(t('updateError'), { error, message: t('updateError') })
      return
    }

    router.refresh()
    onClose()
  }

  const handleMarkAsReplied = async () => {
    const { error } = await supabase
      .from('inquiries')
      .update({ is_processed: true, is_read: true })
      .eq('id', inquiry.id)

    if (error) {
      toastError(t('updateError'), { error, message: t('updateError') })
      return
    }

    router.refresh()
  }

  return { handleMarkAsNew, handleMarkAsReplied }
}
