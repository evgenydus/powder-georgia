'use client'

import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { Button } from '@/components/ui'
import { useAuth } from './AuthProvider'

import { Link } from '@/i18n/navigation'

export const AuthControls = () => {
  const { isLoading, signOut, user } = useAuth()
  const t = useTranslations('auth')

  if (isLoading) {
    return null
  }

  if (!user) {
    return (
      <Button asChild size="sm" variant="secondary">
        <Link href={routes.login}>{t('login')}</Link>
      </Button>
    )
  }

  const displayName = user.email || t('signedIn')

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-300 sm:inline">{displayName}</span>
      <Button onClick={signOut} size="sm" variant="secondary">
        {t('logout')}
      </Button>
    </div>
  )
}
