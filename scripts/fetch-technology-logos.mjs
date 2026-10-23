import { mkdir, writeFile } from 'node:fs/promises'
const slugs = ['php', 'nextdotjs', 'react', 'typescript', 'postgresql', 'payloadcms', 'javascript', 'tailwindcss', 'laravel', 'nodedotjs', 'mysql', 'mongodb', 'redis', 'docker', 'git', 'github', 'figma', 'wordpress', 'python', 'go', 'vuedotjs', 'nuxt', 'nginx', 'bootstrap']
const metadataURL = 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/data/simple-icons.json'
const metadataResponse = await fetch(metadataURL)
if (!metadataResponse.ok) throw new Error('Unable to retrieve official icon colors')
const metadata = await metadataResponse.json()
const icons = Array.isArray(metadata) ? metadata : metadata.icons
const normalize = title => title.toLowerCase().replaceAll('+', 'plus').replaceAll('.', 'dot').replaceAll('&', 'and').replaceAll(' ', '').replaceAll('-', '')
await mkdir('public/images/technology', { recursive: true })
for (const slug of slugs) {
  const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`)
  const svg = await response.text()
  if (!svg.startsWith('<svg') || svg.includes('<script')) throw new Error(`Invalid icon ${slug}`)
  const brand = icons.find(icon => (icon.slug || normalize(icon.title)) === slug)
  if (!brand?.hex) throw new Error(`No official brand color for ${slug}`)
  await writeFile(`public/images/technology/${slug}.svg`, svg.replace('<svg ', `<svg fill="#${brand.hex}" `))
  await writeFile(`public/images/technology/${slug}.svg.source.json`, JSON.stringify({ source: url, metadata: metadataURL, date: '2026-10-23', license: 'Simple Icons CC0-1.0; trademarks remain with their owners.', transformations: `Geometry retained, official brand fill #${brand.hex}; grayscale applied by CSS until hover or keyboard focus.` }, null, 2))
}
const license = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/LICENSE.md')
if (!license.ok) throw new Error('Unable to retrieve Simple Icons license')
await writeFile('public/images/technology/LICENSE.md', await license.text())
console.log('24 technology logos with official colors and license saved locally.')
