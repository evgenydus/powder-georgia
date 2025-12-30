'use client'

import { forwardRef } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from './Button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

import { cn } from '@/lib/utils'

type DatePickerProps = {
  className?: string
  disabled?: boolean
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  value?: Date
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, disabled, onChange, placeholder = 'Pick a date', value }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              className,
            )}
            disabled={disabled}
            variant="outline"
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, 'PPP') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            disabled={{ before: new Date() }}
            mode="single"
            onSelect={onChange}
            selected={value}
          />
        </PopoverContent>
      </Popover>
    )
  },
)

DatePicker.displayName = 'DatePicker'
