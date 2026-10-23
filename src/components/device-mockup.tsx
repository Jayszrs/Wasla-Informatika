import Image from 'next/image'
import type { Media, Project } from '@/lib/content-types'
import { mediaSource } from '@/lib/media'

type Screen = { src: string; alt: string; width: number; height: number }
export function DeviceFrame({ image, device = 'laptop', priority = false }: { image: Screen; device?: 'laptop' | 'tablet' | 'phone'; priority?: boolean }) {
  return <div className={`device-frame device-${device}`}><div className="device-display"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} preload={priority} sizes={device === 'phone' ? '(max-width: 767px) 22vw, 240px' : '(max-width: 767px) 90vw, 900px'}/></div>{device === 'laptop' && <div className="device-base" aria-hidden="true"/>}</div>
}
function screen(media: Media, alt: string): Screen {
  return { src: mediaSource(media.url!), alt, width: media.width || 1440, height: media.height || 1000 }
}
export function ProjectMockup({ project, priority = false }: { project: Project; priority?: boolean }) {
  const cover = typeof project.thumbnail === 'object' && project.thumbnail?.url ? project.thumbnail : null
  if (!cover) return null
  const mobile = project.gallery?.map(item => item.image).find((image): image is Media => typeof image === 'object' && !!image?.url && !!image.width && !!image.height && image.width / image.height < .8)
  return <div className={`project-device-stage ${mobile ? 'has-mobile' : ''}`}><DeviceFrame image={screen(cover, `Tampilan desktop website ${project.title}`)} priority={priority}/>{mobile && <DeviceFrame device="phone" image={screen(mobile, `Tampilan mobile website ${project.title}`)}/>}</div>
}
