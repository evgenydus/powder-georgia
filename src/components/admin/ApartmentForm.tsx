'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui'
import {
  AmenitiesSection,
  CapacityPriceSection,
  DescriptionsSection,
  TitlesSection,
} from './apartment-form'
import { ImageSection } from './image-section'
import { SlugSection } from './SlugSection'
import { useApartmentForm } from './useApartmentForm'

import type { Apartment } from '@/types'

type ApartmentFormProps = {
  apartment?: Apartment
}

const ApartmentForm = ({ apartment }: ApartmentFormProps) => {
  const t = useTranslations()
  const mediaIdsRef = useRef<string[]>([])
  const [mediaDirty, setMediaDirty] = useState(false)
  const { form, handleTitleEnBlur, onSubmit } = useApartmentForm(apartment, mediaIdsRef)

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
  } = form

  useUnsavedChanges({ isDirty: isDirty || mediaDirty, isSubmitSuccessful })

  const handleMediaChange = (ids: string[]) => {
    mediaIdsRef.current = ids
    setMediaDirty(true)
  }

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
      <ImageSection
        entityType="apartment"
        initialMedia={apartment?.media}
        onChange={handleMediaChange}
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
