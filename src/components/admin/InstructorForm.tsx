'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useUnsavedChanges } from '@/hooks/useUnsavedChanges'

import { Button } from '@/components/ui'
import { ImageSection } from './image-section'
import {
  BioSection,
  ContactPriceSection,
  NameSection,
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
  const mediaIdsRef = useRef<string[]>([])
  const [mediaDirty, setMediaDirty] = useState(false)
  const { form, handleNameBlur, onSubmit } = useInstructorForm(instructor, mediaIdsRef)

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
  } = form

  useUnsavedChanges({ isDirty: isDirty || mediaDirty, isSubmitSuccessful })

  const handleMediaChange = (ids: string[]) => {
    mediaIdsRef.current = ids
    setMediaDirty(true)
  }

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
      <ImageSection
        entityId={instructor?.id}
        entityType="instructor"
        limit={1}
        onChange={handleMediaChange}
      />
      <Button type="submit">
        {instructor
          ? t('admin.instructorForm.submit.update')
          : t('admin.instructorForm.submit.create')}
      </Button>
    </form>
  )
}

export { InstructorForm }
