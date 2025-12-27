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

  /* eslint-disable react/jsx-props-no-spreading -- register() returns known props */
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.tourForm.titles.heading')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          error={!!errors.title_en}
          errorText={t('admin.tourForm.validation.required')}
          id="title_en"
          label={t('admin.tourForm.titles.labelEn')}
          onBlur={handleTitleEnBlur}
          required
          {...titleEnRest}
        />
        <FormField
          error={!!errors.title_ka}
          errorText={t('admin.tourForm.validation.required')}
          id="title_ka"
          label={t('admin.tourForm.titles.labelKa')}
          required
          {...register('title_ka')}
        />
        <FormField
          error={!!errors.title_ru}
          errorText={t('admin.tourForm.validation.required')}
          id="title_ru"
          label={t('admin.tourForm.titles.labelRu')}
          required
          {...register('title_ru')}
        />
      </div>
    </section>
  )
}
/* eslint-enable react/jsx-props-no-spreading */

export { TitlesSection }
