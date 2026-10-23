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
