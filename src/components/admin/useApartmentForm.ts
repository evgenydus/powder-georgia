'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'
import { routes } from '@/constants'

import { type ApartmentFormData, apartmentSchema, getInitialValues } from './apartmentSchema'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Apartment } from '@/types'

const syncEntityMedia = async (entityType: string, entityId: string, mediaIds: string[]) => {
  if (mediaIds.length === 0) return

  const records = mediaIds.map((mediaId, index) => ({
    entity_id: entityId,
    entity_type: entityType,
    media_id: mediaId,
    position: index,
  }))

  await supabase.from('entity_media').insert(records)
}

export const useApartmentForm = (apartment?: Apartment, mediaIdsRef?: RefObject<string[]>) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const form = useForm<ApartmentFormData>({
    defaultValues: getInitialValues(apartment),
    resolver: zodResolver(apartmentSchema) as Resolver<ApartmentFormData>,
  })

  const { setError, setFocus, setValue, watch } = form
  const currentSlug = watch('slug')

  const handleTitleEnBlur = (title: string) => {
    if (apartment || currentSlug) return
    setValue('slug', slugify(title, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('apartments').select('id').eq('slug', slug)

    if (apartment?.id) query = query.neq('id', apartment.id)
    const { data } = await query.maybeSingle()

    return !!data
  }

  const onSubmit = async (data: ApartmentFormData) => {
    const slugExists = await checkSlugExists(data.slug)

    if (slugExists) {
      setError('slug', { message: t('admin.apartmentForm.slug.exists'), type: 'manual' })
      setFocus('slug')

      return
    }

    const isUpdate = !!apartment

    toastInfo(t(`admin.apartmentForm.toast.${isUpdate ? 'updating' : 'creating'}`))

    if (isUpdate) {
      const { error } = await supabase.from('apartments').update(data).eq('id', apartment.id)

      if (error) {
        toastError(t('admin.apartmentForm.toast.errorTitle'), {
          error,
          message: t('admin.apartmentForm.toast.errorMessage'),
        })

        return
      }
    } else {
      const { data: newApartment, error } = await supabase
        .from('apartments')
        .insert([data])
        .select('id')
        .single()

      if (error || !newApartment) {
        toastError(t('admin.apartmentForm.toast.errorTitle'), {
          error,
          message: t('admin.apartmentForm.toast.errorMessage'),
        })

        return
      }

      if (mediaIdsRef?.current && mediaIdsRef.current.length > 0) {
        await syncEntityMedia('apartment', newApartment.id, mediaIdsRef.current)
      }
    }

    toastSuccess(t(`admin.apartmentForm.toast.${isUpdate ? 'updated' : 'created'}`))
    router.push(routes.adminApartments)
  }

  return { form, handleTitleEnBlur, onSubmit }
}
