import React from 'react'

export const metadata = {
  description: 'OpenNext/Cloudflare image reproduction',
  title: 'Image Repro',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
