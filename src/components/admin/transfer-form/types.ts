import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { TransferFormData } from '../transferSchema'

type SectionProps = {
  errors: FieldErrors<TransferFormData>
  register: UseFormRegister<TransferFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

export type { RegisterOnlyProps, SectionProps }
