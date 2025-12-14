'use client'

import { FormProvider } from 'react-hook-form'

import { useFormField } from './form/context'
import { FormControl } from './form/FormControl'
import { FormField } from './form/FormField'
import { FormItem } from './form/FormItem'
import { FormLabel } from './form/FormLabel'
import { FormDescription, FormMessage } from './form/FormText'

const Form = FormProvider

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
