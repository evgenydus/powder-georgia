import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const CTASection = async () => {
  const t = await getTranslations()

  return (
    <section className="from-card to-background bg-linear-to-r px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold">{t('common.ready')}</h2>
        <p className="text-foreground/80 mb-8">{t('common.contactUs')}</p>
        <Link
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground inline-block rounded-lg px-8 py-3 font-semibold transition-colors"
          href={routes.contact}
        >
          {t('navigation.contact')}
        </Link>
      </div>
    </section>
  )
}
