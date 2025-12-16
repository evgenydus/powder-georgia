'use client'

import { useEffect } from 'react'

import { routes } from '@/constants'

import { useAuth } from './AuthProvider'

import { useRouter } from '@/i18n/navigation'

type AdminGuardProps = {
  children: React.ReactNode
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(routes.login)
    }
  }, [isLoading, router, user])

  if (isLoading || !user) {
    return null
  }

  return children
}
