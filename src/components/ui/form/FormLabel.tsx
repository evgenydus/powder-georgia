'use client'

import * as React from 'react'
import type * as LabelPrimitive from '@radix-ui/react-label'

import { Label } from '@/components/ui/Label'
import { useFormField } from './context'

import { cn } from '@/lib/utils'

type FormLabelProps = {
  children: React.ReactNode
  className?: string
}

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({ children, className }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId}>
        {children}
      </Label>
    )
  },
)

FormLabel.displayName = 'FormLabel'

export { FormLabel }
