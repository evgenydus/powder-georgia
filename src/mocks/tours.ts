import type { Tour } from '@/types'

export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Caucasus Peak Adventure',
    description: 'Experience the stunning views of the highest peaks in the Caucasus Mountains.',
    difficulty: 'hard',
    duration: 5,
    price: 1500,
    image: '/images/tour-1.jpg',
  },
  {
    id: '2',
    title: 'Backcountry Skiing',
    description: 'Explore pristine snow-covered slopes with experienced guides.',
    difficulty: 'moderate',
    duration: 3,
    price: 1200,
    image: '/images/tour-2.jpg',
  },
  {
    id: '3',
    title: 'Alpine Expedition',
    description: 'A challenging multi-day expedition through alpine terrain.',
    difficulty: 'hard',
    duration: 7,
    price: 2000,
    image: '/images/tour-3.jpg',
  },
  {
    id: '4',
    title: 'Mountain Hiking',
    description: 'Scenic hiking trails suitable for all fitness levels.',
    difficulty: 'easy',
    duration: 2,
    price: 500,
    image: '/images/tour-4.jpg',
  },
]
