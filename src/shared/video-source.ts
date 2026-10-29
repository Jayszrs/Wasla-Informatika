export type VideoProvider = 'youtube' | 'tiktok' | 'instagram' | 'drive' | 'upload'
export type VideoSource = { provider: Exclude<VideoProvider, 'upload'>; id: string; embedURL: string; url: string; portrait: boolean }

export function parseVideoSource(value?: string | null): VideoSource | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null
    const host = url.hostname.toLowerCase()
    if (['youtu.be', 'www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(host)) {
      const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1]
      if (!id || !/^[\w-]{11}$/.test(id)) return null
      return { provider: 'youtube', id, url: `https://www.youtube.com/watch?v=${id}`, embedURL: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`, portrait: url.pathname.startsWith('/shorts/') }
    }
    if (['www.tiktok.com', 'tiktok.com'].includes(host)) {
      const match = url.pathname.match(/^\/@([\w.]+)\/video\/(\d{15,25})\/?$/)
      if (!match) return null
      return { provider: 'tiktok', id: match[2], url: `https://www.tiktok.com/@${match[1]}/video/${match[2]}`, embedURL: `https://www.tiktok.com/player/v1/${match[2]}?autoplay=1&rel=0`, portrait: true }
    }
    if (['www.instagram.com', 'instagram.com'].includes(host)) {
      const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([\w-]+)\/?$/)
      if (!match) return null
      const kind = match[1] === 'reels' ? 'reel' : match[1]
      return { provider: 'instagram', id: match[2], url: `https://www.instagram.com/${kind}/${match[2]}/`, embedURL: `https://www.instagram.com/${kind}/${match[2]}/embed/`, portrait: true }
    }
    if (host === 'drive.google.com') {
      const id = url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1] || url.searchParams.get('id')
      if (!id || !/^[\w-]{10,150}$/.test(id)) return null
      return { provider: 'drive', id, url: `https://drive.google.com/file/d/${id}/view`, embedURL: `https://drive.google.com/file/d/${id}/preview`, portrait: false }
    }
  } catch { return null }
  return null
}

export const maxVideoBytes = 250 * 1024 * 1024
export function videoMimeType(bytes: Uint8Array): 'video/mp4' | 'video/webm' | null {
  if (bytes.length >= 12 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return 'video/mp4'
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return 'video/webm'
  return null
}
