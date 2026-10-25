'use client'

import Link from 'next/link'
import { useId, useRef, useState } from 'react'
import { formatRupiah, packageConsultationURL, type WebsitePackage } from '@/shared/website-packages'
import styles from './package-deck.module.css'

export function PackageDeck({ title, plans }: { title: string; plans: WebsitePackage[] }) {
  const id = useId()
  const [selected, setSelected] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const plan = plans[selected] ?? plans[0]
  function choose(index: number) { setSelected(index); setFlipped(false) }
  if (!plan) return null
  return <section className={styles.deck} aria-labelledby={`${id}-title`}>
    <h3 id={`${id}-title`} className={styles.title}>{title}</h3>
    <div className={styles.choices} role="tablist" aria-label={`Pilihan paket ${title}`} onKeyDown={event => {
      let index = selected
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') index = (selected + 1) % plans.length
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') index = (selected - 1 + plans.length) % plans.length
      else if (event.key === 'Home') index = 0
      else if (event.key === 'End') index = plans.length - 1
      else return
      event.preventDefault(); choose(index); tabs.current[index]?.focus()
    }}>{plans.map((item, index) => <button key={item.slug} ref={element => { tabs.current[index] = element }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => choose(index)}><span>{item.name}</span><strong>{item.startingPrice ? 'Mulai ' : ''}{formatRupiah(item.price)}</strong></button>)}</div>
    <div className={styles.stack} data-package-deck="" data-flipped={flipped}>
      <article className={styles.panel} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`}>
        <div className={styles.turn}>
          <div className={styles.front} inert={flipped} aria-hidden={flipped}>
            <h4>{plan.name}</h4>
            <div className={styles.amount}>{plan.startingPrice && <span>Mulai dari</span>}<strong>{formatRupiah(plan.price)}</strong><span>{plan.priceUnit || plan.cms}</span></div>
            <p>Klik untuk melihat cakupan paket</p>
          </div>
          <div className={styles.back} inert={!flipped} aria-hidden={!flipped}>
            <h4>{plan.name}</h4><div><h5>Cakupan paket</h5><p>{plan.description}</p><p className={styles.note}>{plan.cms}</p></div><span>Klik untuk kembali ke harga</span>
          </div>
        </div>
        <button type="button" className={styles.flip} aria-label={`${flipped ? 'Lihat harga' : 'Lihat cakupan'} ${plan.name}`} aria-pressed={flipped} onClick={() => setFlipped(value => !value)}/>
      </article>
    </div>
    <Link className={styles.consult} href={packageConsultationURL(plan)} aria-label={`Konsultasi paket ${plan.name}`}>Bahas paket {plan.name}</Link>
  </section>
}
