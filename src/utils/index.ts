export const formatPrice = (price: number, currency = '$'): string => {
  return `${currency}${price.toLocaleString()}`
}

export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`
  }
  if (hours === Math.floor(hours)) {
    return `${Math.floor(hours)}h`
  }
  return `${hours.toFixed(1)}h`
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
