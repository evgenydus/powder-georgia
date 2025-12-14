'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Checkbox } from '@/components/ui/Checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

type BaseFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  label: string
  name: FieldPath<TFieldValues>
}

type TextFieldProps<TFieldValues extends FieldValues> = BaseFieldProps<TFieldValues> & {
  type?: 'number' | 'text'
}

const TextField = <TFieldValues extends FieldValues>({
  control,
  label,
  name,
  type = 'text',
}: TextFieldProps<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            type={type}
            value={field.value}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

const TextareaField = <TFieldValues extends FieldValues>({
  control,
  label,
  name,
}: BaseFieldProps<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

const CheckboxField = <TFieldValues extends FieldValues>({
  control,
  description,
  label,
  name,
}: BaseFieldProps<TFieldValues> & { description?: string }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow">
        <FormControl>
          <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
          {description ? <FormDescription>{description}</FormDescription> : null}
        </div>
      </FormItem>
    )}
  />
)

export { CheckboxField, TextareaField, TextField }
