import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './i18n/config'
import { createClient } from './lib/supabase/middleware'

const intlMiddleware = createMiddleware({
  defaultLocale,
  localePrefix: 'always',
  locales,
})

const isAdminRoute = (pathname: string) =>
  locales.some((locale) => pathname.startsWith(`/${locale}/admin`))

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals
  if (pathname.startsWith('/_next')) {
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

  // Protect admin routes
  if (isAdminRoute(pathname)) {
    const { response, supabase } = createClient(request)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const locale = locales.find((l) => pathname.startsWith(`/${l}/`)) || defaultLocale
      const loginUrl = new URL(`/${locale}/login`, request.url)

      loginUrl.searchParams.set('redirect', pathname)

      return NextResponse.redirect(loginUrl)
    }

    // User is authenticated - continue with intl middleware and preserve auth cookies
    const intlResponse = intlMiddleware(request)

    // Copy cookies from supabase response to intl response (preserving all options)
    response.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value, {
        domain: cookie.domain,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        maxAge: cookie.maxAge,
        path: cookie.path,
        sameSite: cookie.sameSite,
        secure: cookie.secure,
      })
    })

    return intlResponse
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(en|ru|ka)/:path*', '/((?!_next|.*\\..*).*)'],
}
