import type { Contact } from '@/types'
import { SOCIAL_LINKS } from '@/constants'

export const mockContact: Contact = {
  email: 'info@powder.ge',
  phone: '+995 599 123 456',
  address: 'Tbilisi, Georgia',
  socialUrls: {
    facebook: SOCIAL_LINKS.FACEBOOK,
    instagram: SOCIAL_LINKS.INSTAGRAM,
    telegram: SOCIAL_LINKS.TELEGRAM,
    whatsapp: SOCIAL_LINKS.WHATSAPP,
  },
}
