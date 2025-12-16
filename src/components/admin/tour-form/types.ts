import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { TourFormData } from '../tourSchema'

type SectionProps = {
  errors: FieldErrors<TourFormData>
  register: UseFormRegister<TourFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

export type { RegisterOnlyProps, SectionProps }
