'use client'
import { useRef, useState } from 'react'
import type { ContactPerson } from '@/lib/contacts'
import type { Team } from '@/lib/content-types'
import { mediaSource } from '@/lib/media'
import { WhatsAppIcon } from './contact-cards'
function DivisionCard({ person, member }: { person: ContactPerson; member?: Team }) {
  const [flipped, setFlipped] = useState(false)
  const card = useRef<HTMLElement>(null)
  function flip(next: boolean) { setFlipped(next); requestAnimationFrame(() => card.current?.querySelector<HTMLElement>(next ? '.division-back a' : '.division-flip-trigger')?.focus({ preventScroll: true })) }
  const photo = member?.photo && typeof member.photo === 'object' ? member.photo : null
  const initials = person.name.split(' ').slice(0, 2).map(word => word[0]).join('')
  return <article ref={card} className={`division-flip-card ${flipped ? 'is-flipped' : ''}`}><div className="division-flip-inner"><div className="division-face division-front" inert={flipped} aria-hidden={flipped}><button className="division-flip-trigger" onClick={() => flip(true)} aria-expanded={flipped} aria-label={`Kenali ${person.name}, ${person.role}`}><span className="division-portrait">{photo?.url ? <img src={mediaSource(photo.url)} alt={person.name} loading="lazy"/> : <span className="division-initials" aria-hidden="true">{initials}</span>}</span><span className="division-card-info"><span className="division-card-role">{person.role}</span><strong>{person.name}</strong><span className="division-flip-hint">Kenali divisi</span></span></button></div><div className="division-face division-back" inert={!flipped} aria-hidden={!flipped}><span className="division-back-role">{person.role}</span><h3>{person.name}</h3><p>{member?.biography || `Diskusikan kebutuhan ${person.role.toLowerCase()} bersama ${person.name.split(' ')[0]}.`}</p><a href={person.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={21}/>Hubungi via WhatsApp</a><button onClick={() => flip(false)} aria-expanded={flipped} aria-label={`Kembali ke kartu ${person.name}`}>Kembali ke profil</button></div></div></article>
}
export function DivisionStructure({ contacts, members = [] }: { contacts: ContactPerson[]; members?: Team[] }) {
  if (!contacts.length) return null
  const sorted = [...contacts].sort((a, b) => Number(/project manager/i.test(b.role)) - Number(/project manager/i.test(a.role)))
  return <section className="division-structure" aria-labelledby="division-title"><div className="contact-heading"><h2 id="division-title">Satu tim.<br/>Beragam keahlian.</h2><p>Kenali orang dan divisi di balik project Anda. Pilih kartu untuk melihat profil dan memulai percakapan.</p></div><div className="division-card-grid">{sorted.map(person => <DivisionCard key={person.id} person={person} member={members.find(m => String(m.id) === person.id)}/>)}</div></section>
}
