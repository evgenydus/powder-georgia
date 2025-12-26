'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'
import {
  DescriptionsSection,
  EquipmentSection,
  GroupSizeSection,
  ImagesSection,
  MetricsSection,
  SlugSection,
  TitlesSection,
  VerticalDropSection,
} from './tour-form'
import { getInitialValues, type TourFormData, tourSchema } from './tourSchema'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

type TourFormProps = {
  tour?: Tour
}

const TourForm = ({ tour }: TourFormProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setFocus,
    setValue,
    watch,
  } = useForm<TourFormData>({
    defaultValues: getInitialValues(tour),
    resolver: zodResolver(tourSchema) as Resolver<TourFormData>,
  })

  const images = watch('images')
  const currentSlug = watch('slug')

  const handleTitleEnBlur = (title: string) => {
    if (tour) return
    if (currentSlug) return

    setValue('slug', slugify(title, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('tours').select('id').eq('slug', slug)

    if (tour?.id) {
      query = query.neq('id', tour.id)
    }

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

    toastInfo(tour ? t('admin.tourForm.toast.updating') : t('admin.tourForm.toast.creating'))

    const { error } = tour
      ? await supabase.from('tours').update(data).eq('id', tour.id)
      : await supabase.from('tours').insert([data])

    if (error) {
      toastError(t('admin.tourForm.toast.errorTitle'), {
        error,
        message: t('admin.tourForm.toast.errorMessage'),
      })

      return
    }

    toastSuccess(tour ? t('admin.tourForm.toast.updated') : t('admin.tourForm.toast.created'))
    router.push('/admin/tours')
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TitlesSection errors={errors} onTitleEnBlur={handleTitleEnBlur} register={register} />
      <SlugSection currentTourId={tour?.id} errors={errors} register={register} />
      <DescriptionsSection errors={errors} register={register} />
      <MetricsSection register={register} />
      <GroupSizeSection register={register} />
      <VerticalDropSection register={register} />
      <EquipmentSection register={register} />
      <ImagesSection
        entityType="tour"
        images={images}
        onImagesChange={(imgs) => setValue('images', imgs)}
      />
      <Button type="submit">
        {tour ? t('admin.tourForm.submit.update') : t('admin.tourForm.submit.create')}
      </Button>
    </form>
  )
}

export { TourForm }
