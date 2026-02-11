import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const { pathname } = request.nextUrl

  // 1. Define a list of 'ALLOWED_BOTS'
  const ALLOWED_BOTS = [
    'lighthouse',
    'googlepagespeed',
    'chrome-lighthouse',
    'gtmetrix',
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'pinterestbot',
    'slackbot',
    'discordbot',
    'whatsapp',
    'applebot',
    'screaming frog',
    'vercelbot',
  ]

  // Known bad scrapers to block
  const BLOCKED_BOTS = [
    'bytespider',
    'petalbot',
    'mj12bot',
    'ahrefsbot',
    'semrushbot',
    'dotbot',
    'rogerbot',
    'exabot',
    'ncbot',
    'python',
    'curl',
    'wget',
    'httpclient',
    'axios',
  ]

  // 2. Logic: Check User-Agent
  
  // Block bad bots immediately
  const isBlockedBot = BLOCKED_BOTS.some((bot) => userAgent.includes(bot))
  if (isBlockedBot) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
  }

  // Check for allowed bots
  const isAllowedBot = ALLOWED_BOTS.some((bot) => userAgent.includes(bot))

  if (isAllowedBot) {
    // 4. Logging: Console log when a "Good Bot" is detected
    console.log(`[Middleware] Good Bot detected: ${userAgent} accessing ${pathname}`)

    // 3. Security: Ensure admin routes are not exposed to bots
    const protectedRoutes = ['/admin', '/login']
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedRoute) {
      return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
    }

    // Allow the request to pass (bypassing specific rate limits if they were applied here)
    return NextResponse.next()
  }

  // Default behavior for other requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}