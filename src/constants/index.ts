export const siteName = 'Powder Georgia'
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const siteDescription = 'Explore the wonders of Georgian mountains with Powder Georgia'

export const languages = {
  en: 'English',
  ka: 'Georgian',
  ru: 'Russian',
} as const

export const defaultLanguage = 'en' as const

export const supportedLanguages = Object.keys(languages) as Array<keyof typeof languages>

export const routes = {
  about: '/about',
  admin: '/admin',
  adminApartments: '/admin/apartments',
  adminInquiries: '/admin/inquiries',
  adminInstructors: '/admin/instructors',
  adminSettings: '/admin/settings',
  adminTours: '/admin/tours',
  adminTransfers: '/admin/transfers',
  apartments: '/apartments',
  contact: '/contact',
  home: '/',
  instructors: '/instructors',
  tours: '/tours',
  transfers: '/transfers',
} as const

export const difficultyLevels = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
} as const

export const vehicleTypes = {
  bus: 'Bus',
  car: 'Car',
  suv: 'SUV',
  van: 'Van',
} as const
