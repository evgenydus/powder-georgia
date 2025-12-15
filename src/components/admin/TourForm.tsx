'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm, type Resolver } from 'react-hook-form'

import useToast from '@/components/ui/hooks/useToast'

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
  const { toastError, toastInfo, toastSuccess } = useToast()
  const form = useForm<TourFormValues>({
    defaultValues: getInitialValues(tour),
    // zodResolver infers input types from schema (with z.coerce.number, input is unknown/string),
    // cast to Resolver<TourFormValues> to align with RHF generics.
    resolver: zodResolver(formSchema) as unknown as Resolver<TourFormValues>,
  })

  const onSubmit = async (values: TourFormValues) => {
    toastInfo(tour ? 'Updating tour...' : 'Creating tour...')

    const { error } = tour
      ? await supabase.from('tours').update(values).eq('id', tour.id)
      : await supabase.from('tours').insert([values])

    if (error) {
      toastError('TourForm', { error, message: 'An error occurred.' })

      return
    }

    toastSuccess(tour ? 'Tour updated successfully!' : 'Tour created successfully!')
    router.push('/admin/tours')
  }

  return (
    <Form {...form}>
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
      </form>
    </Form>
  )
}

export { TourForm }
