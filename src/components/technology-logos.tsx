import Image from 'next/image'

const technologies = [
  ['php', 'PHP'], ['nextdotjs', 'Next.js'], ['react', 'React'], ['typescript', 'TypeScript'],
  ['postgresql', 'PostgreSQL'], ['payloadcms', 'Payload CMS'], ['javascript', 'JavaScript'], ['tailwindcss', 'Tailwind CSS'],
]
export function TechnologyLogos() {
  return <div className="technology-logos" aria-label="Teknologi pengembangan">{technologies.map(([slug, name]) => <figure key={slug}><Image src={`/images/technology/${slug}.svg`} width={52} height={52} alt=""/><figcaption>{name}</figcaption></figure>)}</div>
}
