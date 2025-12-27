import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  description: 'The page you are looking for does not exist.',
  title: '404 - Page Not Found',
}

const GlobalNotFound = () => {
  return (
    <html className={geistSans.variable} lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-foreground mb-2 text-6xl font-bold">404</h1>
          <p className="text-muted-foreground mb-6 text-lg">Page not found</p>
          <a
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-6 py-2 font-medium transition-colors"
            href="/"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  )
}

export default GlobalNotFound
