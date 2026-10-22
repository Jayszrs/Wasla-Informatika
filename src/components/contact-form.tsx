'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Arrow } from './icons'

type Errors = Record<string, string[] | undefined>
export function ContactForm({ services, initialService = '' }: { services: string[]; initialService?: string }) {
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [feedback, setFeedback] = useState<{ state: 'success' | 'error'; message: string } | null>(null)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setPending(true); setErrors({}); setFeedback(null)
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, consent: data.consent === 'on' }) })
      const result = await response.json()
      if (!response.ok) { setErrors(result.fields || {}); setFeedback({ state: 'error', message: result.error || 'Pesan belum terkirim. Silakan coba lagi.' }); if (result.fields) form.querySelector<HTMLInputElement>(`[name="${Object.keys(result.fields)[0]}"]`)?.focus() }
      else { setFeedback({ state: 'success', message: 'Terima kasih. Pesan Anda sudah tersimpan dan dapat ditinjau oleh tim Wasla.' }); form.reset() }
    } catch { setFeedback({ state: 'error', message: 'Koneksi terputus. Pesan belum dapat dipastikan terkirim; periksa jaringan dan coba lagi.' }) }
    finally { setPending(false) }
  }
  const described = (name: string) => errors[name] ? `${name}-error` : undefined
  const error = (name: string) => errors[name] ? <p id={`${name}-error`} className="field-error">{errors[name]?.[0]}</p> : null
  return <form className="contact-form" onSubmit={submit} method="post" action="/api/contact" noValidate aria-label="Formulir konsultasi">
    <div className="form-field"><label htmlFor="name">Nama lengkap</label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Nama Anda" aria-invalid={!!errors.name} aria-describedby={described('name')}/>{error('name')}</div>
    <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="nama@perusahaan.com" aria-invalid={!!errors.email} aria-describedby={described('email')}/>{error('email')}</div>
    <div className="form-field"><label htmlFor="company">Perusahaan <span>(opsional)</span></label><input id="company" name="company" autoComplete="organization" maxLength={150} placeholder="Nama perusahaan" aria-invalid={!!errors.company} aria-describedby={described('company')}/>{error('company')}</div>
    <div className="form-field"><label htmlFor="phone">Nomor telepon <span>(opsional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Nomor yang dapat dihubungi" aria-invalid={!!errors.phone} aria-describedby={described('phone')}/>{error('phone')}</div>
    <div className="form-field full"><label htmlFor="service">Apa yang ingin Anda bangun?</label><select id="service" name="service" required defaultValue={services.includes(initialService) ? initialService : ''} aria-invalid={!!errors.service} aria-describedby={described('service')}><option value="" disabled>Pilih layanan</option>{services.map(s => <option key={s}>{s}</option>)}<option>Belum yakin, mari diskusikan</option></select>{error('service')}</div>
    <div className="form-field full"><label htmlFor="message">Ceritakan kebutuhan Anda</label><textarea id="message" name="message" required minLength={20} maxLength={5000} placeholder="Tujuan, tantangan, dan rencana yang ingin Anda diskusikan…" aria-invalid={!!errors.message} aria-describedby={described('message')}/>{error('message')}</div>
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Biarkan kolom ini kosong</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="form-consent"><input id="consent" name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={described('consent')}/><label htmlFor="consent">Saya menyetujui penggunaan informasi ini untuk menanggapi konsultasi, sesuai <Link href="/privasi">informasi privasi</Link>.{error('consent')}</label></div>
    <div className="form-actions"><p>Data Anda digunakan untuk menanggapi kebutuhan yang Anda sampaikan.</p><button className="button" type="submit" disabled={pending}>{pending ? 'Menyimpan pesan…' : 'Kirim pesan'}{!pending && <Arrow diagonal/>}</button></div>
    {feedback && <div role={feedback.state === 'error' ? 'alert' : 'status'} className="form-feedback" data-state={feedback.state}>{feedback.message}</div>}
    <noscript><p className="form-noscript">Aktifkan JavaScript untuk menggunakan formulir. Jika alamat email tersedia di halaman ini, Anda juga dapat menghubungi Wasla melalui email.</p></noscript>
  </form>
}
