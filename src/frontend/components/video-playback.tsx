'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { VideoLibraryItem } from '@/shared/video-library'
import { parseVideoSource } from '@/shared/video-source'
import styles from './video-portfolio.module.css'

export type PlaybackStatus = 'loading' | 'ready' | 'error'
type Player = { destroy: () => void; playVideo: () => void }
type YouTubeAPI = { Player: new (frame: HTMLIFrameElement, options: { events: { onReady: (event: { target: Player }) => void; onError: () => void } }) => Player }
type YouTubeWindow = Window & { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void }
let apiPromise: Promise<YouTubeAPI> | null = null

function youtubeAPI() {
  const browser = window as YouTubeWindow
  if (browser.YT?.Player) return Promise.resolve(browser.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve, reject) => {
    const previous = browser.onYouTubeIframeAPIReady
    const timeout = window.setTimeout(() => { apiPromise = null; reject(new Error('Player API timeout')) }, 12_000)
    browser.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout)
      previous?.()
      if (browser.YT) resolve(browser.YT)
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => { window.clearTimeout(timeout); apiPromise = null; script.remove(); reject(new Error('Player API unavailable')) }
    document.head.append(script)
  })
  return apiPromise
}

export function VideoPlayback({ item, onStatus }: { item: VideoLibraryItem; onStatus: (status: PlaybackStatus) => void }) {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (item.nativeURL || item.mediaType === 'image') return
    const container = host.current
    const source = parseVideoSource(item.sourceURL)
    if (!container || !source) { onStatus('error'); return }
    let active = true
    let failed = false
    let player: Player | undefined
    const frame = document.createElement('iframe')
    const address = new URL(source.embedURL)
    if (source.provider === 'youtube') { address.searchParams.set('enablejsapi', '1'); address.searchParams.set('origin', window.location.origin) }
    frame.src = address.href
    frame.title = item.title
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
    frame.referrerPolicy = 'strict-origin-when-cross-origin'
    frame.allowFullscreen = true
    frame.onload = () => { if (active && !failed) onStatus('ready') }
    frame.onerror = () => { failed = true; if (active) onStatus('error') }
    container.replaceChildren(frame)
    if (source.provider === 'youtube') void youtubeAPI().then(api => {
      if (!active) return
      player = new api.Player(frame, { events: {
        onReady: event => { if (active && !failed) { onStatus('ready'); event.target.playVideo() } },
        onError: () => { failed = true; if (active) onStatus('error') },
      } })
    }).catch(() => { /* The native iframe remains usable when the optional controller is blocked. */ })
    return () => { active = false; player?.destroy(); container.replaceChildren() }
  }, [item, onStatus])

  if (item.nativeURL) return <video className={styles.nativeVideo} src={item.nativeURL} poster={item.posterURL || undefined} controls autoPlay playsInline preload="metadata" onLoadedMetadata={() => onStatus('ready')} onPlaying={() => onStatus('ready')} onError={() => onStatus('error')}/>
  if (item.mediaType === 'image') return <Image src={item.posterURL} alt={item.title} fill sizes="100vw" style={{ objectFit: 'contain' }} onLoad={() => onStatus('ready')} onError={() => onStatus('error')}/>
  return <div className={styles.embedFrame} ref={host}/>
}
