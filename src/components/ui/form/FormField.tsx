'use client'

import * as React from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { FormFieldContext } from './context'

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    {/* JSX keeps generic inference intact for the Controller render */}
    <Controller {...props} />
  </FormFieldContext.Provider>
)

export { FormField }
