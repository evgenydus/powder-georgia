'use client'

import * as React from 'react'

import { FormItemContext } from './context'

import { cn } from '@/lib/utils'

type FormItemProps = {
  children: React.ReactNode
  className?: string
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ children, className }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)}>
        {children}
      </div>
    </FormItemContext.Provider>
  )
})

FormItem.displayName = 'FormItem'

export { FormItem }
