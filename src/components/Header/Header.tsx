'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { NavMenu } from '@/components/NavMenu/NavMenu'
import { ContentContainer } from '@/containers'

export const Header: React.FC = () => {
  const locale = useLocale()

  return (
    <header className="border-b bg-white">
      <ContentContainer className="flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="text-2xl font-bold">
          Powder Georgia
        </Link>
        <NavMenu />
      </ContentContainer>
    </header>
  )
}
