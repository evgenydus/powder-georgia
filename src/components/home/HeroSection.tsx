import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const HeroSection = async () => {
  const t = await getTranslations()

  return (
    <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[70vh] md:py-20">
      <div className="rounded-2xl px-8 py-10 [background:linear-gradient(to_right,transparent_0%,color-mix(in_oklch,var(--color-primary)_75%,transparent)_40%,color-mix(in_oklch,var(--color-primary)_75%,transparent)_60%,transparent_100%)] md:px-20">
        <h1 className="text-foreground mb-4 text-5xl font-bold md:text-6xl">{t('home.title')}</h1>
        <p className="text-foreground/80 mb-8 max-w-2xl text-xl">{t('home.subtitle')}</p>
        <Link
          className="bg-accent hover:bg-accent/90 text-accent-foreground inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
          href={routes.tours}
        >
          {t('home.cta')}
        </Link>
      </div>
    </section>
  )
}
