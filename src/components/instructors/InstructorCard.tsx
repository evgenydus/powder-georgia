'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'
import type { Instructor } from '@/types'

interface InstructorCardProps {
  instructor: Instructor
}

export const InstructorCard = ({ instructor }: InstructorCardProps) => {
  const locale = useLocale()
  const t = useTranslations()

  const specialization =
    instructor[`specialization_${locale as 'en' | 'ka' | 'ru'}`] || instructor.specialization_en

  return (
    <Link href={`${routes.instructors}/${instructor.slug}`}>
      <div className="group bg-card cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        <div className="bg-muted relative h-64 w-full overflow-hidden">
          {instructor.media?.[0] ? (
            <Image
              alt={instructor.name}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              fill
              src={instructor.media[0].url}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              {t('instructors.noPhoto')}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground mb-1 text-lg font-bold">{instructor.name}</h3>
          <p className="text-muted-foreground mb-4 text-sm">{specialization}</p>
          <div className="border-border flex items-center justify-between border-t pt-3">
            <span className="text-accent text-sm font-semibold">
              {instructor.price_per_hour_usd
                ? `$${instructor.price_per_hour_usd}/hr`
                : t('common.inquire')}
            </span>
            <span className="text-accent text-xs font-medium">
              {t('instructors.viewProfile')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
