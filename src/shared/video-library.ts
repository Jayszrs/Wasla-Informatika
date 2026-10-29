import type { Media, VideoProject } from './content-types'
import { mediaSource } from './media'
import { portfolioVideos, companyProfileFilm } from './video-portfolio'
import type { VideoProvider } from './video-source'
import channelItems from './data/video-channel-items.json'

export type VideoLibraryItem = {
  key: string; title: string; category: string; channel: string; provider: VideoProvider;
  sourceURL: string; posterURL: string; nativeURL?: string; description: string; featured: boolean; mediaType?: 'video' | 'image';
}

export const initialVideoItems: VideoLibraryItem[] = [
  ...portfolioVideos.map(video => ({
    key: video.id, title: video.title, category: video.kind, channel: 'Pilihan', provider: 'youtube' as const,
    sourceURL: `https://www.youtube.com/watch?v=${video.id}`, posterURL: `/images/video-portfolio/${video.id}.jpg`,
    description: video.publisher, featured: ['XV0e0PkjDPc', 'hOLDG50DHCI'].includes(video.id),
  })),
  { key: 'company-profile-ftid', title: companyProfileFilm.title, category: 'Profil perusahaan', channel: 'Pilihan', provider: 'drive', sourceURL: companyProfileFilm.url, posterURL: companyProfileFilm.image, description: 'Company Profile FTID', featured: false },
  ...channelItems.map((item, index) => ({ ...item, key: `channel-work-${index + 1}`, provider: item.provider as VideoProvider, mediaType: item.mediaType as 'video' | 'image', featured: false })),
]

function resolvedMedia(value?: Media | number | null) { return value && typeof value === 'object' ? value : null }
export function videoLibraryItem(project: VideoProject): VideoLibraryItem {
  const thumbnail = resolvedMedia(project.thumbnail)
  const video = resolvedMedia(project.video)
  return {
    key: project.slug, title: project.title, category: project.category, channel: project.channel, provider: project.provider,
    sourceURL: project.sourceURL || '', posterURL: thumbnail?.url ? mediaSource(thumbnail.url) : '',
    nativeURL: project.mediaType !== 'image' && video?.url && String(video.mimeType || '').startsWith('video/') ? mediaSource(video.url) : undefined,
    description: project.description || '', featured: Boolean(project.featured), mediaType: project.mediaType || 'video',
  }
}
