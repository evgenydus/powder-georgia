'use client'

import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button, ConfirmDialog } from '@/components/ui'
import { LessonForm } from './LessonForm'

import type { Instructor } from '@/types'

type LessonModalProps = { instructor: Instructor; onClose: () => void }

export const LessonModal = ({ instructor, onClose }: LessonModalProps) => {
  const t = useTranslations()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const { confirmDialogProps, handleClose } = useUnsavedChanges({
    isDirty: isFormDirty,
    isSubmitSuccessful: isSuccess,
  })

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
                {isSuccess ? t('lessonRequest.successTitle') : t('lessonRequest.title')}
              </h2>
              {!isSuccess && <p className="text-muted-foreground text-sm">{instructor.name}</p>}
            </div>
            <button
              aria-label={t('lessonRequest.close')}
              className="text-muted-foreground hover:text-foreground"
              onClick={wrappedClose}
            >
              <X className="size-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle className="text-accent mx-auto mb-4 size-16" />
              <p className="text-foreground mb-6">{t('lessonRequest.successMessage')}</p>
              <Button onClick={onClose}>{t('lessonRequest.close')}</Button>
            </div>
          ) : (
            <LessonForm
              instructorId={instructor.id}
              onCancel={wrappedClose}
              onDirtyChange={setIsFormDirty}
              onSuccess={() => setIsSuccess(true)}
            />
          )}
        </div>
      </div>

      <ConfirmDialog {...confirmDialogProps} />
    </>
  )
}
