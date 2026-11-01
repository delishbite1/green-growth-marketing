'use client'

import { usePathname } from 'next/navigation'
import { isBareRoute } from '@/components/layout/SiteChrome'

export default function BrandFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return isBareRoute(pathname) ? <>{children}</> : <div className="public-site">{children}</div>
}
