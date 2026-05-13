'use client'

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import { tracks, type Track } from './data'

type PlayerState = {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  liked: Set<string>
  shuffle: boolean
  repeat: 'off' | 'all' | 'one'
  queue: Track[]
  ready: boolean
  play: (track: Track, queueList?: Track[]) => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  seek: (pct: number) => void
  setVolume: (v: number) => void
  toggleLike: (id: string) => void
  toggleShuffle: () => void
  cycleRepeat: () => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady?: () => void
  }
}

const Ctx = createContext<PlayerState | null>(null)
const PLAYER_DIV_ID = 'yt-hidden-player'

export function PlayerProvider({ children }: { children: ReactNode }) {
  const ytRef = useRef<any>(null)
  const nextRef = useRef<() => void>(() => {})
  const repeatRef = useRef<'off' | 'all' | 'one'>('off')
  const pendingRef = useRef<Track | null>(null)
  const [ready, setReady] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(70)
  const [liked, setLiked] = useState<Set<string>>(new Set(['t2', 't5', 't8']))
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off')
  const [queue, setQueue] = useState<Track[]>(tracks)

  useEffect(() => { repeatRef.current = repeat }, [repeat])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initPlayer = () => {
      if (ytRef.current || !window.YT?.Player) return
      const el = document.getElementById(PLAYER_DIV_ID)
      if (!el) return
      ytRef.current = new window.YT.Player(PLAYER_DIV_ID, {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            ytRef.current?.setVolume(volume)
            setReady(true)
            // Drain pending
            if (pendingRef.current && ytRef.current?.loadVideoById) {
              const t = pendingRef.current
              pendingRef.current = null
              ytRef.current.loadVideoById(t.youtubeId)
            }
          },
          onStateChange: (e: any) => {
            const YT = window.YT
            if (!YT) return
            const s = e.data
            if (s === YT.PlayerState.PLAYING) setIsPlaying(true)
            else if (s === YT.PlayerState.PAUSED) setIsPlaying(false)
            else if (s === YT.PlayerState.ENDED) {
              if (repeatRef.current === 'one') {
                ytRef.current?.seekTo(0, true)
                ytRef.current?.playVideo()
              } else {
                nextRef.current?.()
              }
            }
          },
          onError: () => {
            nextRef.current?.()
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.async = true
        document.body.appendChild(tag)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ready || !isPlaying) return
    const id = setInterval(() => {
      const p = ytRef.current
      if (!p?.getCurrentTime) return
      const t = p.getCurrentTime()
      const d = p.getDuration()
      if (typeof t === 'number') setProgress(t)
      if (typeof d === 'number' && d > 0) setDuration(d)
    }, 500)
    return () => clearInterval(id)
  }, [ready, isPlaying])

  useEffect(() => {
    if (ready && ytRef.current?.setVolume) {
      ytRef.current.setVolume(volume)
    }
  }, [volume, ready])

  const play = useCallback((track: Track, queueList?: Track[]) => {
    setCurrentTrack(track)
    if (queueList && queueList.length > 0) setQueue(queueList)
    setProgress(0)
    setDuration(track.durationSec)
    const p = ytRef.current
    if (ready && p?.loadVideoById && track.youtubeId) {
      p.loadVideoById(track.youtubeId)
    } else {
      pendingRef.current = track
    }
  }, [ready])

  const togglePlay = useCallback(() => {
    const p = ytRef.current
    if (!p) {
      if (currentTrack) pendingRef.current = currentTrack
      return
    }
    if (isPlaying) p.pauseVideo?.()
    else {
      const cur = p.getVideoData?.()?.video_id
      if (currentTrack?.youtubeId && cur !== currentTrack.youtubeId) {
        p.loadVideoById(currentTrack.youtubeId)
      } else {
        p.playVideo?.()
      }
    }
  }, [isPlaying, currentTrack])

  const next = useCallback(() => {
    if (!currentTrack) return
    const activeQueue = queue.length > 0 ? queue : tracks
    let idx = activeQueue.findIndex(t => t.id === currentTrack.id)
    if (idx === -1) idx = 0
    if (shuffle) {
      idx = Math.floor(Math.random() * activeQueue.length)
    } else {
      idx = (idx + 1) % activeQueue.length
    }
    play(activeQueue[idx], activeQueue)
  }, [currentTrack, queue, shuffle, play])
  nextRef.current = next

  const prev = useCallback(() => {
    if (!currentTrack) return
    const p = ytRef.current
    if (p?.getCurrentTime && p.getCurrentTime() > 3) {
      p.seekTo(0, true)
      return
    }
    const activeQueue = queue.length > 0 ? queue : tracks
    let idx = activeQueue.findIndex(t => t.id === currentTrack.id)
    if (idx === -1) idx = 0
    const prevIdx = (idx - 1 + activeQueue.length) % activeQueue.length
    play(activeQueue[prevIdx], activeQueue)
  }, [currentTrack, queue, play])

  const seek = useCallback((pct: number) => {
    const p = ytRef.current
    if (!p?.seekTo) return
    const total = duration > 0 ? duration : (currentTrack?.durationSec ?? 0)
    const newTime = total * pct
    p.seekTo(newTime, true)
    setProgress(newTime)
  }, [duration, currentTrack])

  const toggleLike = useCallback((id: string) => {
    setLiked(s => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id); else n.add(id)
      return n
    })
  }, [])

  const toggleShuffle = () => setShuffle(s => !s)
  const cycleRepeat = () => setRepeat(r => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off')

  const effectiveDuration = duration > 0 ? duration : (currentTrack?.durationSec ?? 0)

  return (
    <Ctx.Provider value={{
      currentTrack, isPlaying, progress, duration: effectiveDuration,
      volume: volume / 100, liked, shuffle, repeat, queue, ready,
      play, togglePlay, next, prev, seek,
      setVolume: (v: number) => setVolumeState(Math.round(v * 100)),
      toggleLike, toggleShuffle, cycleRepeat,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const usePlayer = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePlayer must be inside PlayerProvider')
  return ctx
}
