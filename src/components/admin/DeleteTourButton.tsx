'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

import { supabase } from '@/lib/supabase'

type DeleteTourButtonProps = {
  tourId: string
}

const DeleteTourButton = ({ tourId }: DeleteTourButtonProps) => {
  const router = useRouter()
  const t = useTranslations()
  const { toastError, toastInfo, toastSuccess } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    toastInfo(t('admin.actions.deleting'))

    const { error } = await supabase.from('tours').delete().eq('id', tourId)

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
      <Button onClick={() => setIsOpen(true)} size="icon-sm" variant="ghost">
        <Trash2 className="size-4 text-red-500" />
      </Button>
      <ConfirmDialog
        isLoading={isLoading}
        onConfirm={handleDelete}
        onOpenChange={setIsOpen}
        open={isOpen}
      />
    </>
  )
}

export { DeleteTourButton }
