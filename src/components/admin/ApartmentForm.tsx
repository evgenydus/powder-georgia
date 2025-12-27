'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import useToast from '@/components/ui/hooks/useToast'
import { routes } from '@/constants'

import { Button } from '@/components/ui'
import {
  AmenitiesSection,
  CapacityPriceSection,
  DescriptionsSection,
  SlugSection,
  TitlesSection,
} from './apartment-form'
import { type ApartmentFormData, apartmentSchema, getInitialValues } from './apartmentSchema'
import { ImagesSection } from './tour-form'

import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types'

type ApartmentFormProps = {
  apartment?: Apartment
}

const ApartmentForm = ({ apartment }: ApartmentFormProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastInfo, toastSuccess } = useToast()

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setFocus,
    setValue,
    watch,
  } = useForm<ApartmentFormData>({
    defaultValues: getInitialValues(apartment),
    resolver: zodResolver(apartmentSchema) as Resolver<ApartmentFormData>,
  })

  const images = watch('images')
  const currentSlug = watch('slug')

  const handleTitleEnBlur = (title: string) => {
    if (apartment) return
    if (currentSlug) return

    setValue('slug', slugify(title, { lower: true, strict: true }))
  }

  const checkSlugExists = async (slug: string): Promise<boolean> => {
    let query = supabase.from('apartments').select('id').eq('slug', slug)

    if (apartment?.id) {
      query = query.neq('id', apartment.id)
    }

    const { data } = await query.maybeSingle()

    return !!data
  }

  const onSubmit = async (data: ApartmentFormData) => {
    const slugExists = await checkSlugExists(data.slug)

    if (slugExists) {
      setError('slug', { message: t('admin.apartmentForm.slug.exists'), type: 'manual' })
      setFocus('slug')

      return
    }

    toastInfo(
      apartment ? t('admin.apartmentForm.toast.updating') : t('admin.apartmentForm.toast.creating'),
    )

    const { error } = apartment
      ? await supabase.from('apartments').update(data).eq('id', apartment.id)
      : await supabase.from('apartments').insert([data])

    if (error) {
      toastError(t('admin.apartmentForm.toast.errorTitle'), {
        error,
        message: t('admin.apartmentForm.toast.errorMessage'),
      })

      return
    }

    toastSuccess(
      apartment ? t('admin.apartmentForm.toast.updated') : t('admin.apartmentForm.toast.created'),
    )
    router.push(routes.adminApartments)
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TitlesSection errors={errors} onTitleEnBlur={handleTitleEnBlur} register={register} />
      <SlugSection currentEntityId={apartment?.id} errors={errors} register={register} />
      <DescriptionsSection errors={errors} register={register} />
      <CapacityPriceSection register={register} />
      <AmenitiesSection register={register} />
      <ImagesSection
        entityType="apartment"
        images={images}
        onImagesChange={(imgs) => setValue('images', imgs)}
      />
      <Button type="submit">
        {apartment
          ? t('admin.apartmentForm.submit.update')
          : t('admin.apartmentForm.submit.create')}
      </Button>
    </form>
  )
}

export { ApartmentForm }
