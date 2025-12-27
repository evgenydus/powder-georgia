import { getTranslations } from 'next-intl/server'

import { routes } from '@/constants'

import { Link } from '@/i18n/navigation'

export const CTASection = async () => {
  const t = await getTranslations()

  return (
    <section className="bg-linear-to-r from-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">{t('common.ready')}</h2>
        <p className="mb-8 text-gray-300">{t('common.contactUs')}</p>
        <Link
          className="bg-secondary hover:bg-secondary/90 inline-block rounded-lg px-8 py-3 font-semibold text-white transition-colors"
          href={routes.contact}
        >
          {t('navigation.contact')}
        </Link>
      </div>
    </section>
  )
}
