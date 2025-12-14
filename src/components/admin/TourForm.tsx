'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

import { supabase } from '@/lib/supabase'

const formSchema = z.object({
  description_en: z.string().min(1, 'Description is required'),
  description_ka: z.string().min(1, 'Description is required'),
  description_ru: z.string().min(1, 'Description is required'),
  difficulty: z.coerce.number().min(1).max(5),
  duration_hours: z.coerce.number().min(1),
  group_size_max: z.coerce.number().min(1),
  group_size_min: z.coerce.number().min(1),
  images: z.array(z.string()).optional(),
  is_active: z.boolean(),
  price_usd: z.coerce.number().min(1),
  required_equipment_en: z.string().optional(),
  required_equipment_ka: z.string().optional(),
  required_equipment_ru: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  title_en: z.string().min(1, 'Title is required'),
  title_ka: z.string().min(1, 'Title is required'),
  title_ru: z.string().min(1, 'Title is required'),
  vertical_drop_m: z.coerce.number().min(1),
})

export const TourForm = ({ tour }: { tour?: z.infer<typeof formSchema> }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: tour || {
      description_en: '',
      description_ka: '',
      description_ru: '',
      difficulty: 3,
      duration_hours: 8,
      group_size_max: 10,
      group_size_min: 1,
      is_active: true,
      price_usd: 100,
      slug: '',
      title_en: '',
      title_ka: '',
      title_ru: '',
      vertical_drop_m: 1000,
    },
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = tour
      ? supabase.from('tours').update(values).eq('id', tour.id)
      : supabase.from('tours').insert([values])

    toast.promise(promise, {
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

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (EN)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (KA)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title_ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (RU)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="description_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (EN)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (KA)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description_ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (RU)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration_hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_usd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="group_size_min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Group Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group_size_max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Group Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vertical_drop_m"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vertical Drop (m)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="required_equipment_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Equipment (EN)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="required_equipment_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Equipment (KA)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="required_equipment_ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Equipment (RU)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Is this tour currently active and visible to users?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">{tour ? 'Update' : 'Create'}</Button>
      </form>
    </Form>
  )
}
