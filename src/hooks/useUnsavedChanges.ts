'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type UseUnsavedChangesOptions = {
  isDirty: boolean
  isSubmitSuccessful?: boolean
}

export const useUnsavedChanges = ({
  isDirty,
  isSubmitSuccessful = false,
}: UseUnsavedChangesOptions) => {
  const t = useTranslations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const pendingAction = useRef<(() => void) | null>(null)

  const shouldBlock = isDirty && !isSubmitSuccessful

  // Handle browser close/refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlock) {
        e.preventDefault()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [shouldBlock])

  const handleClose = useCallback(
    (onClose: () => void) => {
      if (shouldBlock) {
        pendingAction.current = onClose
        setIsDialogOpen(true)
      } else {
        onClose()
      }
    },
    [shouldBlock],
  )

  const handleConfirm = useCallback(() => {
    pendingAction.current?.()
    pendingAction.current = null
    setIsDialogOpen(false)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      pendingAction.current = null
    }

    setIsDialogOpen(open)
  }, [])

  return {
    confirmDialogProps: {
      cancelText: t('common.unsavedChanges.cancel'),
      confirmText: t('common.unsavedChanges.confirm'),
      description: t('common.unsavedChanges.description'),
      onConfirm: handleConfirm,
      onOpenChange: handleOpenChange,
      open: isDialogOpen,
      title: t('common.unsavedChanges.title'),
    },
    handleClose,
    shouldBlock,
  }
}
