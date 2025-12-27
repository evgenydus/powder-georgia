'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const AdminErrorPage = ({ error, reset }: ErrorProps) => {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <AlertTriangle className="text-destructive mb-4 size-12" />
      <h1 className="text-foreground mb-2 text-xl font-bold">{t('errors.serverError')}</h1>
      <p className="text-muted-foreground mb-6 text-sm">{error.message}</p>
      <Button onClick={reset} size="sm" variant="outline">
        {t('errors.tryAgain')}
      </Button>
    </div>
  )
}

export default AdminErrorPage
