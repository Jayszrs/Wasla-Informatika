import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import type { Locale } from '@/shared/i18n'

export const getLocale = cache(async (): Promise<Locale> => {
  const requestHeaders = await headers()
  return requestHeaders.get('x-wasla-locale') === 'en' ? 'en' : 'id'
})
