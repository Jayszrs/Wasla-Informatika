export function publicBlobSource(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' && /^[a-zA-Z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(url.hostname) && !url.username && !url.password) return url.href
  } catch { /* Local uploads continue through the media route. */ }
  return undefined
}

export function mediaSource(url: string) {
  try {
    const parsed = new URL(url, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    if (parsed.pathname.startsWith('/api/media/file/')) return parsed.pathname
  } catch { return url }
  return url
}
export function seoImageSource(image?: number | { url?: string | null } | null) {
  return image && typeof image === 'object' && image.url ? mediaSource(image.url) : undefined
}
