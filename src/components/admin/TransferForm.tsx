'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { SlugSection } from './SlugSection'
import {
  DescriptionsSection,
  ImageSection,
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
  const { form, handleTitleEnBlur, onSubmit } = useTransferForm(transfer)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = form

  const imageUrl = watch('image_url') || ''

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
      <ImageSection imageUrl={imageUrl} setValue={setValue} />
      <Button type="submit">
        {transfer ? t('admin.transferForm.submit.update') : t('admin.transferForm.submit.create')}
      </Button>
    </form>
  )
}

export { TransferForm }
