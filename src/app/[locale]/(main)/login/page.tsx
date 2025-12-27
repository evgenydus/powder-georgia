'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { useAuth } from '@/components/auth'
import { Button } from '@/components/ui'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'

const LoginPage = () => {
  const t = useTranslations()
  const router = useRouter()
  const { isLoading: isAuthLoading, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace(routes.admin)
    }
  }, [isAuthLoading, router, user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setIsSubmitting(false)

      return
    }

    router.replace(routes.admin)
  }

  return (
    <main className="bg-background min-h-screen px-4 py-16">
      <div className="bg-card/70 mx-auto flex max-w-lg flex-col gap-8 rounded-2xl px-6 py-10 shadow-2xl backdrop-blur">
        <div className="space-y-3 text-center">
          <h1 className="text-foreground text-3xl font-bold md:text-4xl">{t('auth.title')}</h1>
          <p className="text-foreground/80">{t('auth.description')}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-foreground/90 block text-sm font-medium" htmlFor="email">
              {t('auth.email')}
            </label>
            <input
              className="border-border bg-muted text-foreground focus:border-accent focus:ring-accent/40 w-full rounded-lg border px-4 py-3 ring-2 ring-transparent transition outline-none"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-2">
            <label className="text-foreground/90 block text-sm font-medium" htmlFor="password">
              {t('auth.password')}
            </label>
            <input
              className="border-border bg-muted text-foreground focus:border-accent focus:ring-accent/40 w-full rounded-lg border px-4 py-3 ring-2 ring-transparent transition outline-none"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              value={password}
            />
          </div>

          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {t('auth.error')}
              <span className="block text-red-200/80">{error}</span>
            </p>
          ) : null}

          <Button
            className="w-full"
            disabled={isSubmitting || !email || !password}
            size="lg"
            type="submit"
          >
            {isSubmitting ? t('auth.loggingIn') : t('auth.login')}
          </Button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
