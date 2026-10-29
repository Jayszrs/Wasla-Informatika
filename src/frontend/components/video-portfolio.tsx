'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioVideos, portfolioProfiles, companyProfileFilm } from '@/shared/video-portfolio'
import { localizedPath } from '@/shared/i18n'
import { useLocale } from './locale-provider'
import { Arrow } from './icons'
import styles from './video-portfolio.module.css'

type PortfolioVideo = typeof portfolioVideos[number]
type PlayerSelection = { title: string; url: string; embedSrc: string; playerKind: 'video' | 'profile' }

function TikTokCreatorPreview({ onLoadingChange }: { onLoadingChange: (loading: boolean) => void }) {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = host.current
    if (!container) return
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    const ready = () => onLoadingChange(false)
    const observer = new MutationObserver(() => {
      const frame = container.querySelector('iframe')
      if (frame) { frame.addEventListener('load', ready, { once: true }); observer.disconnect() }
    })
    observer.observe(container, { childList: true, subtree: true })
    script.addEventListener('error', ready)
    container.append(script)
    const timeout = window.setTimeout(ready, 10_000)
    return () => { observer.disconnect(); window.clearTimeout(timeout); script.remove() }
  }, [onLoadingChange])
  return <div className={styles.creator} ref={host}><blockquote className="tiktok-embed" cite="https://www.tiktok.com/@jayszrss" data-unique-id="jayszrss" data-embed-type="creator" data-embed-from="oembed" style={{ maxWidth: '100%', minWidth: 288 }}><section><a href="https://www.tiktok.com/@jayszrss" target="_blank" rel="noopener noreferrer">@jayszrss</a></section></blockquote></div>
}

export function PortfolioNavigation() {
  const en = useLocale() === 'en'
  return <nav className={`${styles.navigation} wrap`} aria-label={en ? 'Portfolio formats' : 'Format portofolio'}><a href="#website-portfolio">{en ? 'Websites & applications' : 'Website & aplikasi'}</a><a href="#video-portfolio">{en ? 'Video & creative work' : 'Video & karya kreatif'}<Arrow/></a></nav>
}

