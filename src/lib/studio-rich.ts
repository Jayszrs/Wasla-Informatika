type RichNode = { type: string; text?: string; format?: number | string; tag?: string; listType?: string; fields?: { url?: string }; url?: string; children?: RichNode[]; [key: string]: unknown }
export function richToText(value: unknown): string {
  function walk(node: RichNode): string {
    const content = node.text ?? (node.children || []).map(walk).join('')
    if (node.type === 'text') return Number(node.format) & 1 ? `**${content}**` : Number(node.format) & 2 ? `*${content}*` : content
    if (node.type === 'heading') return `${'#'.repeat(Number(node.tag?.slice(1)) || 2)} ${content}\n\n`
    if (node.type === 'paragraph') return content + '\n\n'
    if (node.type === 'listitem') return `- ${content.trim()}\n`
    if (node.type === 'list') return content + '\n'
    if (node.type === 'linebreak') return '\n'
    if (node.type === 'link') return `[${content}](${node.fields?.url || node.url || ''})`
    return content
  }
  const root = (value as { root?: RichNode })?.root
  return root ? walk(root).trim() : ''
}
export function textToRich(text: string) {
  function inline(line: string): RichNode[] {
    return line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\s)]+\))/g).filter(Boolean).map(part => {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) return { type: 'link', version: 1, fields: { url: link[2] }, children: [{ type: 'text', text: link[1], format: 0, version: 1 }] }
      const bold = part.startsWith('**') && part.endsWith('**'), italic = !bold && part.startsWith('*') && part.endsWith('*')
      return { type: 'text', text: bold ? part.slice(2, -2) : italic ? part.slice(1, -1) : part, format: bold ? 1 : italic ? 2 : 0, version: 1 }
    })
  }
  const children: RichNode[] = []
  for (const block of text.trim().split(/\n\s*\n/)) {
    if (!block) continue
    const heading = block.match(/^(#{1,4}) (.*)$/s)
    if (heading) children.push({ type: 'heading', tag: `h${Math.max(2, heading[1].length)}`, children: inline(heading[2]), version: 1 })
    else if (block.split('\n').every(line => line.startsWith('- '))) children.push({ type: 'list', listType: 'bullet', tag: 'ul', children: block.split('\n').map(line => ({ type: 'listitem', children: inline(line.slice(2)), version: 1 })), version: 1 })
    else children.push({ type: 'paragraph', children: inline(block), version: 1 })
  }
  return { root: { type: 'root', children, direction: null, format: '', indent: 0, version: 1 } }
}
