import { getTranslations } from 'next-intl/server'

export const MissionSection = async () => {
  const t = await getTranslations()

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          {t('about.mission.title')}
        </h2>
        <p className="text-foreground/80 text-lg leading-relaxed">
          {t('about.mission.description')}
        </p>
      </div>
    </section>
  )
}
