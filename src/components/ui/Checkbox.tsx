'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) =>
  React.createElement(
    CheckboxPrimitive.Root,
    {
      ...props,
      className: cn(
        'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ),
      ref,
    },
    React.createElement(
      CheckboxPrimitive.Indicator,
      { className: cn('flex items-center justify-center text-current') },
      React.createElement(Check, { className: 'h-4 w-4' }),
    ),
  ),
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
