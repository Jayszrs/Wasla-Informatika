import type { Team } from '@/shared/content-types'

export type ContactPerson = { id: string; name: string; role: string; href: string; phone: string; linkedin?: string }

export function linkedinProfile(value?: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.port || url.username || url.password || !['linkedin.com', 'www.linkedin.com', 'id.linkedin.com'].includes(url.hostname) || !/^\/in\/[^/]+\/?$/.test(url.pathname)) return undefined
    return `https://www.linkedin.com${url.pathname.replace(/\/$/, '')}/`
  } catch { return undefined }
}

export function teamContacts(team: Team[]): ContactPerson[] {
  return team.flatMap(member => {
    const href = member.socials?.find(s => /^https:\/\/wa\.me\/[1-9]\d{8,14}$/.test(s.url || ''))?.url
    const linkedin = member.socials?.map(s => linkedinProfile(s.url)).find(Boolean)
    return href ? [{ id: String(member.id), name: member.name, role: member.role, href, phone: `+${href.split('/').pop()}`, linkedin }] : []
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
