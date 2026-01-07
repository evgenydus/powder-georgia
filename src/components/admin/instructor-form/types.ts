import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { InstructorFormData } from '../instructorSchema'

type SectionProps = {
  errors: FieldErrors<InstructorFormData>
  register: UseFormRegister<InstructorFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

export type { RegisterOnlyProps, SectionProps }
