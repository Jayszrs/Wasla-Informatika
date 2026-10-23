import { z } from 'zod'
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Tuliskan nama Anda, minimal 2 karakter.').max(100),
  email: z.email('Alamat email belum valid.').max(254),
  company: z.string().trim().max(150).optional().default(''),
  phone: z.string().trim().max(30).regex(/^[+\d\s().-]*$/, 'Nomor telepon belum valid.').optional().default(''),
  service: z.string().trim().min(2, 'Pilih layanan yang ingin dibahas.').max(100),
  message: z.string().trim().min(20, 'Ceritakan kebutuhan Anda, minimal 20 karakter.').max(5000, 'Pesan maksimal 5.000 karakter.'),
  consent: z.literal(true, { error: 'Persetujuan diperlukan untuk memproses pesan.' }),
  website: z.string().max(0).optional().default(''),
  recipient: z.string().trim().regex(/^\d*$/, 'Pilih kontak yang tersedia.').max(10).refine(value => !value || Number(value) > 0 && Number(value) <= 2147483647, 'Pilih kontak yang tersedia.').optional().default(''),
})
export function validWhatsApp(number?: string | null) { return !!number && /^[1-9]\d{8,14}$/.test(number) }
export function validPublicLink(href: string) { return /^\/(?!\/)[^\\\s]*$/.test(href) || /^https:\/\//.test(href) }
