import Image from 'next/image'
import { technologies } from '@/frontend/lib/technologies'
import { Translation } from './locale-provider'
export function TechnologyLogos() {
  return <Translation><div className="technology-logos" aria-label="Teknologi pengembangan">{technologies.map(([slug, name, href]) => <figure key={slug}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Kenali ${name}`}><Image src={`/images/technology/${slug}.svg`} width={52} height={52} alt=""/><span>{name}</span></a></figure>)}</div></Translation>
}
