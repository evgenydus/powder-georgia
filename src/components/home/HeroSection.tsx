import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const HeroSection = async () => {
  const t = await getTranslations()

  return (
    <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">{t('home.title')}</h1>
      <p className="mb-8 max-w-2xl text-xl text-gray-300">{t('home.subtitle')}</p>
      <Link
        className="bg-accent hover:bg-accent/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
        href={routes.tours}
      >
        {t('home.cta')}
      </Link>
    </section>
  )
}
