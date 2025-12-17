'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { useAuth } from './AuthProvider'

export const AuthControls = () => {
  const { isLoading, signOut, user } = useAuth()
  const t = useTranslations()

  if (isLoading || !user) {
    return null
  }

  const displayName = user.email || t('auth.signedIn')

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-300 sm:inline">{displayName}</span>
      <Button onClick={signOut} size="sm" variant="secondary">
        {t('auth.logout')}
      </Button>
    </div>
  )
}
