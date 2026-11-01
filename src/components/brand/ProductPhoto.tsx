import Image from 'next/image'

// Inset rectangles are measured inside the paper edges, excluding the table.
const crops: Record<string, { width: number; height: number; x: number; y: number; cropWidth: number; cropHeight: number }> = {
  '/products/env-style-a.jpg': { width: 1565, height: 808, x: 64, y: 60, cropWidth: 1440, cropHeight: 680 },
  '/products/env-style-b.jpg': { width: 1600, height: 774, x: 85, y: 60, cropWidth: 1440, cropHeight: 645 },
  '/products/env-style-c.jpg': { width: 1498, height: 735, x: 36, y: 46, cropWidth: 1415, cropHeight: 630 },
  '/products/env-style-d.jpg': { width: 1477, height: 814, x: 48, y: 65, cropWidth: 1372, cropHeight: 675 },
  '/products/postcard-premium.jpg': { width: 1454, height: 953, x: 42, y: 58, cropWidth: 1338, cropHeight: 846 },
  '/products/postcard-value.jpg': { width: 1369, height: 929, x: 25, y: 43, cropWidth: 1305, cropHeight: 845 },
}

export default function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  const crop = crops[src]
  if (!crop) return null
  return <div className="relative w-full overflow-hidden bg-ggm-paper" style={{ aspectRatio: `${crop.cropWidth} / ${crop.cropHeight}` }}>
    <Image src={src} alt={alt} width={crop.width} height={crop.height} sizes="(min-width: 640px) 45vw, 90vw" className="absolute h-auto max-w-none" style={{ width: `${100 * crop.width / crop.cropWidth}%`, left: `${-100 * crop.x / crop.cropWidth}%`, top: `${-100 * crop.y / crop.cropHeight}%` }} />
  </div>
}
