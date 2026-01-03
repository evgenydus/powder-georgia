'use client'

import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui'
import {
  BioSection,
  ContactPriceSection,
  NameSection,
  PhotoSection,
  ServicesSection,
  SpecializationSection,
} from './instructor-form'
import { SlugSection } from './SlugSection'
import { useInstructorForm } from './useInstructorForm'

import type { Instructor } from '@/types'

type InstructorFormProps = {
  instructor?: Instructor
}

const InstructorForm = ({ instructor }: InstructorFormProps) => {
  const t = useTranslations()
  const { form, handleNameBlur, onSubmit } = useInstructorForm(instructor)

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
    setValue,
    watch,
  } = form

  useUnsavedChanges({ isDirty, isSubmitSuccessful })

  const photoUrl = watch('photo_url')

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <NameSection errors={errors} onNameBlur={handleNameBlur} register={register} />
      <SlugSection
        currentEntityId={instructor?.id}
        errors={errors}
        register={register}
        tableName="instructors"
      />
      <SpecializationSection register={register} />
      <BioSection register={register} />
      <ServicesSection register={register} />
      <ContactPriceSection register={register} />
      <PhotoSection photoUrl={photoUrl ?? ''} setValue={setValue} />
      <Button type="submit">
        {instructor
          ? t('admin.instructorForm.submit.update')
          : t('admin.instructorForm.submit.create')}
      </Button>
    </form>
  )
}

export { InstructorForm }
