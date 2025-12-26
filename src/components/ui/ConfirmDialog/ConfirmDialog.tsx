'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'

type ConfirmDialogProps = {
  cancelText?: string
  confirmText?: string
  description?: string
  isLoading?: boolean
  onConfirm: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  variant?: 'default' | 'destructive'
}

const ConfirmDialog = ({
  cancelText,
  confirmText,
  description,
  isLoading = false,
  onConfirm,
  onOpenChange,
  open,
  title,
  variant = 'destructive',
}: ConfirmDialogProps) => {
  const t = useTranslations()

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? t('common.confirmDialog.title')}</DialogTitle>
          <DialogDescription>
            {description ?? t('common.confirmDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              {cancelText ?? t('common.confirmDialog.cancel')}
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={onConfirm} variant={variant}>
            {isLoading
              ? t('common.confirmDialog.loading')
              : (confirmText ?? t('common.confirmDialog.confirm'))}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
