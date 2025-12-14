'use client'

import * as React from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)
const FormItemContext = React.createContext<{ id: string } | null>(null)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { formState, getFieldState } = useFormContext()

  if (!fieldContext || !itemContext) {
    throw new Error('useFormField should be used within <FormField> and <FormItem>')
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
    id: itemContext.id,
    name: fieldContext.name,
    ...fieldState,
  }
}

export { FormFieldContext, FormItemContext, useFormField }
export type { FormFieldContextValue }
