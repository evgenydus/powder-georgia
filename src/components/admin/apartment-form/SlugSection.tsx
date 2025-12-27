'use client'

import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ChangeHandler } from 'react-hook-form'

import type { SectionProps } from './types'
import { FormField } from '../FormField'

import { supabase } from '@/lib/supabase'

type SlugSectionProps = SectionProps & {
  currentEntityId?: string
}

const SlugSection = ({ currentEntityId, errors, register }: SlugSectionProps) => {
  const t = useTranslations()
  const [slugExists, setSlugExists] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const checkSlugExists = useCallback(
    async (slug: string) => {
      if (!slug) return

      setIsChecking(true)

      let query = supabase.from('apartments').select('id').eq('slug', slug)

      if (currentEntityId) {
        query = query.neq('id', currentEntityId)
      }

      const { data } = await query.maybeSingle()

      setSlugExists(!!data)
      setIsChecking(false)
    },
    [currentEntityId],
  )

  const { onBlur, ...rest } = register('slug')

  const handleBlur: ChangeHandler = useCallback(
    (e) => {
      onBlur(e)
      checkSlugExists(e.target.value)

      return Promise.resolve()
    },
    [checkSlugExists, onBlur],
  )

  const hasError = !!errors.slug || slugExists

  const getErrorText = () => {
    if (errors.slug?.message) return errors.slug.message
    if (slugExists) return t('admin.apartmentForm.slug.exists')

    return t('admin.apartmentForm.validation.required')
  }

  return (
    <section className="space-y-4">
      <FormField
        error={hasError}
        errorText={hasError ? getErrorText() : undefined}
        id="slug"
        label={`${t('admin.apartmentForm.slug.label')}${isChecking ? ' ...' : ''}`}
        onBlur={handleBlur}
        placeholder="unique-apartment-slug"
        required
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </section>
  )
}

export { SlugSection }
