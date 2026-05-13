'use client'

import { useEffect, useState } from 'react'

const LS_KEY = 'spotify-mock-artwork-cache-v1'
const memCache = new Map<string, string | null>()
const pending = new Map<string, Promise<string | null>>()

function loadLS(): void {
  if (typeof window === 'undefined' || memCache.size > 0) return
  try {
    const raw = window.localStorage.getItem(LS_KEY)
    if (!raw) return
    const obj = JSON.parse(raw) as Record<string, string | null>
    Object.entries(obj).forEach(([k, v]) => memCache.set(k, v))
  } catch {}
}

function persistLS(): void {
  if (typeof window === 'undefined') return
  try {
    const obj: Record<string, string | null> = {}
    memCache.forEach((v, k) => { obj[k] = v })
    window.localStorage.setItem(LS_KEY, JSON.stringify(obj))
  } catch {}
}

export async function fetchArtwork(query: string, kind: 'song' | 'album' = 'song'): Promise<string | null> {
  loadLS()
  const key = `${kind}::${query}`
  if (memCache.has(key)) return memCache.get(key) ?? null
  if (pending.has(key)) return pending.get(key)!

  const p = fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=${kind === 'album' ? 'album' : 'song'}&limit=1`
  )
    .then(r => r.json())
    .then(data => {
      const raw: string | undefined = data?.results?.[0]?.artworkUrl100
      const url = raw ? raw.replace('100x100bb', '600x600bb') : null
      memCache.set(key, url)
      persistLS()
      return url
    })
    .catch(() => {
      memCache.set(key, null)
      return null
    })
    .finally(() => {
      pending.delete(key)
    })
  pending.set(key, p)
  return p
}

export function useArtwork(query: string, kind: 'song' | 'album' = 'song'): string | null {
  const [url, setUrl] = useState<string | null>(() => {
    loadLS()
    return memCache.get(`${kind}::${query}`) ?? null
  })
  useEffect(() => {
    let mounted = true
    fetchArtwork(query, kind).then(u => {
      if (mounted) setUrl(u)
    })
    return () => { mounted = false }
  }, [query, kind])
  return url
}
