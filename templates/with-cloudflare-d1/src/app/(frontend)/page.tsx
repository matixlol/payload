import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
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
    <div className="home">
      <div className="content">
        <h1>OpenNext / Cloudflare Image Repro</h1>
        <p>
          Upload an image via <a href={payloadConfig.routes.admin}>/admin</a>, then refresh
          this page.
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
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
      <div className="footer">
        <p>
          This uses Next/Image with a relative Payload upload URL (e.g.
          <code> /api/media/file/&lt;filename&gt;</code>). On Cloudflare with OpenNext, the image
          optimization request can be routed to static assets and return 404.
        </p>
      </div>
    </div>
  )
}
