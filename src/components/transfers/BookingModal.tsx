'use client'

import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { vehicleTypes } from '@/constants'
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button, ConfirmDialog } from '@/components/ui'
import { BookingForm } from './BookingForm'

import type { Locale } from '@/i18n/config'
import type { Transfer } from '@/types'

type BookingModalProps = { onClose: () => void; transfer: Transfer }

export const BookingModal = ({ onClose, transfer }: BookingModalProps) => {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const { confirmDialogProps, handleClose } = useUnsavedChanges({
    isDirty: isFormDirty,
    isSubmitSuccessful: isSuccess,
  })

  const title = transfer[`title_${locale}`] || transfer.title_en
  const vehicleLabel = vehicleTypes[transfer.vehicle_type] || transfer.vehicle_type

  const wrappedClose = () => handleClose(onClose)

  return (
    <>
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
      >
        <div className="bg-card w-full max-w-md rounded-lg p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold" id="modal-title">
                {isSuccess ? t('request.successTitle') : t('request.title')}
              </h2>
              {!isSuccess && (
                <p className="text-muted-foreground text-sm">
                  {title} ({vehicleLabel})
                </p>
              )}
            </div>
            <button
              aria-label={t('request.close')}
              className="text-muted-foreground hover:text-foreground"
              onClick={wrappedClose}
            >
              <X className="size-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle className="text-accent mx-auto mb-4 size-16" />
              <p className="text-foreground mb-6">{t('request.successMessage')}</p>
              <Button onClick={onClose}>{t('request.close')}</Button>
            </div>
          ) : (
            <BookingForm
              maxCapacity={transfer.capacity}
              onCancel={wrappedClose}
              onDirtyChange={setIsFormDirty}
              onSuccess={() => setIsSuccess(true)}
              transferId={transfer.id}
            />
          )}
        </div>
      </div>

      <ConfirmDialog {...confirmDialogProps} />
    </>
  )
}
