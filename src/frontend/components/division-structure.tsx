'use client'
import { useId, useState } from 'react'
import Image from 'next/image'
import type { ContactPerson } from '@/shared/contacts'
import type { Team } from '@/shared/content-types'
import { mediaSource } from '@/shared/media'
import { WhatsAppIcon } from './contact-cards'
import { LinkedInIcon } from './icons'

function DivisionCard({ person, member }: { person: ContactPerson; member?: Team }) {
  const [flipped, setFlipped] = useState(false)
  const biographyID = useId()
  const photo = member?.photo && typeof member.photo === 'object' ? member.photo : null
  const initials = person.name.split(' ').slice(0, 2).map(word => word[0]).join('')
  const linkedinLink = person.linkedin && <a className="division-linkedin" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${person.name}`}><LinkedInIcon/>LinkedIn</a>
  return <article className={`division-flip-card ${flipped ? 'is-flipped' : ''}`}>
    <button type="button" className="division-card-toggle" onClick={() => setFlipped(value => !value)} aria-expanded={flipped} aria-controls={biographyID} aria-label={flipped ? `Kembali ke profil ${person.name}` : `Kenali ${person.name}, ${person.role}`}/>
    <div className="division-flip-inner">
      <div className="division-face division-front" inert={flipped} aria-hidden={flipped}>
        <div className="division-flip-trigger"><span className="division-portrait">{photo?.url ? <Image src={mediaSource(photo.url)} alt={person.name} width={photo.width || 800} height={photo.height || 1000} sizes="(max-width: 420px) 320px, (max-width: 991px) 45vw, 280px"/> : <span className="division-initials" aria-hidden="true">{initials}</span>}</span><span className="division-card-info"><span className="division-card-role">{person.role}</span><strong>{person.name}</strong><span className="division-card-links"><span className="division-flip-hint">Profil & kontak</span>{linkedinLink}</span></span></div>
      </div>
      <div id={biographyID} className="division-face division-back" inert={!flipped} aria-hidden={!flipped}>
        <span className="division-back-role">{person.role}</span><h3>{person.name}</h3><p>{member?.biography || `Profil ${person.name} sedang diperbarui.`}</p>
        <div className="division-actions"><a href={person.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={21}/>Hubungi via WhatsApp</a>{linkedinLink}</div>
      </div>
    </div>
  </article>
}

export function DivisionStructure({ contacts, members = [] }: { contacts: ContactPerson[]; members?: Team[] }) {
  if (!contacts.length) return null
  const sorted = [...contacts].sort((a, b) => Number(/project manager/i.test(b.role)) - Number(/project manager/i.test(a.role)))
  return <section className="division-structure" aria-labelledby="division-title"><div className="contact-heading"><h2 id="division-title">Satu tim.<br/>Beragam keahlian.</h2><p>Kenali orang dan divisi di balik project Anda. Ketuk kartu untuk melihat bio, lalu ketuk lagi untuk kembali.</p></div><div className="division-card-grid">{sorted.map(person => <DivisionCard key={person.id} person={person} member={members.find(m => String(m.id) === person.id)}/>)}</div></section>
}
