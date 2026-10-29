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

export function PortfolioNavigation() {
  const en = useLocale() === 'en'
  return <nav className={`${styles.navigation} wrap`} aria-label={en ? 'Portfolio formats' : 'Format portofolio'}><a href="#website-portfolio">{en ? 'Websites & applications' : 'Website & aplikasi'}</a><a href="#video-portfolio">{en ? 'Video & creative work' : 'Video & karya kreatif'}<Arrow/></a></nav>
}

export function VideoPortfolio({ compact = false }: { compact?: boolean }) {
  const en = useLocale() === 'en'
  const heading = useId()
  const playerTitle = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<PortfolioVideo | null>(null)
  const videos = compact ? [portfolioVideos[0], portfolioVideos[3]] : portfolioVideos

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
        {video.embed ? <button className={styles.thumbnail} type="button" onClick={() => setSelected(video)} aria-label={`${en ? 'Play' : 'Putar'} ${video.title}`}>{artwork}</button> : <a className={styles.thumbnail} href={url} target="_blank" rel="noopener noreferrer" aria-label={en ? `Watch ${video.title} on YouTube` : `Tonton ${video.title} di YouTube`}>{artwork}</a>}
        <div className={styles.details}><span>{en ? video.kindEn : video.kind}</span><h3>{video.embed ? <button type="button" onClick={() => setSelected(video)}>{video.title}</button> : <a href={url} target="_blank" rel="noopener noreferrer">{video.title}</a>}</h3><p>{video.publisher}</p><a href={url} target="_blank" rel="noopener noreferrer">{en ? 'Watch on YouTube' : 'Tonton di YouTube'}<Arrow diagonal/></a></div>
      </article>
    })}</div>
    {compact ? <div className={styles.more}><Link href={localizedPath('/portofolio#video-portfolio', en ? 'en' : 'id')}>{en ? 'Explore all video work' : 'Lihat seluruh portofolio video'}<Arrow diagonal/></Link></div> : <>
      <a className={styles.drive} href={companyProfileFilm.url} target="_blank" rel="noopener noreferrer"><span className={styles.fileIcon} aria-hidden="true"><svg width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M5 2h12l6 6v22H5zM17 2v7h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m11 14 7 5-7 5z" fill="currentColor"/></svg></span><span><span className={styles.driveTitle}>{companyProfileFilm.title}</span><span className={styles.driveCopy}>{en ? 'Company profile film · Google Drive' : 'Video profil perusahaan · Google Drive'}</span></span><span className={styles.openLabel}>{en ? 'Watch film' : 'Tonton video'}</span><Arrow diagonal/></a>
      <div className={styles.profileHeading}><h3>{en ? 'More work & collaborations.' : 'Karya & kolaborasi lainnya.'}</h3><p>{en ? 'Explore the original channels and accounts.' : 'Jelajahi karya di kanal dan akun aslinya.'}</p></div>
      <div className={styles.profiles}>{portfolioProfiles.map(profile => <a key={profile.url} href={profile.url} target="_blank" rel="noopener noreferrer"><span className={styles.platform}>{profile.platform}</span><div><h4>{profile.name}</h4><p>{en ? profile.copyEn : profile.copy}</p></div><Arrow diagonal/></a>)}</div>
    </>}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={playerTitle} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      {selected && <div className={styles.player}><header><h2 id={playerTitle}>{selected.title}</h2><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label={en ? 'Close video' : 'Tutup video'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button></header><iframe title={selected.title} src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/><a href={`https://www.youtube.com/watch?v=${selected.id}`} target="_blank" rel="noopener noreferrer">{en ? 'Open on YouTube' : 'Buka di YouTube'}<Arrow diagonal/></a></div>}
    </dialog>
  </section>
}
