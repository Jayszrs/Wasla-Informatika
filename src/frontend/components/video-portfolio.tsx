'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initialVideoItems, type VideoLibraryItem } from '@/shared/video-library'
import { localizedPath } from '@/shared/i18n'
import { parseVideoSource } from '@/shared/video-source'
import { useLocale } from './locale-provider'
import { Arrow } from './icons'
import { VideoPlayback, type PlaybackStatus } from './video-playback'
import styles from './video-portfolio.module.css'

function PlayMark() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7z"/></svg>
}
function Artwork({ item, sizes }: { item: VideoLibraryItem; sizes: string }) {
  return item.posterURL ? <Image src={item.posterURL} alt="" fill sizes={sizes}/> : <span className={styles.noPoster}>{item.title}</span>
}
function WorkCard({ item, open }: { item: VideoLibraryItem; open: (item: VideoLibraryItem) => void }) {
  const en = useLocale() === 'en'
  return <article className={styles.work} data-video-key={item.key}>
    <button className={styles.thumbnail} type="button" onClick={() => open(item)} aria-label={`${item.mediaType === 'image' ? (en ? 'View' : 'Lihat') : (en ? 'Play' : 'Putar')} ${item.title}`}>
      <Artwork item={item} sizes="(max-width: 767px) 92vw, 46vw"/>
      <span className={styles.play}>{item.mediaType === 'image' ? <Arrow diagonal/> : <PlayMark/>}</span>
      <span className={styles.watch}>{item.mediaType === 'image' ? (en ? 'View image' : 'Lihat gambar') : (en ? 'Watch film' : 'Tonton video')}</span>
    </button>
    <div className={styles.details}><div className={styles.captionLine}><span>{item.category}</span><span>{item.channel === 'Pilihan' ? item.provider === 'drive' ? 'FTID' : 'Wasla' : item.channel}</span></div><h3><button type="button" onClick={() => open(item)}>{item.title}</button></h3>{item.description && <p>{item.description}</p>}</div>
  </article>
}

export function PortfolioNavigation() {
  const en = useLocale() === 'en'
  return <nav className={`${styles.navigation} wrap`} aria-label={en ? 'Portfolio formats' : 'Format portofolio'}><a href="#website-portfolio">{en ? 'Websites & applications' : 'Website & aplikasi'}</a><a href="#video-portfolio">{en ? 'Video & creative work' : 'Video & karya kreatif'}<Arrow/></a></nav>
}

