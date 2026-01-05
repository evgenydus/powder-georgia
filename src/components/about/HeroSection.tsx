import { getTranslations } from 'next-intl/server'

export const HeroSection = async () => {
  const t = await getTranslations()

  return (
    <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[70svh] md:py-20">
      <div className="bg-gradient-fade rounded-2xl px-8 py-10 md:px-20">
        <h1 className="text-foreground mb-4 text-5xl font-bold md:text-6xl">
          {t('about.hero.title')}
        </h1>
        <p className="text-foreground/80 max-w-2xl text-xl">{t('about.hero.subtitle')}</p>
      </div>
    </section>
  )
}
