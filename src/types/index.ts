export type Language = 'en' | 'ka' | 'ru'

export interface LocaleMessages {
  common: Record<string, any>
  navigation: Record<string, string>
  [key: string]: any
}

export interface Tour {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'moderate' | 'hard'
  duration: number
  price: number
  image: string
}

export interface Transfer {
  id: string
  title: string
  description: string
  capacity: number
  price: number
}

export interface Contact {
  email: string
  phone: string
  address: string
  socialUrls: {
    facebook?: string
    instagram?: string
    telegram?: string
    whatsapp?: string
  }
}
