import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import type { TransferFormData } from '../transferSchema'

type SectionProps = {
  errors: FieldErrors<TransferFormData>
  register: UseFormRegister<TransferFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

type ImageSectionProps = {
  imageUrl: string
  setValue: UseFormSetValue<TransferFormData>
}

export type { ImageSectionProps, RegisterOnlyProps, SectionProps }
