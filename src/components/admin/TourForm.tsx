'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui/Button'
import { ImageSection } from './image-section'
import { SlugSection } from './SlugSection'
import {
  DescriptionsSection,
  EquipmentSection,
  GroupSizeSection,
  MetricsSection,
  TitlesSection,
  VerticalDropSection,
} from './tour-form'
import { useTourForm } from './useTourForm'

import type { Tour } from '@/types'

type TourFormProps = {
  tour?: Tour
}

const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id, i) => id === b[i])

const TourForm = ({ tour }: TourFormProps) => {
  const t = useTranslations()
  const initialMediaIds = useMemo(() => tour?.media?.map((m) => m.id) ?? [], [tour?.media])
  const mediaIdsRef = useRef<string[]>(initialMediaIds)
  const [mediaDirty, setMediaDirty] = useState(false)
  const { form, handleTitleEnBlur, onSubmit } = useTourForm(tour, mediaIdsRef)

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
  } = form

  useUnsavedChanges({ isDirty: isDirty || mediaDirty, isSubmitSuccessful })

  const handleMediaChange = useCallback(
    (ids: string[]) => {
      mediaIdsRef.current = ids
      setMediaDirty(!arraysEqual(ids, initialMediaIds))
    },
    [initialMediaIds],
  )

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TitlesSection errors={errors} onTitleEnBlur={handleTitleEnBlur} register={register} />
      <SlugSection
        currentEntityId={tour?.id}
        errors={errors}
        register={register}
        tableName="tours"
      />
      <DescriptionsSection errors={errors} register={register} />
      <MetricsSection register={register} />
      <GroupSizeSection register={register} />
      <VerticalDropSection register={register} />
      <EquipmentSection register={register} />
      <ImageSection entityType="tour" initialMedia={tour?.media} onChange={handleMediaChange} />
      <Button type="submit">
        {tour ? t('admin.tourForm.submit.update') : t('admin.tourForm.submit.create')}
      </Button>
    </form>
  )
}

export { TourForm }
