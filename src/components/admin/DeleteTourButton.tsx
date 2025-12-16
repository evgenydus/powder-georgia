'use client'

import { useRouter } from 'next/navigation'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'

import { supabase } from '@/lib/supabase'

export const DeleteTourButton = ({ tourId }: { tourId: string }) => {
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this tour?')) {
      return
    }

    toastInfo('Deleting tour...')

    const { error } = await supabase.from('tours').delete().eq('id', tourId)

    if (error) {
      toastError('DeleteTourButton', {
        error,
        message: 'An error occurred while deleting the tour.',
      })

      return
    }

    toastSuccess('Tour deleted successfully!')
    router.refresh()
  }

  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  )
}
