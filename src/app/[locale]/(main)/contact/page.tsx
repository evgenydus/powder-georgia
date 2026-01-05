import { Mail, Phone } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { contact } from '@/constants'

import { ContactForm, FollowUsBlock } from '@/components/contact'

const ContactPage = async () => {
  const t = await getTranslations()

  return (
    <>
      <section className="flex min-h-[30vh] items-center justify-center px-4 py-16 sm:px-6 md:min-h-[40svh] lg:px-8">
        <div className="bg-gradient-fade rounded-2xl px-8 py-8 text-center md:px-16">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            {t('contact.title')}
          </h1>
          <p className="text-foreground/80">{t('contact.description')}</p>
        </div>
      </section>

      <div className="bg-background flex-1">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <ContactForm />

            <div className="space-y-8">
              <div className="bg-card rounded-lg p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Phone className="text-accent size-6" />
                  <h3 className="text-foreground text-lg font-semibold">{t('contact.phone')}</h3>
                </div>
                <a
                  className="text-foreground/80 hover:text-accent transition-colors"
                  href={`tel:${contact.phone}`}
                >
                  {contact.phone}
                </a>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="text-accent size-6" />
                  <h3 className="text-foreground text-lg font-semibold">{t('contact.email')}</h3>
                </div>
                <a
                  className="text-foreground/80 hover:text-accent transition-colors"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </div>

              <FollowUsBlock />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ContactPage
