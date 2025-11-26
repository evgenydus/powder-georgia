'use client'

import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContentContainer } from '@/containers'
import { Tours } from '@/components/Tours/Tours'
import { mockTours } from '@/mocks'

const ToursPage = () => {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 text-white">
          <ContentContainer>
            <h1 className="text-4xl font-bold">{t('navigation.tours')}</h1>
            <p className="mt-2 text-lg">Explore our amazing mountain adventures</p>
          </ContentContainer>
        </section>

        {/* Tours Grid */}
        <section className="py-16">
          <ContentContainer>
            <Tours tours={mockTours} />
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ToursPage
