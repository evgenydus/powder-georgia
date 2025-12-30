import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        hostname: '**.supabase.co',
        protocol: 'https',
      },
    ],
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test?: RegExp }) =>
      rule.test?.test?.('.svg'),
    )

    if (!fileLoaderRule) {
      return config
    }

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        exclude: /\.svg$/i,
        resourceQuery: /url/,
        test: /\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default withNextIntl(nextConfig)
