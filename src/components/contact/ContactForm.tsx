'use client'

import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import { Button, FormField, Input, Textarea } from '@/components/ui'
import type { ContactFormData } from './contactSchema'
import { inquiryTypes } from './contactSchema'
import { Select } from './FormPrimitives'
import { TypeSpecificFields } from './TypeSpecificFields'
import { useContactForm } from './useContactForm'

export const ContactForm = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
    isSubmitting,
    onSubmit,
    register,
  } = useContactForm()

  const inquiryType =
    useWatch<ContactFormData, 'inquiryType'>({ control, name: 'inquiryType' }) ?? 'general'

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <FormField error={errors.name?.message} htmlFor="name" label={t('contact.name')} required>
        <Input id="name" {...register('name')} />
      </FormField>

      <FormField error={errors.email?.message} htmlFor="email" label={t('contact.email')} required>
        <Input id="email" type="email" {...register('email')} />
      </FormField>

      <FormField htmlFor="phone" label={t('contact.phone')}>
        <Input id="phone" type="tel" {...register('phone')} />
      </FormField>

      <FormField htmlFor="inquiryType" label={t('contact.inquiryType')} required>
        <Select id="inquiryType" {...register('inquiryType')}>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {t(`contact.types.${type}`)}
            </option>
          ))}
        </Select>
      </FormField>

      <TypeSpecificFields
        control={control}
        errors={errors}
        inquiryType={inquiryType}
        register={register}
      />

      <FormField
        description={t('contact.messageHint')}
        error={errors.message?.message}
        htmlFor="message"
        label={t('contact.message')}
        required={inquiryType === 'general'}
      >
        <Textarea id="message" maxLength={2000} rows={5} {...register('message')} />
      </FormField>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? t('contact.sending') : t('contact.send')}
      </Button>
    </form>
  )
}
