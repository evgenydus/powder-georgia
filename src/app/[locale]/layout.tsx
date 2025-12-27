import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { AuthProvider } from '@/components/auth'
import { Toaster } from '@/components/ui'

import '../globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description:
    'Explore the wonders of Georgian mountains with Powder Georgia, your ultimate mountain guide to epic adventures.',
  title: 'Powder Georgia',
}

type LayoutProps = {
  children: React.ReactNode
}

const RootLayout = async ({ children }: LayoutProps) => {
  const messages = await getMessages()

  return (
    <html>
      <NextIntlClientProvider messages={messages}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}

export default RootLayout
