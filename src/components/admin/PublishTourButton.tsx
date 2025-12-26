'use client'

import { useRouter } from 'next/navigation'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'

import { supabase } from '@/lib/supabase'

type PublishTourButtonProps = {
  isPublished: boolean
  tourId: string
}

export const PublishTourButton = ({ isPublished, tourId }: PublishTourButtonProps) => {
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const handleToggle = async () => {
    const action = isPublished ? 'Unpublishing' : 'Publishing'

    toastInfo(`${action} tour...`)

    const { error } = await supabase
      .from('tours')
      .update({ is_published: !isPublished })
      .eq('id', tourId)

    if (error) {
      toastError('PublishTourButton', {
        error,
        message: `Failed to ${isPublished ? 'unpublish' : 'publish'} tour.`,
      })

      return
    }

    toastSuccess(`Tour ${isPublished ? 'unpublished' : 'published'} successfully!`)
    router.refresh()
  }

  return (
    <Button onClick={handleToggle} size="sm" variant={isPublished ? 'outline' : 'default'}>
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  )
}
