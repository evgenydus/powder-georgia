'use client'

import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContentContainer } from '@/containers'
import { Tours } from '@/components/Tours/Tours'
import { Socials } from '@/components/Contact/Socials'
import { mockTours, mockContact } from '@/mocks'

const HomePage = () => {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 text-white">
          <ContentContainer>
            <h1 className="mb-4 text-5xl font-bold">{t('navigation.home')}</h1>
            <p className="max-w-2xl text-xl">{t('common.units.kilometers')}</p>
          </ContentContainer>
        </section>

        {/* Featured Tours */}
        <section className="py-16">
          <ContentContainer>
            <h2 className="mb-8 text-3xl font-bold">{t('navigation.tours')}</h2>
            <Tours tours={mockTours.slice(0, 4)} />
          </ContentContainer>
        </section>

        {/* Social Section */}
        <section className="bg-gray-50 py-16">
          <ContentContainer>
            <h2 className="mb-8 text-center text-3xl font-bold">Follow Us</h2>
            <div className="flex justify-center">
              <Socials socialUrls={mockContact.socialUrls} />
            </div>
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
