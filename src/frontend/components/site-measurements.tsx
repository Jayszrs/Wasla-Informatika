'use client'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function SiteMeasurements() {
  return <><Analytics beforeSend={event => { const url = new URL(event.url); url.search = ''; url.hash = ''; return { ...event, url: url.toString() } }}/><SpeedInsights sampleRate={.1}/></>
}
