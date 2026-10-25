'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Testimonial } from '@/shared/content-types'
import styles from './homepage-proof.module.css'

type Locale = 'id' | 'en'
type Quote = { id: number; quote: string; clientName: string; company: string; position?: string | null }

const demoQuotes: Record<Locale, Quote[]> = {
  id: [
    { id: -1, clientName: 'Contoh klien 1', company: 'Data uji', quote: 'Ini contoh kartu testimoni untuk menguji tampilan beranda. Ganti teks ini dengan ulasan yang telah mendapat izin.' },
    { id: -2, clientName: 'Contoh klien 2', company: 'Data uji', quote: 'Di bagian ini, klien dapat menceritakan pengalaman bekerja bersama tim Wasla. Teks ini hanya contoh untuk pengujian.' },
    { id: -3, clientName: 'Contoh klien 3', company: 'Data uji', quote: 'Ulasan yang sudah disetujui di CMS akan menggantikan data uji ini secara otomatis.' },
  ],
  en: [
    { id: -1, clientName: 'Sample client 1', company: 'Test data', quote: 'This sample testimonial card is for testing the homepage layout. Replace this text with a review you have permission to publish.' },
    { id: -2, clientName: 'Sample client 2', company: 'Test data', quote: 'Clients can share their experience of working with Wasla here. This text is only a sample for testing.' },
    { id: -3, clientName: 'Sample client 3', company: 'Test data', quote: 'Reviews approved in the CMS will automatically replace this test data.' },
  ],
}

export function TestimonialRail({ testimonials, locale = 'id' }: { testimonials: Testimonial[]; locale?: Locale }) {
  const approved = testimonials.filter(item => item.approved === true && item._status !== 'draft' && item.quote.trim() && item.clientName.trim())
  const demonstration = approved.length === 0
  const quotes: Quote[] = demonstration ? demoQuotes[locale] : approved
  const english = locale === 'en'
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const moving = quotes.length > 1
  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { rootMargin: '80px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  function move(direction: number) {
    setPaused(true)
    const animation = track.current?.getAnimations()[0]
    if (animation && typeof animation.currentTime === 'number') {
      const duration = quotes.length * 11_000
      const offset = animation.currentTime + direction * 11_000
      animation.currentTime = ((offset % duration) + duration) % duration
    } else {
      const card = track.current?.querySelector<HTMLElement>('li')
      viewport.current?.scrollBy({ left: direction * ((card?.offsetWidth || 300) + 24), behavior: 'smooth' })
    }
  }
  const list = (copy = false) => <ul className={`${styles.quoteList} ${copy ? styles.copy : ''}`} aria-hidden={copy || undefined} inert={copy || undefined}>
    {quotes.map(item => <li className={styles.quoteCard} key={item.id}><figure>
      <blockquote>{item.quote}</blockquote>
      <figcaption><strong>{item.clientName}</strong><span>{[item.position, item.company].filter(Boolean).join(' · ')}</span></figcaption>
    </figure></li>)}
  </ul>
  return <section ref={root} className={styles.testimonials} aria-labelledby="testimonials-title" data-demo={demonstration}>
    <div className="wrap">
      <div className={styles.railHeading}>
        <div><h2 id="testimonials-title">{english ? 'Stories of working together.' : 'Cerita bekerja bersama.'}</h2><p>{demonstration ? english ? 'Test the layout before publishing your client reviews.' : 'Uji tampilannya sebelum menayangkan ulasan dari klien.' : english ? 'Reviews shared with permission by our clients.' : 'Ulasan yang dibagikan dengan izin oleh klien kami.'}</p></div>
        {moving && <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label={english ? 'Previous testimonial' : 'Testimoni sebelumnya'}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button type="button" className={styles.pause} onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? english ? 'Resume' : 'Lanjutkan' : english ? 'Pause' : 'Jeda'}</button>
          <button type="button" onClick={() => move(1)} aria-label={english ? 'Next testimonial' : 'Testimoni berikutnya'}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>}
      </div>
      {demonstration && <p className={styles.demoNotice}><strong>{english ? 'Test data.' : 'Data uji.'}</strong> {english ? 'The examples below are not client testimonials.' : 'Contoh di bawah bukan testimoni pelanggan.'}</p>}
      <div ref={viewport} className={styles.viewport} role="region" aria-label={english ? 'Client testimonial carousel' : 'Karusel testimoni klien'} style={{ '--cards': Math.min(quotes.length, 3) } as CSSProperties}>
        <div ref={track} className={`${styles.track} ${!moving ? styles.single : ''}`} data-paused={paused || !visible} style={{ '--rail-duration': `${quotes.length * 11}s` } as CSSProperties}>
          {list()}{moving && list(true)}
        </div>
      </div>
    </div>
  </section>
}
