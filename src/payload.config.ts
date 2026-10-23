import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'
import { collections } from './cms/collections'
import { SiteSettings, Navigation } from './cms/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN && (process.env.VERCEL === '1' || process.env.USE_VERCEL_BLOB === 'true')
const uploadLimit = process.env.VERCEL === '1' ? 4 * 1024 * 1024 : 8 * 1024 * 1024
if (!process.env.PAYLOAD_SECRET) throw new Error('Set PAYLOAD_SECRET. Run npm run setup:env for local development.')

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: siteURL,
  admin: { user: 'users', importMap: { baseDir: dirname }, meta: { titleSuffix: '— Wasla Studio' } },
  collections, globals: [SiteSettings, Navigation],
  editor: lexicalEditor(), sharp,
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL, max: 10, connectionTimeoutMillis: 5000 }, push: false, migrationDir: path.resolve(dirname, 'migrations') }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  upload: { limits: { fileSize: uploadLimit } },
  cors: [siteURL], csrf: [siteURL],
  email: process.env.SMTP_HOST ? nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM!, defaultFromName: 'Wasla Informatika',
    transportOptions: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_PORT === '465', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } },
  }) : () => ({ name: 'disabled', defaultFromAddress: 'noreply@localhost', defaultFromName: 'Wasla', sendEmail: async () => { throw new Error('SMTP is not configured. Email delivery is disabled.') } }),
  plugins: [vercelBlobStorage({ enabled: useBlob, alwaysInsertFields: true, collections: { media: true }, token: useBlob ? process.env.BLOB_READ_WRITE_TOKEN : undefined, clientUploads: false }), ...(process.env.S3_BUCKET && !useBlob ? [s3Storage({ collections: { media: { generateFileURL: ({ filename }) => `${process.env.S3_PUBLIC_URL?.replace(/\/$/, '')}/${encodeURIComponent(filename)}` } },
    bucket: process.env.S3_BUCKET,
    config: { region: process.env.S3_REGION || 'auto', endpoint: process.env.S3_ENDPOINT, forcePathStyle: true,
      credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! } },
  })] : [])],
})
