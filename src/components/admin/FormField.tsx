import type { ChangeHandler, RefCallBack } from 'react-hook-form'

import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

type FieldProps = {
  error?: boolean
  errorText?: string
  id: string
  label: string
  name: string
  onBlur: ChangeHandler
  onChange: ChangeHandler
  placeholder?: string
  ref: RefCallBack
  required?: boolean
  rows?: number
  type?: 'number' | 'text' | 'textarea'
}

const FormField = ({
  error,
  errorText,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  ref,
  required,
  rows = 4,
  type = 'text',
}: FieldProps) => (
  <div>
    <Label htmlFor={id}>
      {label}
      {required && ' *'}
    </Label>
    {type === 'textarea' ? (
      <Textarea
        ref={ref}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    ) : (
      <Input
        ref={ref}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    )}
    {error && errorText ? <p className="text-sm text-red-500">{errorText}</p> : null}
  </div>
)

export { FormField }
