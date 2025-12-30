import { forwardRef } from 'react'

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
