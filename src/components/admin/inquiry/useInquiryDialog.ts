import { useEffect } from 'react'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Inquiry } from '@/types'

export const useInquiryDialog = (inquiry: Inquiry, open: boolean, onClose: () => void) => {
  const router = useRouter()

  useEffect(() => {
    if (open && !inquiry.is_read) {
      supabase
        .from('inquiries')
        .update({ is_read: true })
        .eq('id', inquiry.id)
        .then(() => router.refresh())
    }
  }, [inquiry.id, inquiry.is_read, open, router])

  const handleMarkAsNew = async () => {
    await supabase
      .from('inquiries')
      .update({ is_processed: false, is_read: false })
      .eq('id', inquiry.id)
    router.refresh()
    onClose()
  }

  const handleMarkAsReplied = async () => {
    await supabase
      .from('inquiries')
      .update({ is_processed: true, is_read: true })
      .eq('id', inquiry.id)
    router.refresh()
  }

  return { handleMarkAsNew, handleMarkAsReplied }
}
