'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Tooltip } from '@/components/ui/tooltip'

import { supabase } from '@/lib/supabase/client'

type DeleteEntityButtonProps = {
  entityId: string
  tableName: string
}

const DeleteEntityButton = ({ entityId, tableName }: DeleteEntityButtonProps) => {
  const router = useRouter()
  const t = useTranslations()
  const { toastError, toastInfo, toastSuccess } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    toastInfo(t('admin.actions.deleting'))

    const { error } = await supabase.from(tableName).delete().eq('id', entityId)

    if (error) {
      toastError(t('admin.actions.deleteError'), {
        error,
        message: t('admin.actions.deleteErrorMessage'),
      })
      setIsLoading(false)

      return
    }

    toastSuccess(t('admin.actions.deleted'))
    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <Tooltip content={t('admin.actions.delete')}>
        <Button onClick={() => setIsOpen(true)} size="icon-sm" variant="ghost">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </Tooltip>
      <ConfirmDialog
        isLoading={isLoading}
        onConfirm={handleDelete}
        onOpenChange={setIsOpen}
        open={isOpen}
      />
    </>
  )
}

export { DeleteEntityButton }
