'use client'

import Link from 'next/link'
import { useLocale } from '@/hooks'
import { Button } from '@/components/ui'

const NotFound = () => {
  const locale = useLocale()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-2xl text-gray-600">Page not found</p>
        <Link href={`/${locale}`}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
