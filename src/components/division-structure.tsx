import type { ContactPerson } from '@/lib/contacts'
import { Arrow } from './icons'

export function DivisionStructure({ contacts }: { contacts: ContactPerson[] }) {
  const manager = contacts.find(person => /project manager/i.test(person.role))
  const engineers = contacts.filter(person => person !== manager)
  const person = (contact: ContactPerson) => <a href={contact.href} target="_blank" rel="noopener noreferrer" className="division-person"><h3>{contact.role}</h3><span>{contact.name}<Arrow diagonal/></span></a>
  if (!contacts.length) return null
  return <section className="division-structure" aria-labelledby="division-title"><div className="contact-heading"><h2 id="division-title">Struktur divisi.<br/>Satu tim, saling terhubung.</h2><p>Koordinasi project dan pengembangan berjalan bersama. Temukan rekan diskusi sesuai kebutuhan Anda.</p></div><div className="division-map">{manager && <div className="division-coordinator">{person(manager)}</div>}<div className="division-engineers">{engineers.map(contact => <div key={contact.id}>{person(contact)}</div>)}</div></div></section>
}
