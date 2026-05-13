'use client'

import { useArtwork } from '@/lib/artwork'

type Props = {
  title: string
  artist: string
  fallback: string
  className?: string
  rounded?: string
  kind?: 'song' | 'album'
  alt?: string
}

export function Artwork({ title, artist, fallback, className, rounded = 'rounded', kind = 'song', alt }: Props) {
  const query = `${title} ${artist}`
  const url = useArtwork(query, kind)

  if (url) {
    return (
      <div
        className={`${className ?? ''} ${rounded} bg-cover bg-center shrink-0`}
        style={{ backgroundImage: `url(${url})` }}
        role="img"
        aria-label={alt ?? `${title} cover`}
      />
    )
  }
  return (
    <div
      className={`${className ?? ''} ${rounded} shrink-0`}
      style={{ background: fallback }}
      aria-label={alt ?? `${title} cover`}
    />
  )
}
