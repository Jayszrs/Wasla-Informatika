'use client'
import { useId, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { teamProfiles, type ContactPerson, type TeamPerson } from '@/shared/contacts'
import type { Team } from '@/shared/content-types'
import { mediaSource } from '@/shared/media'
import { WhatsAppIcon } from './contact-cards'
import { LinkedInIcon } from './icons'
import { Translation } from './locale-provider'
import styles from './division-structure.module.css'

const retouchedPortraits: Record<string, string> = {
  'bayu-saputra-linkedin.webp': '/images/team/bayu-saputra-hd.png',
  'adelya-amanda-linkedin.webp': '/images/team/adelya-amanda-hd.png',
  'difa-alfaruq-linkedin.webp': '/images/team/difa-alfaruq-hd.png',
}

function DivisionCard({ person, member }: { person: TeamPerson; member?: Team }) {
  const [flipped, setFlipped] = useState(false)
  const biographyID = useId()
  const originalPhoto = member?.photo && typeof member.photo === 'object' ? member.photo : null
  // Only replace the three supplied originals; later CMS uploads keep their own image.
  const retouched = originalPhoto?.filename && retouchedPortraits[originalPhoto.filename]
  const photo = retouched ? { ...originalPhoto, url: retouched, width: 1254, height: 1254 } : originalPhoto
  const initials = person.name.split(' ').slice(0, 2).map(word => word[0]).join('')
  const linkedinLink = person.linkedin && <a className="division-linkedin" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${person.name}`}><LinkedInIcon/>LinkedIn</a>
  return <Translation><article className={`division-flip-card ${flipped ? 'is-flipped' : ''}`}>
    <button type="button" className="division-card-toggle" onClick={() => setFlipped(value => !value)} aria-expanded={flipped} aria-controls={biographyID} aria-label={flipped ? `Kembali ke profil ${person.name}` : `Kenali ${person.name}, ${person.role}`}/>
    <div className="division-flip-inner">
      <div className="division-face division-front" inert={flipped} aria-hidden={flipped}>
        <div className="division-flip-trigger"><span className="division-portrait">{photo?.url ? <Image src={mediaSource(photo.url)} alt={person.name} width={photo.width || 800} height={photo.height || 1000} sizes="(max-width: 420px) 320px, (max-width: 991px) 45vw, 280px"/> : <span className="division-initials" aria-hidden="true">{initials}</span>}</span><span className="division-card-info"><span className="division-card-role">{person.role}</span><strong>{person.name}</strong><span className="division-card-links"><span className="division-flip-hint">Profil & kontak</span>{linkedinLink}</span></span></div>
      </div>
      <div id={biographyID} className="division-face division-back" inert={!flipped} aria-hidden={!flipped}>
        <span className="division-back-role">{person.role}</span><h3>{person.name}</h3><p>{member?.biography || `Profil ${person.name} sedang diperbarui.`}</p>
        <div className="division-actions">{person.href && <a href={person.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={21}/>Hubungi via WhatsApp</a>}{linkedinLink}</div>
      </div>
    </div>
  </article></Translation>
}

type DivisionNode = { person: TeamPerson; children?: DivisionNode[] }

function DivisionBranch({ node, members }: { node: DivisionNode; members: Team[] }) {
  const children = node.children || []
  return <li className={styles.node}>
    <div className={styles.card}><DivisionCard person={node.person} member={members.find(member => String(member.id) === node.person.id)}/></div>
    {!!children.length && <div className={`${styles.branch} ${children.length > 1 ? styles.teamBranch : ''}`}>
      <ul className={styles.children} style={{ '--branch-count': children.length } as CSSProperties}>{children.map(child => <DivisionBranch key={child.person.id} node={child} members={members}/>)}</ul>
    </div>}
  </li>
}

export function DivisionStructure({ contacts, members = [] }: { contacts: ContactPerson[]; members?: Team[] }) {
  const people = members.length ? teamProfiles(members) : contacts
  if (!people.length) return null
  const leader = people.find(person => person.name.trim().toLowerCase() === 'ahmad suroso')
  const deputy = people.find(person => person.name.trim().toLowerCase() === 'bayu saputra')
  const staff = people.filter(person => person !== leader && person !== deputy).map(person => ({ person }))
  const reporting = deputy ? [{ person: deputy, children: staff }] : staff
  const roots = leader ? [{ person: leader, children: reporting }] : reporting
  return <Translation><section className="division-structure" aria-labelledby="division-title"><div className="contact-heading"><h2 id="division-title">Satu tim.<br/>Beragam keahlian.</h2><p>Kenali orang dan divisi di balik project Anda. Ketuk kartu untuk melihat bio, lalu ketuk lagi untuk kembali.</p></div><div className={styles.chart}><ul className={styles.roots} aria-label="Struktur organisasi Wasla">{roots.map(node => <DivisionBranch key={node.person.id} node={node} members={members}/>)}</ul></div><p className={styles.scrollHint}>Geser baris tim untuk melihat seluruh anggota.</p></section></Translation>
}
