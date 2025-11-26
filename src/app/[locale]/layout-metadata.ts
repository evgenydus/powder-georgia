import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/constants'

export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: `${SITE_NAME} - Mountain Adventures`,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: `${SITE_NAME} - Mountain Adventures`,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      type: 'website',
    },
  },
  tours: {
    title: `Tours - ${SITE_NAME}`,
    description: 'Explore our amazing mountain tours and adventures in Georgia.',
    openGraph: {
      title: `Tours - ${SITE_NAME}`,
      description: 'Explore our amazing mountain tours and adventures in Georgia.',
      url: `${SITE_URL}/tours`,
      type: 'website',
    },
  },
  transfers: {
    title: `Transfers - ${SITE_NAME}`,
    description: 'Comfortable transfers to your mountain destination.',
    openGraph: {
      title: `Transfers - ${SITE_NAME}`,
      description: 'Comfortable transfers to your mountain destination.',
      url: `${SITE_URL}/transfers`,
      type: 'website',
    },
  },
  about: {
    title: `About Us - ${SITE_NAME}`,
    description: 'Learn about our mission, vision, and team.',
    openGraph: {
      title: `About Us - ${SITE_NAME}`,
      description: 'Learn about our mission, vision, and team.',
      url: `${SITE_URL}/about`,
      type: 'website',
    },
  },
  contact: {
    title: `Contact Us - ${SITE_NAME}`,
    description: 'Get in touch with our team for any inquiries.',
    openGraph: {
      title: `Contact Us - ${SITE_NAME}`,
      description: 'Get in touch with our team for any inquiries.',
      url: `${SITE_URL}/contact`,
      type: 'website',
    },
  },
}
