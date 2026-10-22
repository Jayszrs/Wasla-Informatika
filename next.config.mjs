import { withPayload } from '@payloadcms/next/withPayload'

export default withPayload({
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  experimental: { cpus: 2, webpackMemoryOptimizations: true },
  poweredByHeader: false,
  images: { remotePatterns: process.env.S3_PUBLIC_URL ? [{ protocol: 'https', hostname: new URL(process.env.S3_PUBLIC_URL).hostname }] : [] },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https://') ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] : []),
    ] }]
  },
})
