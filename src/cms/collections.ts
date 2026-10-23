import path from 'node:path'
import type { CollectionConfig, Field, Where } from 'payload'
import { APIError } from 'payload'
import { admin, adminField, nobody, published, staff, safeLink } from './access'

const seo: Field = { name: 'seo', type: 'group', fields: [
  { name: 'title', type: 'text', maxLength: 70 }, { name: 'description', type: 'textarea', maxLength: 170 },
  { name: 'image', type: 'upload', relationTo: 'media' },
] }
const order: Field = { name: 'order', type: 'number', defaultValue: 0, index: true }
const slug: Field = { name: 'slug', type: 'text', required: true, unique: true, index: true,
  hooks: { beforeValidate: [({ value, siblingData }) => value || String(siblingData.title || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')] },
  validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || 'Gunakan slug huruf kecil dengan tanda hubung.',
}
const text = (name: string, required = true): Field => ({ name, type: 'text', required })
const area = (name: string, required = true): Field => ({ name, type: 'textarea', required })
const image = (name: string): Field => ({ name, type: 'upload', relationTo: 'media' })
const editorial = (collection: CollectionConfig): CollectionConfig => ({
  ...collection, access: { read: published, create: staff, update: staff, delete: admin },
  versions: { drafts: true, maxPerDoc: 12 },
  admin: { useAsTitle: 'title', group: 'Konten', ...(['services', 'projects', 'posts'].includes(collection.slug) ? { preview: (doc: Record<string, unknown>) => `/preview?collection=${collection.slug}&id=${doc.id}` } : {}), ...collection.admin },
})

export const Users: CollectionConfig = {
  slug: 'users', labels: { singular: 'Pengguna', plural: 'Pengguna' },
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000, tokenExpiration: 7200,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' } },
  admin: { useAsTitle: 'name', group: 'Administrasi' },
  access: { create: admin, delete: admin, read: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false,
    update: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false },
  hooks: { beforeChange: [({ req, context, operation }) => {
    if (operation === 'create' && req.user?.role !== 'admin' && !context.bootstrapAdmin) throw new APIError('Pembuatan akun hanya oleh administrator.', 403)
  }] },
  fields: [text('name'), { name: 'role', type: 'select', required: true, defaultValue: 'editor', options: ['admin', 'editor'], access: { update: adminField } }],
}
export const Media: CollectionConfig = {
  slug: 'media', labels: { singular: 'Media', plural: 'Media' },
  admin: { group: 'Konten' }, access: { read: () => true, create: staff, update: staff, delete: admin },
  upload: { staticDir: path.resolve(process.env.MEDIA_DIR || 'media'), mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [{ name: 'card', width: 960, height: 700, position: 'centre' }], adminThumbnail: 'card' },
  hooks: { beforeChange: [({ req }) => {
    if (!req.file) return
    const b = req.file.data
    const valid = b.subarray(0, 3).toString('hex') === 'ffd8ff' || b.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' || b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP' || b.toString('ascii', 4, 8) === 'ftyp' && /avif|avis/.test(b.toString('ascii', 8, 32))
    const limitMB = process.env.VERCEL === '1' ? 4 : 8
    if (!valid || req.file.size > limitMB * 1024 * 1024) throw new APIError(`Unggah gambar PNG, JPEG, WebP, atau AVIF, maksimal ${limitMB} MB.`, 400)
  }] },
  fields: [text('alt'), area('caption', false)],
}
export const Services = editorial({ slug: 'services', labels: { singular: 'Layanan', plural: 'Layanan' }, fields: [
  text('title'), slug, area('excerpt'), { name: 'content', type: 'richText' }, image('illustration'), image('image'),
  { name: 'category', type: 'select', required: true, options: ['Pengembangan', 'Desain', 'Infrastruktur', 'Konsultasi'] },
  { name: 'deliverables', type: 'array', fields: [text('item')] }, order, seo,
] })
export const Projects = editorial({ slug: 'projects', labels: { singular: 'Project', plural: 'Project' }, fields: [
  text('title'), slug, text('category'), text('client', false), area('excerpt'), area('challenge'), area('solution'), area('results', false),
  { name: 'isConcept', type: 'checkbox', defaultValue: true, admin: { description: 'Aktifkan untuk demonstrasi; jangan tampilkan sebagai proyek klien.' } },
  { name: 'visual', type: 'select', options: ['commerce', 'platform', 'editorial'], defaultValue: 'commerce' },
  { name: 'technologies', type: 'array', fields: [text('name')] }, image('thumbnail'),
  { name: 'gallery', label: 'Galeri project', type: 'array', admin: { description: 'Tambahkan beberapa gambar dari Media, atur urutannya, dan isi caption. Semua gambar tampil pada galeri detail dan dapat diperbesar.' }, fields: [image('image'), text('caption', false)] },
  { name: 'externalLink', type: 'text', validate: (v: unknown) => !v || typeof v === 'string' && /^https:\/\//.test(v) || 'Gunakan URL HTTPS.' },
  { name: 'featured', type: 'checkbox', defaultValue: false }, order, seo,
] })
export const Posts = editorial({ slug: 'posts', labels: { singular: 'Artikel', plural: 'Artikel' }, fields: [
  text('title'), slug, area('excerpt'), { name: 'content', type: 'richText', required: true }, image('image'),
  { name: 'author', type: 'relationship', relationTo: 'team' }, text('category'),
  { name: 'tags', type: 'array', fields: [text('tag')] }, { name: 'publishedAt', type: 'date', required: true, index: true }, seo,
] })
export const Team: CollectionConfig = {
  slug: 'team', labels: { singular: 'Anggota', plural: 'Tim' },
  admin: { useAsTitle: 'name', group: 'Konten' }, access: { read: () => true, create: staff, update: staff, delete: admin },
  fields: [text('name'), text('role'), area('biography'), image('photo'), order,
    { name: 'socials', type: 'array', fields: [text('label'), { name: 'url', type: 'text', validate: (v: unknown) => safeLink(v) || 'Gunakan URL HTTPS.' }] }],
}
export const Testimonials = editorial({ slug: 'testimonials', labels: { singular: 'Testimoni', plural: 'Testimoni' },
  access: {}, admin: { useAsTitle: 'clientName' }, fields: [text('clientName'), text('position', false), text('company'), area('quote'), image('photo'), { name: 'approved', type: 'checkbox', defaultValue: false }] })
Testimonials.access = { ...Testimonials.access, read: ({ req }) => req.user ? true : ({ and: [{ _status: { equals: 'published' } }, { approved: { equals: true } }] } as Where) }
export const FAQs = editorial({ slug: 'faqs', labels: { singular: 'Pertanyaan', plural: 'FAQ' }, admin: { useAsTitle: 'question' }, fields: [text('question'), area('answer'), text('category', false), order] })
export const Contacts: CollectionConfig = {
  slug: 'contact-submissions', labels: { singular: 'Pesan', plural: 'Pesan Konsultasi' },
  admin: { useAsTitle: 'name', group: 'Administrasi', defaultColumns: ['name', 'service', 'status', 'createdAt'] },
  access: { create: nobody, read: staff, update: staff, delete: admin },
  fields: [text('name'), { name: 'email', type: 'email', required: true }, text('company', false), text('phone', false), text('service'), area('message'),
    { name: 'consent', type: 'checkbox', required: true },
    { name: 'status', type: 'select', defaultValue: 'baru', options: ['baru', 'dihubungi', 'selesai'] }],
}
export const ContactLimits: CollectionConfig = {
  slug: 'contact-rate-limits', admin: { hidden: true }, timestamps: false,
  access: { create: nobody, read: nobody, update: nobody, delete: nobody },
  fields: [{ name: 'key', type: 'text', required: true, unique: true }, { name: 'hits', type: 'number', required: true }, { name: 'resetAt', type: 'date', required: true, index: true }],
}
export const collections = [Users, Media, Services, Projects, Posts, Team, Testimonials, FAQs, Contacts, ContactLimits]
