import type { GlobalConfig, Field } from 'payload'
import { safeLink, staff } from './access'
const upload = (name: string): Field => ({ name, type: 'upload', relationTo: 'media' })
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', label: 'Pengaturan Website', access: { read: () => true, update: staff },
  fields: [
    { name: 'name', type: 'text', defaultValue: 'Wasla Informatika', required: true },
    upload('logoWhite'), upload('logoNavy'), upload('favicon'),
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Gambar utama beranda', admin: { description: 'Unggah mockup atau foto proyek. Gambar contoh dapat diganti di sini.' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'heroTitle', type: 'text', required: true }, { name: 'heroCopy', type: 'textarea', required: true },
    { name: 'statement', type: 'textarea', required: true },
    { name: 'email', type: 'email' }, { name: 'whatsapp', type: 'text', validate: (v: unknown) => !v || typeof v === 'string' && /^[1-9]\d{8,14}$/.test(v) || 'Format internasional tanpa tanda +, contoh 62…' },
    { name: 'address', type: 'textarea' },
    { name: 'socials', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true, validate: (v: unknown) => safeLink(v) || 'URL tidak valid.' }] },
    { name: 'footerNote', type: 'text' }, { name: 'seoDescription', type: 'textarea', maxLength: 170 },
  ],
}
export const Navigation: GlobalConfig = {
  slug: 'navigation', label: 'Navigasi', access: { read: () => true, update: staff },
  fields: [{ name: 'links', type: 'array', fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true, validate: (v: unknown) => safeLink(v) || 'Gunakan path internal atau URL HTTPS.' },
    { name: 'order', type: 'number', defaultValue: 0 }, { name: 'enabled', type: 'checkbox', defaultValue: true },
  ] }],
}
