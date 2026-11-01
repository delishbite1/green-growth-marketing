import type { NextRequest } from 'next/server'

/**
 * The same crude in memory throttle as /api/meta-lead. A speed bump, not a
 * wall: serverless instances do not share memory.
 */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000

export function rateLimited(key: string, maxPerMinute: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > maxPerMinute
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}
