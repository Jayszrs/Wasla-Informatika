'use client'
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="wrap empty-page"><h1>Halaman belum dapat dimuat.</h1><p>Koneksi ke konten mungkin sedang terganggu. Silakan coba lagi.</p><button className="button" onClick={reset}>Coba lagi</button></section> }
