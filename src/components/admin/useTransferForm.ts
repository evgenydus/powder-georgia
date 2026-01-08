'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'
import { routes } from '@/constants'

import { getInitialValues, type TransferFormData, transferSchema } from './transferSchema'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import { syncEntityMedia } from '@/lib/supabase/syncEntityMedia'
import type { Transfer } from '@/types'

export const useTransferForm = (transfer?: Transfer, mediaIdsRef?: RefObject<string[]>) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const form = useForm<TransferFormData>({
    defaultValues: getInitialValues(transfer),
    resolver: zodResolver(transferSchema) as Resolver<TransferFormData>,
  })

  const { setError, setFocus, setValue, watch } = form
  const currentSlug = watch('slug')

  const handleTitleEnBlur = (title: string) => {
    if (transfer || currentSlug) return
    setValue('slug', slugify(title, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('transfers').select('id').eq('slug', slug)

    if (transfer?.id) query = query.neq('id', transfer.id)
    const { data } = await query.maybeSingle()

    return !!data
  }

  const onSubmit = async (data: TransferFormData) => {
    const slugExists = await checkSlugExists(data.slug)

    if (slugExists) {
      setError('slug', { message: t('admin.transferForm.slug.exists'), type: 'manual' })
      setFocus('slug')

      return
    }

    const isUpdate = !!transfer

    toastInfo(t(`admin.transferForm.toast.${isUpdate ? 'updating' : 'creating'}`))

    if (isUpdate) {
      const { error } = await supabase.from('transfers').update(data).eq('id', transfer.id)

      if (error) {
        toastError(t('admin.transferForm.toast.errorTitle'), {
          error,
          message: t('admin.transferForm.toast.errorMessage'),
        })

        return
      }

      // Sync media for existing transfer
      if (mediaIdsRef?.current) {
        const mediaResult = await syncEntityMedia(
          supabase,
          'transfer',
          transfer.id,
          mediaIdsRef.current,
        )

        if (!mediaResult.success) {
          console.error('Failed to sync media for transfer:', mediaResult.error)
        }
      }
    } else {
      const { data: newTransfer, error } = await supabase
        .from('transfers')
        .insert([data])
        .select('id')
        .single()

      if (error || !newTransfer) {
        toastError(t('admin.transferForm.toast.errorTitle'), {
          error,
          message: t('admin.transferForm.toast.errorMessage'),
        })

        return
      }

      if (mediaIdsRef?.current && mediaIdsRef.current.length > 0) {
        const mediaResult = await syncEntityMedia(
          supabase,
          'transfer',
          newTransfer.id,
          mediaIdsRef.current,
        )

        if (!mediaResult.success) {
          console.error('Failed to sync media for transfer:', mediaResult.error)
        }
      }
    }

    toastSuccess(t(`admin.transferForm.toast.${isUpdate ? 'updated' : 'created'}`))
    router.push(routes.adminTransfers)
  }

  return { form, handleTitleEnBlur, onSubmit }
}
