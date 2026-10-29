'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from './locale-provider'
import { localizedPath } from '@/shared/i18n'
import styles from './brand-films.module.css'
import { Arrow } from './icons'

const phoneQuery = '(max-width: 767px)'

function selectFilm(film: HTMLVideoElement, phone: boolean) {
  const name = phone ? 'wasla-sales-reel' : 'wasla-introduction'
  film.src = `/videos/${name}.mp4`
  film.poster = `/videos/${name}.jpg`
  film.dataset.format = phone ? 'portrait' : 'landscape'
}

export function IntroductionFilm() {
  const en = useLocale() === 'en'
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(true)
  const [progress, setProgress] = useState(0)
  const close = () => dialog.current?.close()

  useEffect(() => {
    const modal = dialog.current
    const film = video.current
    if (!modal || !film) return
    const phone = window.matchMedia(phoneQuery)
    let previous: HTMLElement | null = null
    let originalOverflow = ''
    let playbackAttempt = 0
    function play() {
      const attempt = ++playbackAttempt
      setWaiting(false)
      void film!.play().catch(() => {
        if (attempt !== playbackAttempt || !modal!.open) return
        if (film!.error) setFailed(true)
        else setWaiting(true)
      })
    }
    function open() {
      if (modal!.open) return
      previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      selectFilm(film!, phone.matches)
      film!.muted = false
      film!.volume = 1
      setMuted(false)
      setFailed(false)
      setProgress(0)
      modal!.showModal()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setWaiting(true)
      else play()
    }
    function closed() {
      if (modal!.open) return
      playbackAttempt++
      film!.pause()
      document.body.style.overflow = originalOverflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
    function resize() {
      if (!modal!.open) return
      playbackAttempt++
      film!.pause()
      selectFilm(film!, phone.matches)
      setFailed(false)
      setProgress(0)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setWaiting(true)
      else play()
    }
    const hide = () => { if (document.hidden) film!.pause() }
    modal.addEventListener('close', closed)
    phone.addEventListener('change', resize)
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('wasla:show-introduction', open)
    open()
    return () => {
      playbackAttempt++
      window.removeEventListener('wasla:show-introduction', open)
      phone.removeEventListener('change', resize)
      document.removeEventListener('visibilitychange', hide)
      modal.removeEventListener('close', closed)
      film.pause()
      if (modal.open) modal.close()
      document.body.style.overflow = originalOverflow
    }
  }, [])

  function resume() {
    const film = video.current
    if (!film) return
    setWaiting(false)
    void film.play().catch(() => { if (film.error) setFailed(true); else setWaiting(true) })
  }

  return <dialog ref={dialog} className={styles.intro} aria-labelledby="introduction-title" aria-describedby="introduction-hint" onClick={close}>
    <div className={styles.introShell}>
      <header className={styles.introHeader}>
        <span className={styles.wordmark}>wasla<span>informatika</span></span>
        <h2 id="introduction-title">{en ? 'A glimpse of Wasla.' : 'Sekilas tentang Wasla.'}</h2>
        <button type="button" className={styles.close} autoFocus onClick={close}>{en ? 'Skip intro' : 'Lewati intro'}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></button>
      </header>
      <div className={styles.introScreen}>
        <video ref={video} playsInline preload="none" disablePictureInPicture aria-label={en ? 'Wasla introduction film, Indonesian text, music without narration' : 'Video perkenalan Wasla, musik tanpa narasi'} onVolumeChange={event => setMuted(event.currentTarget.muted)} onEnded={close} onError={() => setFailed(true)} onPlay={() => { setWaiting(false); setPaused(false) }} onPause={() => setPaused(true)} onTimeUpdate={event => { const film = event.currentTarget; setProgress(Number.isFinite(film.duration) && film.duration > 0 ? film.currentTime / film.duration : 0) }}/>
        {waiting && !failed && <button className={styles.play} type="button" onClick={event => { event.stopPropagation(); resume() }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 4 12 8-12 8z"/></svg>{en ? 'Play introduction' : 'Putar perkenalan'}</button>}
        {failed && <p className={styles.videoError} role="status">{en ? 'The video could not load. You can continue to the website.' : 'Video belum bisa dimuat. Anda tetap bisa melanjutkan ke website.'}</p>}
      </div>
      <div className={styles.playback} onClick={event => event.stopPropagation()}>
        <button type="button" disabled={failed} onClick={() => { if (video.current?.paused) resume(); else video.current?.pause() }} aria-label={paused ? (en ? 'Play film' : 'Putar video') : (en ? 'Pause film' : 'Jeda video')}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paused ? <path d="m8 4 12 8-12 8z"/> : <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>}</svg></button>
        <progress value={progress} max="1" aria-label={en ? 'Film progress' : 'Progres video'}/>
        <button type="button" aria-pressed={!muted} onClick={() => { if (video.current) video.current.muted = !video.current.muted }}>{muted ? (en ? 'Turn sound on' : 'Nyalakan suara') : (en ? 'Mute sound' : 'Matikan suara')}</button>
      </div>
      <footer className={styles.introFooter}><span id="introduction-hint">{en ? 'Tap anywhere to explore the website.' : 'Ketuk di mana saja untuk masuk ke website.'}</span><button type="button" onClick={close}>{en ? 'Explore website' : 'Jelajahi website'}<Arrow diagonal/></button></footer>
    </div>
  </dialog>
}

export function BrandFilmShowcase() {
  const en = useLocale() === 'en'
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const film = video.current
    if (!film) return
    const phone = window.matchMedia(phoneQuery)
    const select = () => { film.pause(); selectFilm(film, phone.matches) }
    select()
    phone.addEventListener('change', select)
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) film.pause() }, { threshold: .1 })
    observer.observe(film)
    const hide = () => { if (document.hidden) film.pause() }
    const showIntroduction = () => film.pause()
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('wasla:show-introduction', showIntroduction)
    return () => { film.pause(); observer.disconnect(); phone.removeEventListener('change', select); document.removeEventListener('visibilitychange', hide); window.removeEventListener('wasla:show-introduction', showIntroduction) }
  }, [])
  return <section className={`${styles.showcase} wrap`} aria-labelledby="brand-film-title">
    <div className={styles.filmCopy}><h2 id="brand-film-title">{en ? <>Your idea.<br/>Your next website.</> : <>Dari ide,<br/>jadi website.</>}</h2><p>{en ? 'Show your business with a website that feels like you. Let’s discuss its design, features, and how it should work for your customers.' : 'Tampilkan bisnis Anda lewat website yang punya karakter. Kita bahas desain, fitur, dan cara website membantu pelanggan Anda.'}</p><div className={styles.filmActions}><Link className="button" href={localizedPath('/kontak', en ? 'en' : 'id')}>{en ? 'Discuss your website' : 'Diskusikan website Anda'}</Link><button type="button" className={styles.replay} onClick={() => window.dispatchEvent(new Event('wasla:show-introduction'))}>{en ? 'Watch the Wasla film' : 'Tonton film Wasla'}<Arrow diagonal/></button></div></div>
    <figure className={styles.reel}><video ref={video} controls playsInline preload="none" aria-label={en ? 'Wasla website film, Indonesian text, original music' : 'Film website Wasla, teks Indonesia, musik asli'}/><figcaption>{en ? 'A website with your character.' : 'Website dengan karakter bisnis Anda.'}<span>Wasla Informatika</span></figcaption></figure>
  </section>
}
