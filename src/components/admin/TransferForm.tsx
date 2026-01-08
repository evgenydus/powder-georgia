'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui'
import { ImageSection } from './image-section'
import { SlugSection } from './SlugSection'
import {
  DescriptionsSection,
  PriceSection,
  TitlesSection,
  VehicleCapacitySection,
} from './transfer-form'
import { useTransferForm } from './useTransferForm'

import type { Transfer } from '@/types'

type TransferFormProps = {
  transfer?: Transfer
}

const TransferForm = ({ transfer }: TransferFormProps) => {
  const t = useTranslations()
  const mediaIdsRef = useRef<string[]>([])
  const [mediaDirty, setMediaDirty] = useState(false)
  const { form, handleTitleEnBlur, onSubmit } = useTransferForm(transfer, mediaIdsRef)

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
        currentEntityId={transfer?.id}
        errors={errors}
        register={register}
        tableName="transfers"
      />
      <VehicleCapacitySection errors={errors} register={register} />
      <PriceSection register={register} />
      <DescriptionsSection register={register} />
      <ImageSection
        entityType="transfer"
        initialMedia={transfer?.media}
        limit={1}
        onChange={handleMediaChange}
      />
      <Button type="submit">
        {transfer ? t('admin.transferForm.submit.update') : t('admin.transferForm.submit.create')}
      </Button>
    </form>
  )
}

export { TransferForm }
