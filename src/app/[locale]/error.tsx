'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="text-destructive mb-4 size-16" />
      <h1 className="text-foreground mb-2 text-2xl font-bold">{t('errors.serverError')}</h1>
      <p className="text-muted-foreground mb-6">{error.message || t('errors.unknownError')}</p>
      <Button onClick={reset} variant="outline">
        {t('errors.tryAgain')}
      </Button>
    </div>
  )
}

export default ErrorPage
