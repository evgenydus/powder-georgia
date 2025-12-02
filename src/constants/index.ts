export const SITE_NAME = 'Powder Georgia'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const SITE_DESCRIPTION = 'Explore the wonders of Georgian mountains with Powder Georgia'

export const LANGUAGES = {
  en: 'English',
  ka: 'Georgian',
  ru: 'Russian',
} as const

export const DEFAULT_LANGUAGE = 'en' as const

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES) as Array<keyof typeof LANGUAGES>

export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  TRANSFERS: '/transfers',
  INSTRUCTORS: '/instructors',
  APARTMENTS: '/apartments',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN: '/admin',
  ADMIN_TOURS: '/admin/tours',
  ADMIN_TRANSFERS: '/admin/transfers',
  ADMIN_INSTRUCTORS: '/admin/instructors',
  ADMIN_APARTMENTS: '/admin/apartments',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_SETTINGS: '/admin/settings',
} as const

export const DIFFICULTY_LEVELS = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
} as const

export const VEHICLE_TYPES = {
  van: 'Van',
  suv: 'SUV',
  bus: 'Bus',
  car: 'Car',
} as const
