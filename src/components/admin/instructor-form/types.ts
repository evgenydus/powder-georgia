import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import type { InstructorFormData } from '../instructorSchema'

type SectionProps = {
  errors: FieldErrors<InstructorFormData>
  register: UseFormRegister<InstructorFormData>
}

type RegisterOnlyProps = Pick<SectionProps, 'register'>

type PhotoSectionProps = {
  photoUrl: string
  setValue: UseFormSetValue<InstructorFormData>
}

export type { PhotoSectionProps, RegisterOnlyProps, SectionProps }
