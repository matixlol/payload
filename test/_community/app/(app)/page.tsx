import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'media',
    limit: 1,
  })

  const media = docs[0]
  const src =
    typeof media?.url === 'string'
      ? media.url
      : media?.filename
        ? `/api/media/file/${media.filename}`
        : null

  const width = typeof media?.width === 'number' ? media.width : 800
  const height = typeof media?.height === 'number' ? media.height : 600
  const alt = media?.alt ?? media?.filename ?? 'Uploaded media'

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Next.js Image Repro</h1>
      <p>
        Upload an image via <Link href="/admin">/admin</Link>, then refresh this page.
      </p>
      {src ? (
        <div style={{ display: 'grid', gap: 12, maxWidth: 900 }}>
          <Image alt={alt} height={height} src={src} width={width} />
          <div>
            <strong>Image src:</strong> <code>{src}</code>
          </div>
        </div>
      ) : (
        <p>No media found yet.</p>
      )}
      <p style={{ marginTop: 16 }}>
        This uses Next/Image with a relative Payload upload URL (e.g.
        <code> /api/media/file/&lt;filename&gt;</code>). On Cloudflare with OpenNext, image
        optimization fetches the relative URL via the ASSETS binding and returns 404.
      </p>
    </main>
  )
}
