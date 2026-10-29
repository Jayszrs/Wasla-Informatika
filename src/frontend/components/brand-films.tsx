'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const modal = dialog.current
    const film = video.current
    if (!modal || !film) return
    const phone = window.matchMedia(phoneQuery)
    let previous: HTMLElement | null = null
    let originalOverflow = ''
    let attempt = 0
    async function play() {
      const current = ++attempt
      try { await film!.play() }
      catch (error) {
        if (current !== attempt || !modal!.open) return
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          film!.muted = true
          try { await film!.play() }
          catch { if (current === attempt && modal!.open) modal!.close() }
        } else modal!.close()
      }
    }
    function open() {
      if (modal!.open) return
      previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      selectFilm(film!, phone.matches)
      film!.muted = false
      modal!.showModal()
      modal!.focus({ preventScroll: true })
      void play()
    }
    function closed() {
      if (modal!.open) return
      attempt++
      film!.pause()
      document.body.style.overflow = originalOverflow
      if (previous?.isConnected) previous.focus({ preventScroll: true })
      window.dispatchEvent(new Event('wasla:introduction-closed'))
    }
    function resize() {
      if (!modal!.open) return
      attempt++
      film!.pause()
      selectFilm(film!, phone.matches)
      void play()
    }
    const visibility = () => {
      if (document.hidden) { attempt++; film!.pause() }
      else if (modal!.open) void play()
    }
    modal.addEventListener('close', closed)
    phone.addEventListener('change', resize)
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('wasla:show-introduction', open)
    open()
    return () => {
      attempt++
      window.removeEventListener('wasla:show-introduction', open)
      phone.removeEventListener('change', resize)
      document.removeEventListener('visibilitychange', visibility)
      modal.removeEventListener('close', closed)
      film.pause()
      if (modal.open) modal.close()
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return <dialog ref={dialog} className={styles.intro} aria-label={en ? 'A glimpse of Wasla.' : 'Sekilas tentang Wasla.'} onClick={() => dialog.current?.close()}>
    <button className={styles.introSurface} type="button" autoFocus aria-label={en ? 'Skip intro' : 'Lewati intro'} onClick={() => dialog.current?.close()}>
      <video ref={video} playsInline preload="auto" disablePictureInPicture aria-label={en ? 'Wasla introduction film; click anywhere to close' : 'Film perkenalan Wasla; ketuk di mana saja untuk menutup'} onEnded={() => dialog.current?.close()} onError={() => dialog.current?.close()}/>
    </button>
  </dialog>
}

export function BrandFilmShowcase() {
  const en = useLocale() === 'en'
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const film = video.current
    if (!film) return
    const phone = window.matchMedia(phoneQuery)
    let visible = false
    const update = () => {
      if (!visible || document.hidden || document.querySelector('dialog[open]')) film.pause()
      else void film.play().catch(() => {})
    }
    const select = () => { film.pause(); selectFilm(film, phone.matches); update() }
    select()
    phone.addEventListener('change', select)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: .1 })
    observer.observe(film)
    const showIntroduction = () => film.pause()
    document.addEventListener('visibilitychange', update)
    window.addEventListener('wasla:show-introduction', showIntroduction)
    window.addEventListener('wasla:introduction-closed', update)
    return () => { film.pause(); observer.disconnect(); phone.removeEventListener('change', select); document.removeEventListener('visibilitychange', update); window.removeEventListener('wasla:show-introduction', showIntroduction); window.removeEventListener('wasla:introduction-closed', update) }
  }, [])
  return <section className={`${styles.showcase} wrap`} aria-labelledby="brand-film-title">
    <div className={styles.filmCopy}><h2 id="brand-film-title">{en ? <>Your idea.<br/>Your next website.</> : <>Dari ide,<br/>jadi website.</>}</h2><p>{en ? 'Show your business with a website that feels like you. Let’s discuss its design, features, and how it should work for your customers.' : 'Tampilkan bisnis Anda lewat website yang punya karakter. Kita bahas desain, fitur, dan cara website membantu pelanggan Anda.'}</p><div className={styles.filmActions}><Link className="button" href={localizedPath('/kontak', en ? 'en' : 'id')}>{en ? 'Discuss your website' : 'Diskusikan website Anda'}</Link><button type="button" className={styles.replay} onClick={() => window.dispatchEvent(new Event('wasla:show-introduction'))}>{en ? 'Watch the Wasla film' : 'Tonton film Wasla'}<Arrow diagonal/></button></div></div>
    <figure className={styles.reel}><video ref={video} muted loop playsInline preload="none" disablePictureInPicture aria-label={en ? 'Wasla website film, Indonesian text, original music' : 'Film website Wasla, teks Indonesia, musik asli'}/><figcaption>{en ? 'A website with your character.' : 'Website dengan karakter bisnis Anda.'}<span>Wasla Informatika</span></figcaption></figure>
  </section>
}
