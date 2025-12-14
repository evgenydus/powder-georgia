'use client'

import * as React from 'react'

import { useFormField } from './context'

import { cn } from '@/lib/utils'

type FormTextProps = {
  children: React.ReactNode
  className?: string
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormTextProps>(
  ({ children, className }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        id={formDescriptionId}
      >
        {children}
      </p>
    )
  },
)

FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<HTMLParagraphElement, FormTextProps>(
  ({ children, className }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        className={cn('text-destructive text-sm font-medium', className)}
        id={formMessageId}
      >
        {body}
      </p>
    )
  },
)

FormMessage.displayName = 'FormMessage'

export { FormDescription, FormMessage }
