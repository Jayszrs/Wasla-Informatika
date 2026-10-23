import { Fragment, type ReactNode } from 'react'
import { validPublicLink } from '@/lib/validation'
type Node = { type?: string; text?: string; format?: number | string; tag?: string; url?: string; fields?: { url?: string }; children?: Node[]; listType?: string }
function render(node: Node, index: number): ReactNode {
  const children = node.children?.map(render)
  if (node.type === 'text') {
    let text: ReactNode = node.text || ''
    const format = Number(node.format) || 0
    if (format & 1) text = <strong>{text}</strong>
    if (format & 2) text = <em>{text}</em>
    if (format & 16) text = <code>{text}</code>
    if (format & 4) text = <s>{text}</s>
    return <Fragment key={index}>{text}</Fragment>
  }
  if (node.type === 'heading') { const Tag = ['h2', 'h3', 'h4'].includes(node.tag || '') ? node.tag as 'h2' | 'h3' | 'h4' : 'h2'; return <Tag key={index}>{children}</Tag> }
  if (node.type === 'list') return node.listType === 'number' ? <ol key={index}>{children}</ol> : <ul key={index}>{children}</ul>
  if (node.type === 'listitem') return <li key={index}>{children}</li>
  if (node.type === 'quote') return <blockquote key={index}>{children}</blockquote>
  if (node.type === 'linebreak') return <br key={index}/>
  if (node.type === 'link' || node.type === 'autolink') { const href = node.fields?.url || node.url || ''; return validPublicLink(href) ? <a key={index} href={href} rel="noopener noreferrer">{children}</a> : <Fragment key={index}>{children}</Fragment> }
  if (node.type === 'paragraph') return <p key={index}>{children}</p>
  return <Fragment key={index}>{children}</Fragment>
}
export function RichText({ data }: { data: unknown }) { const root = (data as { root?: Node })?.root; return root ? <>{root.children?.map(render)}</> : null }
