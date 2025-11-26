import type { Metadata } from 'next'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  return {
    alternates: {
      canonical: `https://www.powder.ge/${locale}`,
      languages: {
        en: 'https://www.powder.ge/en',
        ka: 'https://www.powder.ge/ka',
        ru: 'https://www.powder.ge/ru',
        'x-default': 'https://www.powder.ge',
      },
    },
  }
}

const LocaleLayout = ({ children }: LocaleLayoutProps) => {
  return <>{children}</>
}

export default LocaleLayout
