'use client'

import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui'
import {
  AmenitiesSection,
  CapacityPriceSection,
  DescriptionsSection,
  TitlesSection,
} from './apartment-form'
import { SlugSection } from './SlugSection'
import { ImagesSection } from './tour-form'
import { useApartmentForm } from './useApartmentForm'

import type { Apartment } from '@/types'

type ApartmentFormProps = {
  apartment?: Apartment
}

const ApartmentForm = ({ apartment }: ApartmentFormProps) => {
  const t = useTranslations()
  const { form, handleTitleEnBlur, onSubmit } = useApartmentForm(apartment)

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
    setValue,
    watch,
  } = form

  useUnsavedChanges({ isDirty, isSubmitSuccessful })

  const images = watch('images')

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TitlesSection errors={errors} onTitleEnBlur={handleTitleEnBlur} register={register} />
      <SlugSection
        currentEntityId={apartment?.id}
        errors={errors}
        register={register}
        tableName="apartments"
      />
      <DescriptionsSection errors={errors} register={register} />
      <CapacityPriceSection register={register} />
      <AmenitiesSection register={register} />
      <ImagesSection
        entityType="apartment"
        images={images}
        onImagesChange={(imgs) => setValue('images', imgs)}
      />
      <Button type="submit">
        {apartment
          ? t('admin.apartmentForm.submit.update')
          : t('admin.apartmentForm.submit.create')}
      </Button>
    </form>
  )
}

export { ApartmentForm }
