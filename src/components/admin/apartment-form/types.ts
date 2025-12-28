import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { ApartmentFormData } from '../apartmentSchema'

type SectionProps = {
  errors: FieldErrors<ApartmentFormData>
  register: UseFormRegister<ApartmentFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

export type { RegisterOnlyProps, SectionProps }
