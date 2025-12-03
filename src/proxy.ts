import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './i18n/config'

const intlMiddleware = createMiddleware({
  defaultLocale,
  localePrefix: 'always',
  locales,
})

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Check if the request has a locale prefix and matched with allowed locales
  const isLocaleMatched = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (!isLocaleMatched) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url)

    return NextResponse.redirect(redirectUrl)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(en|ru|ka)/:path*', '/((?!api|_next|.*\\..*).*)'],
}
