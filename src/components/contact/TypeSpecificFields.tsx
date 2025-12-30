'use client'

import { useTranslations } from 'next-intl'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { DatePicker, Input } from '@/components/ui'
import type { ContactFormData, InquiryType } from './contactSchema'
import { lessonTypes, skillLevels } from './contactSchema'
import { Field, Select } from './FormPrimitives'

const fieldsWithPreferredDate: InquiryType[] = ['tour', 'apartment', 'instructor']
const fieldsWithGroupSize: InquiryType[] = ['tour', 'transfer', 'apartment']

type TypeSpecificFieldsProps = {
  control: Control<ContactFormData>
  errors: FieldErrors<ContactFormData>
  inquiryType: InquiryType
  register: UseFormRegister<ContactFormData>
}

export const TypeSpecificFields = ({
  control,
  errors,
  inquiryType,
  register,
}: TypeSpecificFieldsProps) => {
  const t = useTranslations()

  return (
    <>
      {inquiryType === 'transfer' && (
        <Field error={errors.route?.message} label={`${t('contact.fields.route')} *`}>
          <Input
            id="route"
            placeholder={t('contact.fields.routePlaceholder')}
            {...register('route')}
          />
        </Field>
      )}

      {fieldsWithPreferredDate.includes(inquiryType) && (
        <Field label={t('contact.fields.preferredDate')}>
          <Controller
            control={control}
            name="preferredDate"
            render={({ field }) => (
              <DatePicker
                onChange={(date) => field.onChange(date?.toISOString())}
                placeholder={t('contact.fields.selectDate')}
                value={field.value ? new Date(field.value) : undefined}
              />
            )}
          />
        </Field>
      )}

      {inquiryType === 'apartment' && (
        <Field label={t('contact.fields.checkOutDate')}>
          <Controller
            control={control}
            name="preferredDateEnd"
            render={({ field }) => (
              <DatePicker
                onChange={(date) => field.onChange(date?.toISOString())}
                placeholder={t('contact.fields.selectDate')}
                value={field.value ? new Date(field.value) : undefined}
              />
            )}
          />
        </Field>
      )}

      {fieldsWithGroupSize.includes(inquiryType) && (
        <Field label={getGroupSizeLabel(inquiryType, t)}>
          <Input id="groupSize" min={1} type="number" {...register('groupSize')} />
        </Field>
      )}

      {inquiryType === 'instructor' && (
        <>
          <Field label={t('contact.fields.lessonType')}>
            <Select id="lessonType" {...register('lessonType')}>
              <option value="">{t('contact.fields.selectOption')}</option>
              {lessonTypes.map((type) => (
                <option key={type} value={type}>
                  {t(`contact.fields.lessonTypes.${type}`)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('contact.fields.skillLevel')}>
            <Select id="skillLevel" {...register('skillLevel')}>
              <option value="">{t('contact.fields.selectOption')}</option>
              {skillLevels.map((level) => (
                <option key={level} value={level}>
                  {t(`contact.fields.skillLevels.${level}`)}
                </option>
              ))}
            </Select>
          </Field>
        </>
      )}
    </>
  )
}

const getGroupSizeLabel = (type: InquiryType, t: ReturnType<typeof useTranslations>) => {
  if (type === 'apartment') return t('contact.fields.guests')
  if (type === 'transfer') return t('contact.fields.passengers')

  return t('contact.fields.groupSize')
}
