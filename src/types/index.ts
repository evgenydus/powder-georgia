// Tour types
export interface Tour {
  id: string
  slug: string
  title_en: string
  title_ka: string
  title_ru: string
  description_en: string
  description_ka: string
  description_ru: string
  difficulty: number // 1-5
  duration_hours: number
  group_size_min: number
  group_size_max: number
  vertical_drop_m: number
  price_usd: number
  required_equipment_en?: string
  required_equipment_ka?: string
  required_equipment_ru?: string
  images: string[] // Array of image URLs
  is_active: boolean
  created_at: string
  updated_at: string
}

// Transfer types
export interface Transfer {
  id: string
  slug: string
  title_en: string
  title_ka: string
  title_ru: string
  route_en: string
  route_ka: string
  route_ru: string
  vehicle_type: string
  capacity: number
  price_usd: number
  description_en?: string
  description_ka?: string
  description_ru?: string
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Instructor types
export interface Instructor {
  id: string
  slug: string
  name: string
  specialization_en?: string
  specialization_ka?: string
  specialization_ru?: string
  bio_en?: string
  bio_ka?: string
  bio_ru?: string
  photo_url: string
  services_en?: string
  services_ka?: string
  services_ru?: string
  price_per_hour_usd?: number
  contact_phone?: string
  contact_email?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Apartment types
export interface Apartment {
  id: string
  slug: string
  title_en: string
  title_ka: string
  title_ru: string
  description_en?: string
  description_ka?: string
  description_ru?: string
  capacity: number
  amenities_en?: string
  amenities_ka?: string
  amenities_ru?: string
  price_per_night_usd: number
  images: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// Inquiry types
export interface Inquiry {
  id: string
  inquiry_type: 'tour' | 'transfer' | 'instructor' | 'apartment' | 'general'
  related_id?: string
  client_name: string
  client_email: string
  client_phone?: string
  message?: string
  preferred_date?: string
  group_size?: number
  language: 'en' | 'ka' | 'ru'
  is_read: boolean
  is_processed: boolean
  created_at: string
  updated_at: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: string
}
