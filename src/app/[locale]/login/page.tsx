'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

import { AuthControls, useAuth } from '@/components/auth'
import { Button } from '@/components/ui'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'

const LoginPage = () => {
  const t = useTranslations('auth')
  const router = useRouter()
  const { isLoading: isAuthLoading, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.push(routes.home)
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

    router.push(routes.home)
  }

  return (
    <main className="bg-primary min-h-screen px-4 py-16">
      <div className="mx-auto flex max-w-lg flex-col gap-8 rounded-2xl bg-gray-900/70 px-6 py-10 shadow-2xl backdrop-blur">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{t('title')}</h1>
          <p className="text-gray-300">{t('description')}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200" htmlFor="email">
              {t('email')}
            </label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white ring-2 ring-transparent transition outline-none focus:border-orange-400 focus:ring-orange-400/40"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200" htmlFor="password">
              {t('password')}
            </label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white ring-2 ring-transparent transition outline-none focus:border-orange-400 focus:ring-orange-400/40"
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
              {t('error')}
              <span className="block text-red-200/80">{error}</span>
            </p>
          ) : null}

          <Button
            className="w-full"
            disabled={isSubmitting || !email || !password}
            size="lg"
            type="submit"
          >
            {isSubmitting ? t('loggingIn') : t('login')}
          </Button>
        </form>

        <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-800/60 px-4 py-3 text-sm text-gray-300">
          <span>{t('sessionHint')}</span>
          <AuthControls />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
