import { forwardRef } from 'react'
import type { ReactNode } from 'react'

type FieldProps = {
  children: ReactNode
  error?: string
  label: string
}

export const Field = ({ children, error, label }: FieldProps) => (
  <div>
    <label className="text-foreground mb-2 block text-sm font-medium">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

type SelectProps = React.ComponentProps<'select'>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, ...props }, ref) => (
  <select
    ref={ref}
    className="border-input bg-background text-foreground focus:ring-accent w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
    {...props}
  >
    {children}
  </select>
))

Select.displayName = 'Select'
