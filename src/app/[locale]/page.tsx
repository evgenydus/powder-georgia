import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="bg-primary flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-white">{t('home.title')}</h1>
      <p className="text-secondary mt-4 text-lg">{t('home.subtitle')}</p>
      <button className="bg-accent hover:bg-accent/90 mt-8 rounded-lg px-8 py-3 text-white">
        {t('home.cta')}
      </button>
    </main>
  )
}
