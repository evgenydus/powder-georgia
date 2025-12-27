import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        hostname: '**.supabase.co',
        protocol: 'https',
      },
    ],
  },
  reactCompiler: true,
}

export default withNextIntl(nextConfig)