export function VideoPortfolio({ compact = false, items = initialVideoItems }: { compact?: boolean; items?: VideoLibraryItem[] }) {
  const en = useLocale() === 'en'
  const heading = useId()
  const galleryId = useId()
  const playerTitle = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<VideoLibraryItem | null>(null)
  const playerOpen = selected !== null
  const [status, setStatus] = useState<PlaybackStatus>('loading')
  const [retry, setRetry] = useState(0)
  const [channel, setChannel] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const films = compact ? items.filter(item => item.featured).slice(0, 2) : items.filter(item => item.channel === 'Pilihan')
  const channels = [...new Set(items.filter(item => item.channel !== 'Pilihan').map(item => item.channel))]
  const channelItems = items.filter(item => item.channel !== 'Pilihan' && (channel === 'all' || item.channel === channel))
  const visibleChannelItems = expanded ? channelItems : channelItems.slice(0, 6)
  const queue = selected?.channel === 'Pilihan' ? items.filter(item => item.channel === 'Pilihan') : channelItems
  const open = useCallback((item: VideoLibraryItem) => { setStatus('loading'); setRetry(0); setSelected(item) }, [])

  useEffect(() => {
    const modal = dialog.current
    if (!playerOpen || !modal) return
    if (modal.open) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modal.showModal()
    return () => {
      if (modal.open) modal.close()
      document.body.style.overflow = overflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [playerOpen])

  const portrait = selected ? selected.mediaType !== 'image' && parseVideoSource(selected.sourceURL)?.portrait : false
  return <section className={styles.section} id="video-portfolio" aria-labelledby={heading}>
    <svg className={styles.ornament} viewBox="0 0 1000 500" fill="none" aria-hidden="true"><path d="M1040 45C850-95 568 13 614 204c43 180 296 100 377 245M1110 30C875-155 470-10 526 236c50 223 343 127 438 309" stroke="currentColor" strokeWidth="1"/></svg>
    <div className={`${styles.content} wrap`}>
      <div className={styles.heading}><h2 id={heading}>{en ? <>Stories.<br/>In motion.</> : <>Cerita.<br/>Dalam gerak.</>}</h2><div><p>{en ? 'Films, editing and visual content from the Wasla portfolio.' : 'Film, editing, dan konten visual dari portofolio Wasla.'}</p><span>{items.length} {en ? 'works in the collection' : 'karya dalam koleksi'}</span></div></div>
      {!!films.length && <div className={styles.grid} aria-label={en ? 'Selected films' : 'Film pilihan'}>{films.map(item => <WorkCard key={item.key} item={item} open={open}/>)}</div>}
      {!items.length && <p>{en ? 'New work is being prepared.' : 'Karya baru sedang disiapkan.'}</p>}
      {compact ? <div className={styles.more}><Link href={localizedPath('/portofolio#video-portfolio', en ? 'en' : 'id')}>{en ? 'Explore the full collection' : 'Jelajahi seluruh koleksi'}<Arrow diagonal/></Link></div> : !!channels.length && <div className={styles.channelSection}>
        <div className={styles.channelHeading}><h3>{en ? 'Across the channels.' : 'Karya lintas kanal.'}</h3><p>{en ? 'Choose a channel, then play a work from its gallery.' : 'Pilih kanal, lalu putar karya dari galerinya.'}</p></div>
        <div className={styles.tabs} role="tablist" aria-label={en ? 'Work channels' : 'Kanal karya'} onKeyDown={event => {
          const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
          const index = tabs.indexOf(document.activeElement as HTMLButtonElement)
          const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1
          if (next >= 0) { event.preventDefault(); tabs[next].click(); tabs[next].focus() }
        }}>{['all', ...channels].map(name => <button key={name} role="tab" aria-selected={channel === name} aria-controls={galleryId} tabIndex={channel === name ? 0 : -1} type="button" onClick={() => { setChannel(name); setExpanded(false) }}>{name === 'all' ? (en ? 'All channels' : 'Semua kanal') : name}<span>{items.filter(item => item.channel !== 'Pilihan' && (name === 'all' || item.channel === name)).length}</span></button>)}</div>
        <p className={styles.count} role="status">{channelItems.length} {en ? 'works' : 'karya'}</p>
        <div className={styles.channelGrid} id={galleryId} role="tabpanel" aria-label={channel === 'all' ? (en ? 'All channels' : 'Semua kanal') : channel}>{visibleChannelItems.map(item => <WorkCard key={item.key} item={item} open={open}/>)}</div>
        {!expanded && channelItems.length > visibleChannelItems.length && <div className={styles.more}><button type="button" onClick={() => setExpanded(true)}>{en ? 'Show more work' : 'Tampilkan karya lainnya'}<span>{channelItems.length - visibleChannelItems.length}</span></button></div>}
      </div>}
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={playerTitle} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      {selected && <div className={styles.theater}>
        <header className={styles.playerBar}><span className={styles.playerBrand}>wasla<span>{en ? 'Film collection' : 'Koleksi karya'}</span></span><button type="button" className={styles.close} autoFocus onClick={() => dialog.current?.close()} aria-label={en ? 'Close video' : 'Tutup video'}><span>{en ? 'Close' : 'Tutup'}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button></header>
        <div className={styles.watchLayout}><div className={styles.mainPlayer}>
          <div className={`${styles.screen} ${portrait ? styles.portraitScreen : ''}`}>
            <VideoPlayback key={`${selected.key}:${retry}`} item={selected} onStatus={setStatus}/>
            {status === 'loading' && <div className={styles.loading} role="status"><span/>{en ? 'Preparing the film' : 'Menyiapkan video'}</div>}
            {status === 'error' && <div className={styles.playError} role="status"><p>{en ? 'This video cannot play here right now.' : 'Video ini belum dapat diputar di sini.'}</p><button type="button" onClick={() => { setStatus('loading'); setRetry(value => value + 1) }}>{en ? 'Try again' : 'Coba lagi'}</button>{selected.sourceURL && <a href={selected.sourceURL} target="_blank" rel="noopener noreferrer">{en ? 'Open original video' : 'Buka video asli'}<Arrow diagonal/></a>}</div>}
          </div>
          <div className={styles.filmMeta}><div><span>{selected.category} · {selected.channel}</span><h2 id={playerTitle}>{selected.title}</h2>{selected.description && <p>{selected.description}</p>}</div>{selected.sourceURL && <a href={selected.sourceURL} target="_blank" rel="noopener noreferrer">{en ? 'Original source' : 'Sumber asli'}<Arrow diagonal/></a>}</div>
        </div><aside className={styles.queue} aria-label={en ? 'More work' : 'Karya lainnya'}><h3>{en ? 'In this collection' : 'Dalam koleksi ini'}</h3><div>{queue.map(item => <button key={item.key} type="button" className={item.key === selected.key ? styles.current : ''} aria-pressed={item.key === selected.key} onClick={() => open(item)}><span className={styles.queueImage}><Artwork item={item} sizes="120px"/>{item.key === selected.key && (item.mediaType === 'image' ? <Arrow diagonal/> : <PlayMark/>)}</span><span><strong>{item.title}</strong><small>{item.category}</small></span></button>)}</div></aside></div>
      </div>}
    </dialog>
  </section>
}
