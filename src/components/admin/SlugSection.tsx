'use client'

import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ChangeHandler, FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

import { FormField } from './FormField'

import { supabase } from '@/lib/supabase/client'

type SlugSectionProps = {
  currentEntityId?: string
  errors: FieldErrors<{ slug: string }>
  register: (name: 'slug') => UseFormRegisterReturn<'slug'>
  tableName: 'apartments' | 'tours' | 'transfers'
}

const SlugSection = ({ currentEntityId, errors, register, tableName }: SlugSectionProps) => {
  const t = useTranslations()
  const [slugExists, setSlugExists] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const formKey = `${tableName.slice(0, -1)}Form`

  const checkSlugExists = useCallback(
    async (slug: string) => {
      if (!slug) return

      setIsChecking(true)

      let query = supabase.from(tableName).select('id').eq('slug', slug)

      if (currentEntityId) {
        query = query.neq('id', currentEntityId)
      }

      const { data } = await query.maybeSingle()

      setSlugExists(!!data)
      setIsChecking(false)
    },
    [currentEntityId, tableName],
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
    if (slugExists) return t(`admin.${formKey}.slug.exists`)

    return t(`admin.${formKey}.validation.required`)
  }

  return (
    <section className="space-y-4">
      <FormField
        error={hasError}
        errorText={hasError ? getErrorText() : undefined}
        id="slug"
        label={`${t(`admin.${formKey}.slug.label`)}${isChecking ? ' ...' : ''}`}
        onBlur={handleBlur}
        placeholder="unique-slug"
        required
        {...rest}
      />
    </section>
  )
}

export { SlugSection }
