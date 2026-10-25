export function databaseConnectionString(value?: string) {
  if (!value) return value
  const url = new URL(value)
  // Preserve the driver's current certificate + hostname verification explicitly.
  if (!url.searchParams.has('uselibpqcompat') && ['prefer', 'require', 'verify-ca'].includes(url.searchParams.get('sslmode') || '')) url.searchParams.set('sslmode', 'verify-full')
  return url.toString()
}
