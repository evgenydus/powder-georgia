'use client'

import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContentContainer } from '@/containers'
import { ContactForm } from '@/components/Contact/ContactForm'
import { Socials } from '@/components/Contact/Socials'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { mockContact } from '@/mocks'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactPage = () => {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 text-white">
          <ContentContainer>
            <h1 className="text-4xl font-bold">{t('navigation.contact')}</h1>
            <p className="mt-2 text-lg">Get in touch with us</p>
          </ContentContainer>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <ContentContainer>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Contact Information</h2>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href={`mailto:${mockContact.email}`} className="text-blue-600 hover:underline">
                      {mockContact.email}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href={`tel:${mockContact.phone}`} className="text-blue-600 hover:underline">
                      {mockContact.phone}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{mockContact.address}</p>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                  <Socials socialUrls={mockContact.socialUrls} />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage
