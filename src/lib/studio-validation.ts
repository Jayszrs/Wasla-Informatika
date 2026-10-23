import { z } from 'zod'
import { studioSchema, type Field } from './studio-schema'
import { validPublicLink } from './validation'
const link = (v: string) => !v || validPublicLink(v)
function fieldSchema(field: Field): z.ZodType {
  let schema: z.ZodType
  switch (field.type) {
    case 'check': schema = z.boolean(); break
    case 'number': schema = z.number().finite().min(0).max(2147483647); break
    case 'media': schema = z.number().int().positive(); break
    case 'date': schema = z.string().refine(v => !v || /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v.slice(0, 10), 'Tanggal tidak valid.'); break
    case 'select': schema = z.enum(field.options as [string, ...string[]]); break
    case 'rich': schema = z.object({ root: z.object({ type: z.literal('root'), children: z.array(z.record(z.string(), z.unknown())).max(1000) }).passthrough() }).passthrough(); break
    case 'group': schema = z.object(Object.fromEntries((field.fields || []).map(f => [f.name, fieldSchema(f)]))); break
    case 'array': schema = z.array(z.object({ id: z.string().optional(), ...Object.fromEntries((field.fields || []).map(f => [f.name, fieldSchema(f)])) })).max(100); break
    default: {
      let text: z.ZodType = z.string().trim().max(field.type === 'area' ? 20000 : 500)
      if (field.required) text = (text as z.ZodString).min(1, `${field.label} wajib diisi.`)
      if (['url', 'href', 'externalLink'].includes(field.name)) text = text.refine(v => link(String(v)), 'Gunakan path internal atau URL HTTPS.')
      if (field.name === 'slug') text = text.refine(v => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(v)), 'Slug menggunakan huruf kecil dan tanda hubung.')
      if (field.name === 'email') text = text.refine(v => !v || z.email().safeParse(v).success, 'Email tidak valid.')
      schema = text
    }
  }
  return field.required ? schema : schema.nullish()
}
export function validateDocument(collection: string, input: unknown, partial = false) {
  const schema = studioSchema[collection]
  if (!schema) throw new Error('NOT_FOUND')
  let validator = z.object(Object.fromEntries(schema.fields.map(field => [field.name, fieldSchema(field)])))
  if (partial) validator = validator.partial()
  const parsed = validator.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('\n') }
  const data = parsed.data as Record<string, unknown>
  if (collection === 'schedules' && data.startDate && data.dueDate && String(data.dueDate).slice(0, 10) < String(data.startDate).slice(0, 10)) return { error: 'Tenggat harus pada atau setelah tanggal mulai.' }
  if (data.externalLink && !String(data.externalLink).startsWith('https://')) return { error: 'Alamat website harus HTTPS.' }
  return { data }
}
