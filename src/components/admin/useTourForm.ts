'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'
import { routes } from '@/constants'

import { getInitialValues, type TourFormData, tourSchema } from './tourSchema'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Tour } from '@/types'

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

export const useTourForm = (tour?: Tour, mediaIdsRef?: RefObject<string[]>) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const form = useForm<TourFormData>({
    defaultValues: getInitialValues(tour),
    resolver: zodResolver(tourSchema) as Resolver<TourFormData>,
  })

  const { setError, setFocus, setValue, watch } = form
  const currentSlug = watch('slug')

  const handleTitleEnBlur = (title: string) => {
    if (tour || currentSlug) return
    setValue('slug', slugify(title, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('tours').select('id').eq('slug', slug)

    if (tour?.id) query = query.neq('id', tour.id)
    const { data } = await query.maybeSingle()

    return !!data
  }

  const onSubmit = async (data: TourFormData) => {
    const slugExists = await checkSlugExists(data.slug)

    if (slugExists) {
      setError('slug', { message: t('admin.tourForm.slug.exists'), type: 'manual' })
      setFocus('slug')

      return
    }

    const isUpdate = !!tour

    toastInfo(t(`admin.tourForm.toast.${isUpdate ? 'updating' : 'creating'}`))

    if (isUpdate) {
      const { error } = await supabase.from('tours').update(data).eq('id', tour.id)

      if (error) {
        toastError(t('admin.tourForm.toast.errorTitle'), {
          error,
          message: t('admin.tourForm.toast.errorMessage'),
        })

        return
      }
    } else {
      const { data: newTour, error } = await supabase
        .from('tours')
        .insert([data])
        .select('id')
        .single()

      if (error || !newTour) {
        toastError(t('admin.tourForm.toast.errorTitle'), {
          error,
          message: t('admin.tourForm.toast.errorMessage'),
        })

        return
      }

      // Sync media for new tour
      if (mediaIdsRef?.current && mediaIdsRef.current.length > 0) {
        await syncEntityMedia('tour', newTour.id, mediaIdsRef.current)
      }
    }

    toastSuccess(t(`admin.tourForm.toast.${isUpdate ? 'updated' : 'created'}`))
    router.push(routes.adminTours)
  }

  return { form, handleTitleEnBlur, onSubmit }
}
