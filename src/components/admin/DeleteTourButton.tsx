
'use client'

import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function DeleteTourButton({ tourId }: { tourId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this tour?')) {
      const promise = supabase.from('tours').delete().eq('id', tourId)

      toast.promise(promise, {
        loading: 'Deleting tour...',
        success: () => {
          router.refresh()
          return 'Tour deleted successfully!'
        },
        error: (err) => {
          console.error('Supabase error:', err)
          return 'An error occurred while deleting the tour.'
        },
      })
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  )
}
