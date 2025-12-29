'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { ChangeHandler } from 'react-hook-form'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

type TitlesSectionProps = SectionProps & {
  onTitleEnBlur?: (title: string) => void
}

const TitlesSection = ({ errors, onTitleEnBlur, register }: TitlesSectionProps) => {
  const t = useTranslations()

  const { onBlur, ...titleEnRest } = register('title_en')

  const handleTitleEnBlur: ChangeHandler = useCallback(
    (e) => {
      onBlur(e)
      onTitleEnBlur?.(e.target.value)

      return Promise.resolve()
    },
    [onBlur, onTitleEnBlur],
  )

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.transferForm.titles.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          error={!!errors.title_en}
          errorText={t('admin.transferForm.validation.required')}
          id="title_en"
          label={t('admin.transferForm.titles.labelEn')}
          onBlur={handleTitleEnBlur}
          required
          {...titleEnRest}
        />
        <FormField
          error={!!errors.title_ka}
          errorText={t('admin.transferForm.validation.required')}
          id="title_ka"
          label={t('admin.transferForm.titles.labelKa')}
          required
          {...register('title_ka')}
        />
        <FormField
          error={!!errors.title_ru}
          errorText={t('admin.transferForm.validation.required')}
          id="title_ru"
          label={t('admin.transferForm.titles.labelRu')}
          required
          {...register('title_ru')}
        />
      </div>
    </section>
  )
}

export { TitlesSection }
