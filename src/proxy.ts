import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const original = request.nextUrl.pathname
  const english = original === '/en' || original.startsWith('/en/')
  const path = english ? original.slice(3) || '/' : original
  if (english && /^\/(?:api|admin|preview|_next|images|fonts)(?:\/|$)/.test(path)) return new NextResponse('Not found', { status: 404 })
  const headers = new Headers(request.headers)
  headers.set('x-wasla-locale', english ? 'en' : 'id')
  headers.set('x-wasla-pathname', original)
  if (english) { const url = request.nextUrl.clone(); url.pathname = path; return NextResponse.rewrite(url, { request: { headers } }) }
  return NextResponse.next({ request: { headers } })
}
export const config = { matcher: ['/((?!api|admin|_next|images|fonts|.*\\..*).*)'] }
