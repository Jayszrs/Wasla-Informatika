import type { Team } from '@/lib/content-types'

export type ContactPerson = { id: string; name: string; role: string; href: string; phone: string }

export function teamContacts(team: Team[]): ContactPerson[] {
  return team.flatMap(member => {
    const href = member.socials?.find(s => /^https:\/\/wa\.me\/[1-9]\d{8,14}$/.test(s.url || ''))?.url
    return href ? [{ id: String(member.id), name: member.name, role: member.role, href, phone: `+${href.split('/').pop()}` }] : []
  })
}

export function whatsappMessage(person: ContactPerson, fields: Record<string, FormDataEntryValue>) {
  const message = [
    `Halo ${person.name}, saya ingin berkonsultasi dengan Wasla Informatika.`,
    '', `Nama: ${fields.name || ''}`, `Email: ${fields.email || ''}`,
    fields.company ? `Perusahaan: ${fields.company}` : '', fields.phone ? `Telepon: ${fields.phone}` : '',
    `Layanan: ${fields.service || ''}`, '', String(fields.message || ''),
  ].filter(line => line !== undefined).join('\n')
  return `${person.href}?text=${encodeURIComponent(message)}`
}
