'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'
import {
  ActiveSection,
  DescriptionsSection,
  EquipmentSection,
  GroupSizeSection,
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
    setValue,
    watch,
  } = useForm<TourFormData>({
    defaultValues: getInitialValues(tour),
    resolver: zodResolver(tourSchema) as Resolver<TourFormData>,
  })

  const isActive = watch('is_active')

  const onSubmit = async (data: TourFormData) => {
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
      <TitlesSection errors={errors} register={register} />
      <SlugSection errors={errors} register={register} />
      <DescriptionsSection errors={errors} register={register} />
      <MetricsSection register={register} />
      <GroupSizeSection register={register} />
      <VerticalDropSection register={register} />
      <EquipmentSection register={register} />
      <ActiveSection
        isActive={isActive}
        onCheckedChange={(checked) => setValue('is_active', checked === true)}
      />
      <Button type="submit">
        {tour ? t('admin.tourForm.submit.update') : t('admin.tourForm.submit.create')}
      </Button>
    </form>
  )
}

export { TourForm }
