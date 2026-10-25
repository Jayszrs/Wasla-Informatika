'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from './icons'
import { GalleryDevice } from './device-mockup'

export type GalleryImage = { src: string; alt: string; caption: string; width: number; height: number }
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)
  const [ready, setReady] = useState('')
  const [failed, setFailed] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const open = active !== null
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) element.showModal()
    if (!open && element.open) element.close()
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])
  const step = (direction: number) => setActive(value => value === null ? null : (value + direction + images.length) % images.length)
  if (!images.length) return null
  return <section className="project-gallery" aria-labelledby="project-gallery-title"><div className="gallery-heading"><h2 id="project-gallery-title">Lebih dekat dengan project ini.</h2><p>Jelajahi tampilan dan detailnya. Pilih gambar untuk melihat lebih besar.</p></div><div className="gallery-grid">{images.map((image, i) => <figure key={`${image.src}-${i}`}><a href={image.src} target="_blank" rel="noopener noreferrer" onClick={event => { event.preventDefault(); setActive(i) }} aria-haspopup="dialog" aria-label={`Perbesar gambar ${i + 1}: ${image.alt}`}><GalleryDevice image={image} device={image.width / image.height < .8 ? 'phone' : i === 0 ? 'laptop' : 'tablet'}/><span className="gallery-enlarge" aria-hidden="true"><Arrow diagonal/></span></a><figcaption>{image.caption || image.alt}</figcaption></figure>)}</div><dialog ref={dialog} className="gallery-dialog" aria-label="Galeri project diperbesar" onCancel={() => setActive(null)} onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null) }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); step(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) } }}><div className="gallery-dialog-inner"><button type="button" className="gallery-close" onClick={() => setActive(null)} autoFocus aria-label="Tutup galeri">Tutup <span aria-hidden="true">×</span></button>{active !== null && <><Image key={images[active].src} src={images[active].src} alt={images[active].alt} width={images[active].width} height={images[active].height} sizes="(max-width: 767px) 94vw, 86vw" loading="eager" fetchPriority="high" onLoad={() => setReady(images[active].src)} onError={() => setFailed(images[active].src)}/>{ready !== images[active].src && failed !== images[active].src && <span className="gallery-loading" role="status">Memuat gambar�</span>}{failed === images[active].src && <a className="gallery-loading" href={images[active].src} target="_blank" rel="noopener noreferrer">Gambar belum termuat. Buka gambar asli</a>}<div className="gallery-controls"><button type="button" onClick={() => step(-1)} aria-label="Gambar sebelumnya">←</button><p aria-live="polite">{active + 1} / {images.length}<span>{images[active].caption || images[active].alt}</span></p><button type="button" onClick={() => step(1)} aria-label="Gambar berikutnya">→</button></div></>}</div></dialog></section>
}
