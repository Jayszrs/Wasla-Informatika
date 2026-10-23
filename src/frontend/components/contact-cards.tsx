import type { ContactPerson } from '@/shared/contacts'

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M27 15.3a11 11 0 0 1-11 11c-2 0-3.8-.5-5.4-1.4L5 27l1.9-5.8A11 11 0 1 1 27 15.3Z"/><path d="M11.3 10.3c.5-.3 1.2-.3 1.4.3l1 2.2c.2.5-.3 1-.8 1.4.9 1.8 2.2 3.1 4.1 4 .4-.5.9-1.2 1.4-1l2.1 1c.6.3.6.9.3 1.5-.7 1.4-2.3 1.8-3.6 1.3-4.7-1.7-7.5-4.4-8.2-7.2-.4-1.4.8-3 2.3-3.5Z" strokeLinejoin="round"/></svg>
}

export function ContactCards({ contacts }: { contacts: ContactPerson[] }) {
  if (!contacts.length) return null
  return <div className="contact-people" aria-label="Kontak WhatsApp tim Wasla">{contacts.map(person => <a className="contact-person" href={person.href} target="_blank" rel="noopener noreferrer" key={person.id} aria-label={`WhatsApp ${person.name}, ${person.role}`}>
    <div><h3>{person.name}</h3><p>{person.role}</p><span className="person-phone">{person.phone}</span></div>
    <span className="person-action"><WhatsAppIcon/><span>WhatsApp</span></span>
  </a>)}</div>
}
