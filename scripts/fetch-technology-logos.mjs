import { mkdir, writeFile } from 'node:fs/promises'
const slugs = ['php', 'nextdotjs', 'react', 'typescript', 'postgresql', 'payloadcms', 'javascript', 'tailwindcss']
await mkdir('public/images/technology', { recursive: true })
for (const slug of slugs) {
  const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`)
  const svg = await response.text()
  if (!svg.startsWith('<svg') || svg.includes('<script')) throw new Error(`Invalid icon ${slug}`)
  await writeFile(`public/images/technology/${slug}.svg`, svg)
  await writeFile(`public/images/technology/${slug}.svg.source.json`, JSON.stringify({ source: url, date: '2026-10-23', license: 'Simple Icons CC0-1.0; trademarks remain with their owners.', transformations: 'None; monochrome SVG geometry retained.' }, null, 2))
}
const license = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/LICENSE.md')
if (!license.ok) throw new Error('Unable to retrieve Simple Icons license')
await writeFile('public/images/technology/LICENSE.md', await license.text())
console.log('Eight technology logos and their license saved locally.')
