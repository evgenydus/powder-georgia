import type { NavMenuItem } from './types'

export const routes = {
  about: '/about',
  contact: '/contact',
  instructors: '/instructors',
  merch: '/merch',
  tours: '/tours',
  transfers: '/transfers',
} as const

export const navMenuItems: NavMenuItem[] = [
  {
    icon: 'Home',
    id: 'home',
    path: '/',
    titleId: 'navigation.home',
  },
  {
    icon: 'Mountain',
    id: 'tours',
    path: routes.tours,
    titleId: 'navigation.tours',
  },
  {
    icon: 'Snowflake',
    id: 'instructors',
    isHidden: true,
    path: routes.instructors,
    titleId: 'navigation.instructors',
  },
  {
    icon: 'Bus',
    id: 'transfers',
    path: routes.transfers,
    titleId: 'navigation.transfers',
  },
  {
    icon: 'Package',
    id: 'merch',
    isHidden: true,
    path: routes.merch,
    titleId: 'navigation.merch',
  },
  {
    icon: 'User',
    id: 'about',
    path: routes.about,
    titleId: 'navigation.about',
  },
  {
    icon: 'Phone',
    id: 'contact',
    path: routes.contact,
    titleId: 'navigation.contact',
  },
]
