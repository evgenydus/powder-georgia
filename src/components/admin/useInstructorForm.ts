'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'
import { routes } from '@/constants'

import { getInitialValues, type InstructorFormData, instructorSchema } from './instructorSchema'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import { syncEntityMedia } from '@/lib/supabase/syncEntityMedia'
import type { Instructor } from '@/types'

export const useInstructorForm = (instructor?: Instructor, mediaIdsRef?: RefObject<string[]>) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const form = useForm<InstructorFormData>({
    defaultValues: getInitialValues(instructor),
    resolver: zodResolver(instructorSchema) as Resolver<InstructorFormData>,
  })

  const { setError, setFocus, setValue, watch } = form
  const currentSlug = watch('slug')

  const handleNameBlur = (name: string) => {
    if (instructor || currentSlug) return
    setValue('slug', slugify(name, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('instructors').select('id').eq('slug', slug)

    if (instructor?.id) query = query.neq('id', instructor.id)
    const { data } = await query.maybeSingle()

    return !!data
  }

  const onSubmit = async (data: InstructorFormData) => {
    const slugExists = await checkSlugExists(data.slug)

    if (slugExists) {
      setError('slug', { message: t('admin.instructorForm.slug.exists'), type: 'manual' })
      setFocus('slug')

      return
    }

    const isUpdate = !!instructor

    toastInfo(t(`admin.instructorForm.toast.${isUpdate ? 'updating' : 'creating'}`))

    if (isUpdate) {
      const { error } = await supabase.from('instructors').update(data).eq('id', instructor.id)

      if (error) {
        toastError(t('admin.instructorForm.toast.errorTitle'), {
          error,
          message: t('admin.instructorForm.toast.errorMessage'),
        })

        return
      }
    } else {
      const { data: newInstructor, error } = await supabase
        .from('instructors')
        .insert([data])
        .select('id')
        .single()

      if (error || !newInstructor) {
        toastError(t('admin.instructorForm.toast.errorTitle'), {
          error,
          message: t('admin.instructorForm.toast.errorMessage'),
        })

        return
      }

      if (mediaIdsRef?.current && mediaIdsRef.current.length > 0) {
        const mediaResult = await syncEntityMedia(
          supabase,
          'instructor',
          newInstructor.id,
          mediaIdsRef.current,
        )

        if (!mediaResult.success) {
          console.error('Failed to sync media for instructor:', mediaResult.error)
        }
      }
    }

    toastSuccess(t(`admin.instructorForm.toast.${isUpdate ? 'updated' : 'created'}`))
    router.push(routes.adminInstructors)
  }

  return { form, handleNameBlur, onSubmit }
}
