'use client'

import { useTranslations } from 'next-intl'

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
import { useTourForm } from './useTourForm'

import type { Tour } from '@/types'

type TourFormProps = {
  tour?: Tour
}

const TourForm = ({ tour }: TourFormProps) => {
  const t = useTranslations()
  const { form, handleTitleEnBlur, onSubmit } = useTourForm(tour)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = form

  const images = watch('images')

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TitlesSection errors={errors} onTitleEnBlur={handleTitleEnBlur} register={register} />
      <SlugSection currentEntityId={tour?.id} errors={errors} register={register} />
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
