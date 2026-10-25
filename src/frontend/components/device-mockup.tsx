import Image from 'next/image'
import type { Media, Project } from '@/shared/content-types'
import { mediaSource } from '@/shared/media'
import { translate, type Locale } from '@/shared/i18n'
import { DeviceScene } from './device-scene'

type Screen = { src: string; alt: string; width: number; height: number }
export function DeviceFrame({ image, device = 'laptop', priority = false }: { image: Screen; device?: 'laptop' | 'tablet' | 'phone'; priority?: boolean }) {
  return <div className={`device-frame device-${device}`}><div className="device-display"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} preload={priority} sizes={device === 'phone' ? '(max-width: 767px) 22vw, 240px' : '(max-width: 767px) 90vw, 900px'}/></div>{device === 'laptop' && <div className="device-base" aria-hidden="true"/>}</div>
}
function screen(media: Media, alt: string): Screen {
  return { src: mediaSource(media.url!), alt, width: media.width || 1440, height: media.height || 1000 }
}
export function ProjectMockup({ project, priority = false, locale = 'id' }: { project: Project; priority?: boolean; locale?: Locale }) {
  const cover = typeof project.thumbnail === 'object' && project.thumbnail?.url ? project.thumbnail : null
  if (!cover) return null
  const mobile = project.gallery?.map(item => item.image).find((image): image is Media => typeof image === 'object' && !!image?.url && !!image.width && !!image.height && image.width / image.height < .8)
  const desktopScreen = screen(cover, translate(`Tampilan desktop website ${project.title}`, locale))
  const mobileScreen = mobile ? screen(mobile, translate(`Tampilan mobile website ${project.title}`, locale)) : undefined
  return <DeviceScene spec={{ device: 'laptop', screen: desktopScreen, mobile: mobileScreen }} className={`project-device-stage ${mobile ? 'has-mobile' : ''}`}><DeviceFrame image={desktopScreen} priority={priority}/>{mobileScreen && <DeviceFrame device="phone" image={mobileScreen}/>}</DeviceScene>
}

export function GalleryDevice({ image, device, locale = 'id' }: { image: Screen; device: 'laptop' | 'tablet' | 'phone'; locale?: Locale }) {
  image = { ...image, alt: translate(image.alt, locale) }
  return <DeviceScene spec={{ device, screen: image }} className={`gallery-device-stage ${device === 'phone' ? 'is-portrait' : ''}`}><DeviceFrame image={image} device={device}/></DeviceScene>
}

export function BrandPhone({ locale = 'id' }: { locale?: Locale } = {}) {
  const image = { src: '/images/brand/favicon-navy.png', alt: translate('Wasla Informatika pada layar ponsel', locale), width: 512, height: 512 }
  return <DeviceScene className="brand-phone-stage" spec={{ device: 'phone', screen: image, brand: true }}><div className="brand-phone-fallback"><Image src={image.src} alt={image.alt} width={160} height={160}/><strong>wasla<span>informatika</span></strong></div></DeviceScene>
}
