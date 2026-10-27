'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from './locale-provider'
import { localizedPath } from '@/shared/i18n'
import styles from './brand-films.module.css'
import { Arrow } from './icons'

const introSource = '/videos/wasla-introduction.mp4'

export function IntroductionFilm() {
  const locale = useLocale()
  const en = locale === 'en'
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [waiting, setWaiting] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const modal = dialog.current
    const film = video.current
    if (!modal || !film) return
    let previous: HTMLElement | null = null
    let originalOverflow = ''
    function open() {
      if (modal!.open) return
      previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      modal!.showModal()
      film!.currentTime = 0
      film!.muted = true
      setMuted(true)
      setFailed(Boolean(film!.error))
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) void film!.play().catch(() => { if (film!.error) setFailed(true); else setWaiting(true) })
      else setWaiting(true)
    }
    function closed() {
      if (modal!.open) return
      film!.pause()
      document.body.style.overflow = originalOverflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
    modal.addEventListener('close', closed)
    window.addEventListener('wasla:show-introduction', open)
    open()
    return () => {
      window.removeEventListener('wasla:show-introduction', open)
      modal.removeEventListener('close', closed)
      film.pause()
      if (modal.open) modal.close()
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return <dialog ref={dialog} className={styles.intro} aria-labelledby="introduction-title">
    <div className={styles.introShell}>
      <header className={styles.introHeader}><span className={styles.wordmark}>wasla<span>informatika</span></span><h2 id="introduction-title">{en ? 'A glimpse of Wasla.' : 'Sekilas tentang Wasla.'}</h2><button type="button" autoFocus onClick={() => dialog.current?.close()}>{en ? 'Skip intro' : 'Lewati intro'}<Arrow diagonal/></button></header>
      <div className={styles.introScreen}>
        <video ref={video} src={introSource} poster="/videos/wasla-introduction.jpg" playsInline muted={muted} controls preload="metadata" aria-label={en ? 'Wasla introduction film, Indonesian text, music without narration' : 'Video perkenalan Wasla, musik tanpa narasi'} onVolumeChange={event => setMuted(event.currentTarget.muted)} onEnded={() => dialog.current?.close()} onError={() => setFailed(true)} onPlay={() => setWaiting(false)}/>
        {waiting && !failed && <button className={styles.play} type="button" onClick={() => { void video.current?.play().catch(() => setWaiting(true)) }}>{en ? 'Play introduction' : 'Putar perkenalan'}</button>}
        {failed && <p className={styles.videoError}>{en ? 'The video could not load. You can continue to the website.' : 'Video belum bisa dimuat. Anda tetap bisa melanjutkan ke website.'}</p>}
      </div>
      <footer className={styles.introFooter}><span>{en ? 'Ideas. Design. Digital solutions.' : 'Ide. Desain. Solusi digital.'}</span><button type="button" aria-pressed={!muted} onClick={() => { const next = !muted; if (video.current) video.current.muted = next; setMuted(next) }}>{muted ? (en ? 'Turn sound on' : 'Nyalakan suara') : (en ? 'Mute sound' : 'Matikan suara')}</button><button type="button" onClick={() => dialog.current?.close()}>{en ? 'Explore website' : 'Jelajahi website'}</button></footer>
    </div>
  </dialog>
}

export function BrandFilmShowcase() {
  const en = useLocale() === 'en'
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const film = video.current
    if (!film) return
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) film.pause() }, { threshold: .1 })
    observer.observe(film)
    const hide = () => { if (document.hidden) film.pause() }
    document.addEventListener('visibilitychange', hide)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', hide) }
  }, [])
  return <section className={`${styles.showcase} wrap`} aria-labelledby="brand-film-title">
    <div className={styles.filmCopy}><h2 id="brand-film-title">{en ? <>Your idea.<br/>Your next website.</> : <>Dari ide,<br/>jadi website.</>}</h2><p>{en ? 'Show your business with a website that feels like you. Let’s discuss its design, features, and how it should work for your customers.' : 'Tampilkan bisnis Anda lewat website yang punya karakter. Kita bahas desain, fitur, dan cara website membantu pelanggan Anda.'}</p><div className={styles.filmActions}><Link className="button" href={localizedPath('/kontak', en ? 'en' : 'id')}>{en ? 'Discuss your website' : 'Diskusikan website Anda'}</Link><button type="button" className={styles.replay} onClick={() => window.dispatchEvent(new Event('wasla:show-introduction'))}>{en ? 'Watch the Wasla film' : 'Tonton film Wasla'}<Arrow diagonal/></button></div></div>
    <figure className={styles.reel}><video ref={video} src="/videos/wasla-sales-reel.mp4" poster="/videos/wasla-sales-reel.jpg" controls playsInline preload="none" aria-label={en ? 'Wasla website development reel, 15 seconds, Indonesian text, original music' : 'Reel jasa pembuatan website Wasla, 15 detik, musik asli'}/><figcaption>{en ? 'A website with your character.' : 'Website dengan karakter bisnis Anda.'}<span>Wasla · 15s</span></figcaption></figure>
  </section>
}
