import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id, i) => id === b[i])
