'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
    toastInfo(tour ? 'Updating tour...' : 'Creating tour...')

    const { error } = tour
      ? await supabase.from('tours').update(data).eq('id', tour.id)
      : await supabase.from('tours').insert([data])

    if (error) {
      toastError('Error', { error, message: 'Failed to save tour' })

      return
    }

    toastSuccess(tour ? 'Tour updated!' : 'Tour created!')
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
        onCheckedChange={(checked) => setValue('is_active', !!checked)}
      />
      <Button type="submit">{tour ? 'Update Tour' : 'Create Tour'}</Button>
    </form>
  )
}

export { TourForm }
