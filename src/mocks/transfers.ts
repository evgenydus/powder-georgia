import type { Transfer } from '@/types'

export const mockTransfers: Transfer[] = [
  {
    id: '1',
    title: 'Airport to Hotel',
    description: 'Direct transfer from Tbilisi International Airport to your hotel.',
    capacity: 4,
    price: 50,
  },
  {
    id: '2',
    title: 'Mountain Base Camp',
    description: 'Transfer to the mountain base camp with professional driver.',
    capacity: 8,
    price: 150,
  },
  {
    id: '3',
    title: 'Group Tour Transfer',
    description: 'Comfortable minibus for group tours to various locations.',
    capacity: 12,
    price: 300,
  },
]
