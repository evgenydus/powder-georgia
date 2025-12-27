'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useToast from '@/components/ui/hooks/useToast'

import { Button } from '@/components/ui/Button'

import { supabase } from '@/lib/supabase'

type PublishTourButtonProps = {
  isPublished: boolean
  tourId: string
}

export const PublishTourButton = ({ isPublished, tourId }: PublishTourButtonProps) => {
  const router = useRouter()
  const t = useTranslations()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const handleToggle = async () => {
    toastInfo(isPublished ? t('admin.actions.unpublishing') : t('admin.actions.publishing'))

    const { error } = await supabase
      .from('tours')
      .update({ is_published: !isPublished })
      .eq('id', tourId)

    if (error) {
      toastError(t('admin.actions.publishError'), {
        error,
        message: t('admin.actions.publishErrorMessage'),
      })

      return
    }

    toastSuccess(isPublished ? t('admin.actions.unpublished') : t('admin.actions.published'))
    router.refresh()
  }

  return (
    <Button onClick={handleToggle} size="sm" variant={isPublished ? 'outline' : 'default'}>
      {isPublished ? t('admin.actions.unpublish') : t('admin.actions.publish')}
    </Button>
  )
}
