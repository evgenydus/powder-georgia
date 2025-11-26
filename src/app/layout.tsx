import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { locales } from '@/i18n'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Powder Georgia',
  description:
    'Explore the wonders of Georgian mountains with Powder Georgia, your ultimate mountain guide to epic adventures.',
  alternates: {
    canonical: 'https://www.powder.ge',
    languages: {
      en: 'https://www.powder.ge/en',
      ka: 'https://www.powder.ge/ka',
      ru: 'https://www.powder.ge/ru',
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale?: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale = 'en' } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
