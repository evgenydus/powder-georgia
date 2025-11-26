'use client'

import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContentContainer } from '@/containers'
import { Transfers } from '@/components/Transfers/Transfers'
import { mockTransfers } from '@/mocks'

const TransfersPage = () => {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 text-white">
          <ContentContainer>
            <h1 className="text-4xl font-bold">{t('navigation.transfers')}</h1>
            <p className="mt-2 text-lg">Comfortable transfers to your destination</p>
          </ContentContainer>
        </section>

        {/* Transfers Grid */}
        <section className="py-16">
          <ContentContainer>
            <Transfers transfers={mockTransfers} />
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default TransfersPage