export function VideoPortfolio({ compact = false }: { compact?: boolean }) {
  const en = useLocale() === 'en'
  const heading = useId()
  const playerTitle = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<PlayerSelection | null>(null)
  const [loading, setLoading] = useState(false)
  const tiktokSelected = selected?.embedSrc.startsWith('https://www.tiktok.com/embed/')
  const videos = compact ? [portfolioVideos[0], portfolioVideos[3]] : portfolioVideos
  function open(selection: PlayerSelection) {
    setLoading(true)
    setSelected(selection)
  }
  function openVideo(video: PortfolioVideo) {
    open({ title: video.title, url: `https://www.youtube.com/watch?v=${video.id}`, embedSrc: `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`, playerKind: 'video' })
  }

  useEffect(() => {
    const modal = dialog.current
    if (!selected || !modal) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modal.showModal()
    return () => {
      if (modal.open) modal.close()
      document.body.style.overflow = overflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [selected])

  return <section className={`${styles.section} wrap`} id="video-portfolio" aria-labelledby={heading}>
    <div className={styles.heading}><h2 id={heading}>{en ? 'Video & creative work.' : 'Video & karya kreatif.'}</h2><p>{en ? 'A selection of videos, editing work and content across different formats.' : 'Pilihan video, hasil editing, dan konten dalam beragam format.'}</p></div>
    <div className={styles.grid}>{videos.map(video => {
      const url = `https://www.youtube.com/watch?v=${video.id}`
      const artwork = <><Image src={`/images/video-portfolio/${video.id}.jpg`} alt="" fill sizes="(max-width: 767px) 92vw, 46vw"/><span className={styles.play} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7z"/></svg></span></>
      return <article className={styles.work} key={video.id}>
        {video.embed ? <button className={styles.thumbnail} type="button" onClick={() => openVideo(video)} aria-label={`${en ? 'Play' : 'Putar'} ${video.title}`}>{artwork}</button> : <a className={styles.thumbnail} href={url} target="_blank" rel="noopener noreferrer" aria-label={en ? `Watch ${video.title} on YouTube` : `Tonton ${video.title} di YouTube`}>{artwork}</a>}
        <div className={styles.details}><span>{en ? video.kindEn : video.kind}</span><h3>{video.embed ? <button type="button" onClick={() => openVideo(video)}>{video.title}</button> : <a href={url} target="_blank" rel="noopener noreferrer">{video.title}</a>}</h3><p>{video.publisher}</p><a href={url} target="_blank" rel="noopener noreferrer">{en ? 'Watch on YouTube' : 'Tonton di YouTube'}<Arrow diagonal/></a></div>
      </article>
    })}</div>
    {compact ? <div className={styles.more}><Link href={localizedPath('/portofolio#video-portfolio', en ? 'en' : 'id')}>{en ? 'Explore all video work' : 'Lihat seluruh portofolio video'}<Arrow diagonal/></Link></div> : <>
      <article className={styles.drive}>
        <button className={styles.thumbnail} type="button" onClick={() => open({ ...companyProfileFilm, playerKind: 'video' })} aria-label={en ? 'Play Company Profile FTID' : 'Putar Company Profile FTID'}><Image src={companyProfileFilm.image} alt="" fill sizes="(max-width: 767px) 92vw, 60vw"/><span className={styles.play} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7z"/></svg></span></button>
        <div className={styles.driveDetails}><span>{en ? 'Company profile film' : 'Video profil perusahaan'}</span><h3>{companyProfileFilm.title}</h3><button type="button" onClick={() => open({ ...companyProfileFilm, playerKind: 'video' })}>{en ? 'Watch film' : 'Tonton video'}<Arrow/></button><a href={companyProfileFilm.url} target="_blank" rel="noopener noreferrer">{en ? 'Open original file' : 'Buka file asli'}<Arrow diagonal/></a></div>
      </article>
      <div className={styles.profileHeading}><h3>{en ? 'More work & collaborations.' : 'Karya & kolaborasi lainnya.'}</h3><p>{en ? 'Explore the original channels and accounts.' : 'Jelajahi karya di kanal dan akun aslinya.'}</p></div>
      <div className={styles.profiles}>{portfolioProfiles.map(profile => <article className={styles.profileCard} key={profile.key} data-profile={profile.key}>
        <button className={styles.profileVisual} type="button" aria-label={`${en ? 'Explore' : 'Jelajahi'} ${profile.name}`} onClick={() => open({ title: profile.name, url: profile.url, embedSrc: profile.embedSrc, playerKind: profile.playerKind })}>
          <Image src={`/images/video-portfolio/${profile.image}`} alt={en ? `Preview of ${profile.name}` : `Pratinjau ${profile.name}`} fill sizes="(max-width: 767px) 92vw, 46vw"/>
          <span className={styles.profileAvatar}><Image src={`/images/video-portfolio/${profile.avatar}`} alt="" width={64} height={64}/></span>
          <span className={styles.profileAction} aria-hidden="true"><Arrow diagonal/></span>
        </button>
        <div className={styles.profileDetails}><span>{profile.platform}</span><h4><button type="button" onClick={() => open({ title: profile.name, url: profile.url, embedSrc: profile.embedSrc, playerKind: profile.playerKind })}>{profile.name}</button></h4><p>{en ? profile.copyEn : profile.copy}</p><div><button type="button" onClick={() => open({ title: profile.name, url: profile.url, embedSrc: profile.embedSrc, playerKind: profile.playerKind })}>{en ? 'Explore content' : 'Jelajahi konten'}<Arrow/></button><a href={profile.url} target="_blank" rel="noopener noreferrer">{en ? 'Open account' : 'Buka akun'}<Arrow diagonal/></a></div></div>
      </article>)}</div>
    </>}
    <dialog ref={dialog} className={`${styles.dialog} ${selected?.playerKind === 'profile' ? styles.profileDialog : ''}`} aria-labelledby={playerTitle} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      {selected && <div className={styles.player}><header><h2 id={playerTitle}>{selected.title}</h2><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label={en ? 'Close video' : 'Tutup video'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button></header><div className={styles.frameWrap}>{loading && <span className={styles.loading} role="status">{en ? 'Loading content…' : 'Memuat konten…'}</span>}{tiktokSelected ? <TikTokCreatorPreview onLoadingChange={setLoading}/> : <iframe key={selected.embedSrc} title={selected.title} src={selected.embedSrc} onLoad={() => setLoading(false)} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>}</div>{selected.playerKind === 'profile' && <p className={styles.embedHint}>{en ? 'Explore the account preview. If content is unavailable, open the original account below.' : 'Jelajahi pratinjau akun. Jika konten belum muncul, buka akun asli di bawah.'}</p>}<a href={selected.url} target="_blank" rel="noopener noreferrer">{en ? 'Open original source' : 'Buka sumber asli'}<Arrow diagonal/></a></div>}
    </dialog>
  </section>
}
