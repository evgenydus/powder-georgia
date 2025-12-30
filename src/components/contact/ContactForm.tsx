'use client'

import { useTranslations } from 'next-intl'

import { Button, Input, Textarea } from '@/components/ui'
import { inquiryTypes } from './contactSchema'
import { Field, Select } from './FormPrimitives'
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
    watch,
  } = useContactForm()

  const inquiryType = watch('inquiryType')

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <Field error={errors.name?.message} label={`${t('contact.name')} *`}>
        <Input id="name" {...register('name')} />
      </Field>

      <Field error={errors.email?.message} label={`${t('contact.email')} *`}>
        <Input id="email" type="email" {...register('email')} />
      </Field>

      <Field label={t('contact.phone')}>
        <Input id="phone" type="tel" {...register('phone')} />
      </Field>

      <Field label={`${t('contact.inquiryType')} *`}>
        <Select id="inquiryType" {...register('inquiryType')}>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {t(`contact.types.${type}`)}
            </option>
          ))}
        </Select>
      </Field>

      <TypeSpecificFields
        control={control}
        errors={errors}
        inquiryType={inquiryType}
        register={register}
      />

      <Field
        error={errors.message?.message}
        label={inquiryType === 'general' ? `${t('contact.message')} *` : t('contact.message')}
      >
        <Textarea id="message" maxLength={2000} rows={5} {...register('message')} />
        <p className="text-muted-foreground mt-1 text-xs">{t('contact.messageHint')}</p>
      </Field>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? t('contact.sending') : t('contact.send')}
      </Button>
    </form>
  )
}
