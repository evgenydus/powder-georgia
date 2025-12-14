'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { CheckboxField, TextareaField, TextField } from '@/components/admin/TourFormFields'
import {
  descriptionFields,
  equipmentFields,
  groupFields,
  metricsFields,
  titleFields,
  verticalField,
} from '@/components/admin/tourFormFieldsConfig'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { formSchema, getInitialValues, type TourFormValues } from './tourFormSchema'

import { supabase } from '@/lib/supabase'
import type { Tour } from '@/types'

const TourForm = ({ tour }: { tour?: Tour }) => {
  const router = useRouter()
  const form = useForm<TourFormValues>({
    defaultValues: getInitialValues(tour),
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: TourFormValues) => {
    const promise = tour
      ? supabase.from('tours').update(values).eq('id', tour.id)
      : supabase.from('tours').insert([values])

    await toast.promise(promise, {
      error: (err) => {
        console.error('Supabase error:', err)

        return 'An error occurred.'
      },
      loading: tour ? 'Updating tour...' : 'Creating tour...',
      success: () => {
        router.push('/admin/tours')

        return tour ? 'Tour updated successfully!' : 'Tour created successfully!'
      },
    })
  }

  return React.createElement(
    Form,
    form,
    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {titleFields.map(({ label, name }) => (
          <TextField key={name} control={form.control} label={label} name={name} />
        ))}
      </div>

      <TextField control={form.control} label="Slug" name="slug" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {descriptionFields.map(({ label, name }) => (
          <TextareaField key={name} control={form.control} label={label} name={name} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {metricsFields.map(({ label, name }) => (
          <TextField key={name} control={form.control} label={label} name={name} type="number" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {groupFields.map(({ label, name }) => (
          <TextField key={name} control={form.control} label={label} name={name} type="number" />
        ))}
      </div>

      <TextField
        control={form.control}
        label={verticalField.label}
        name={verticalField.name}
        type="number"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {equipmentFields.map(({ label, name }) => (
          <TextareaField key={name} control={form.control} label={label} name={name} />
        ))}
      </div>

      <CheckboxField
        control={form.control}
        description="Is this tour currently active and visible to users?"
        label="Active"
        name="is_active"
      />

      <Button type="submit">{tour ? 'Update' : 'Create'}</Button>
    </form>,
  )
}

export { TourForm }
