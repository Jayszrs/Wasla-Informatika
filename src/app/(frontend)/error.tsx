'use client'
import { Translation } from '@/frontend/components/locale-provider'
export default function ErrorPage({ reset }: { reset: () => void }) { return <Translation><section className="wrap empty-page"><h1>Halaman belum dapat dimuat.</h1><p>Koneksi ke konten mungkin sedang terganggu. Silakan coba lagi.</p><button className="button" onClick={reset}>Coba lagi</button></section></Translation> }
