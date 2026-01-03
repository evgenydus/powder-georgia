'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { LessonModal } from './LessonModal'

import type { Instructor } from '@/types'

type RequestLessonButtonProps = {
  instructor: Instructor
}

export const RequestLessonButton = ({ instructor }: RequestLessonButtonProps) => {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} size="lg">
        {t('instructors.requestLesson')}
      </Button>
      {isModalOpen && <LessonModal instructor={instructor} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
