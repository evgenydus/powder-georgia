'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { useFormField } from './context'

type FormControlProps = {
  children: React.ReactNode
}

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(
  ({ children }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        id={formItemId}
      >
        {children}
      </Slot>
    )
  },
)

FormControl.displayName = 'FormControl'

export { FormControl }
