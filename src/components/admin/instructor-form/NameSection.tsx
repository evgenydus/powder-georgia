'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { ChangeHandler } from 'react-hook-form'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

type NameSectionProps = SectionProps & {
  onNameBlur?: (name: string) => void
}

const NameSection = ({ errors, onNameBlur, register }: NameSectionProps) => {
  const t = useTranslations()

  const { onBlur, ...nameRest } = register('name')

  const handleNameBlur: ChangeHandler = useCallback(
    (e) => {
      onBlur(e)
      onNameBlur?.(e.target.value)

      return Promise.resolve()
    },
    [onBlur, onNameBlur],
  )

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{t('admin.instructorForm.name.heading')}</h3>
      <div className="max-w-md">
        <FormField
          error={!!errors.name}
          errorText={t('admin.instructorForm.validation.required')}
          id="name"
          label={t('admin.instructorForm.name.label')}
          onBlur={handleNameBlur}
          required
          {...nameRest}
        />
      </div>
    </section>
  )
}

export { NameSection }
