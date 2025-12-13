'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

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
    <Link href={`/${locale}/instructors/${instructor.slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
        <div className="relative h-64 w-full overflow-hidden bg-gray-700">
          <Image
            alt={instructor.name}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            fill
            src={instructor.photo_url}
          />
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-lg font-bold text-white">{instructor.name}</h3>
          <p className="mb-4 text-sm text-gray-400">{specialization}</p>
          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <span className="text-sm font-semibold text-orange-400">
              {instructor.price_per_hour_usd
                ? `$${instructor.price_per_hour_usd}/hr`
                : t('common.inquire')}
            </span>
            <span className="text-xs font-medium text-orange-400">
              {t('instructors.viewProfile')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
