'use client'

import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContentContainer } from '@/containers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

const AboutPage = () => {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 text-white">
          <ContentContainer>
            <h1 className="text-4xl font-bold">{t('navigation.about')}</h1>
            <p className="mt-2 text-lg">Learn about our mission and team</p>
          </ContentContainer>
        </section>

        {/* About Content */}
        <section className="py-16">
          <ContentContainer>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Mission */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We are dedicated to providing unforgettable mountain experiences in Georgia.
                    Our team of expert guides ensures your safety and enjoyment on every adventure.
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To be the leading mountain adventure company in the Caucasus region,
                    known for our exceptional service and commitment to environmental sustainability.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Team */}
            <div className="mt-12">
              <h2 className="mb-8 text-3xl font-bold">Our Team</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Team Member {i}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Expert guide with years of experience</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
