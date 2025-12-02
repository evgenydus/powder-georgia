import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary p-24">
      <h1 className="text-4xl font-bold text-white">{t('home.title')}</h1>
      <p className="mt-4 text-lg text-secondary">{t('home.subtitle')}</p>
      <button className="mt-8 rounded-lg bg-accent px-8 py-3 text-white hover:bg-accent/90">
        {t('home.cta')}
      </button>
    </main>
  )
}
