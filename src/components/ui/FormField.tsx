import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FormFieldProps = {
  children: ReactNode
  className?: string
  description?: string
  error?: string
  htmlFor?: string
  label: string
  required?: boolean
}

export const FormField = ({
  children,
  className,
  description,
  error,
  htmlFor,
  label,
  required,
}: FormFieldProps) => {
  const errorId = error && htmlFor ? `${htmlFor}-error` : undefined

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-foreground block text-sm leading-none font-medium" htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>

      {children}

      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}

      {error && (
        <p className="text-destructive text-sm" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
