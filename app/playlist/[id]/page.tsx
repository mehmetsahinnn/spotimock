'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { TopBar } from '@/components/TopBar'
import { getPlaylistById, getPlaylistTracks } from '@/lib/data'
import { usePlayer } from '@/lib/player-context'
import { PlayIcon, PauseIcon, HeartIcon } from '@/lib/icons'
import { Artwork } from '@/components/Artwork'

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const playlist = getPlaylistById(id)
  if (!playlist) notFound()

  const tracks = getPlaylistTracks(id)

  return (
    <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-[#121212]">
      <TopBar />
      <div className="overflow-y-auto custom-scrollbar flex-1">
        <PlaylistHero playlist={playlist} trackCount={tracks.length} />
        <div className="bg-gradient-to-b from-black/40 to-[#121212] px-8 pt-6 pb-8">
          <PlayControls firstTrack={tracks[0]} allTracks={tracks} />
          <TrackTable tracks={tracks} allTracks={tracks} />
        </div>
      </div>
    </main>
  )
}

function PlaylistHero({ playlist, trackCount }: { playlist: ReturnType<typeof getPlaylistById> extends infer P ? Exclude<P, undefined> : never; trackCount: number }) {
  return (
    <div
      className="shrink-0 px-8 pt-8 pb-6"
      style={{ background: playlist.cover.replace('linear-gradient(135deg', 'linear-gradient(180deg') }}
    >
      <div className="flex items-end gap-6">
        <div
          className="w-56 h-56 rounded shadow-2xl shrink-0"
          style={{ background: playlist.cover }}
        />
        <div className="flex flex-col gap-3 pb-2">
          <div className="text-xs font-bold text-white uppercase tracking-widest">Playlist</div>
          <h1 className="text-white text-[5rem] font-black leading-none">{playlist.name}</h1>
          <div className="text-white/80 text-sm">{playlist.description}</div>
          <div className="text-white text-sm">
            <span className="font-bold">{playlist.owner}</span>
            <span className="text-white/60 mx-1">·</span>
            <span>{trackCount} songs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayControls({ firstTrack, allTracks }: { firstTrack: ReturnType<typeof getPlaylistTracks>[0] | undefined; allTracks: ReturnType<typeof getPlaylistTracks> }) {
  const { play, togglePlay, currentTrack, isPlaying } = usePlayer()
  const playlistActive = currentTrack && allTracks.some(t => t.id === currentTrack.id)

  return (
    <div className="flex items-center gap-6 mb-6">
      <button
        onClick={() => {
          if (playlistActive) togglePlay()
          else if (firstTrack) play(firstTrack, allTracks)
        }}
        className="w-14 h-14 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 flex items-center justify-center text-black shadow-xl transition-all"
      >
        {playlistActive && isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
      </button>
      <button className="text-[#b3b3b3] hover:text-white">
        <HeartIcon size={32} />
      </button>
      <button className="text-[#b3b3b3] hover:text-white text-3xl">⋯</button>
    </div>
  )
}

function TrackTable({ tracks, allTracks }: { tracks: ReturnType<typeof getPlaylistTracks>; allTracks: ReturnType<typeof getPlaylistTracks> }) {
  const { play, togglePlay, currentTrack, isPlaying, liked, toggleLike } = usePlayer()

  return (
    <div>
      <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-[#ffffff10] text-[#b3b3b3] text-xs uppercase tracking-wider sticky top-0 bg-[#121212]/80 backdrop-blur">
        <div className="text-right">#</div>
        <div>Title</div>
        <div>Album</div>
        <div className="text-right pr-4">⏱</div>
      </div>
      {tracks.map((t, i) => {
        const isCurrent = currentTrack?.id === t.id
        const isLiked = liked.has(t.id)
        return (
          <div
            key={t.id}
            onDoubleClick={() => play(t, allTracks)}
            className="group grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 rounded-md hover:bg-[#ffffff10] cursor-pointer items-center"
          >
            <div className="text-[#b3b3b3] text-base text-right relative">
              <span className="group-hover:hidden">{isCurrent && isPlaying ? '♪' : i + 1}</span>
              <button
                onClick={() => isCurrent ? togglePlay() : play(t, allTracks)}
                className="hidden group-hover:block text-white absolute right-0 top-1/2 -translate-y-1/2"
              >
                {isCurrent && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <Artwork title={t.title} artist={t.artist} fallback={t.cover} className="w-10 h-10" />
              <div className="min-w-0">
                <div className={`text-[15px] truncate ${isCurrent ? 'text-[#1ed760]' : 'text-white'}`}>{t.title}</div>
                <div className="text-[#b3b3b3] text-[13px] truncate">{t.artist}</div>
              </div>
            </div>
            <div className="text-[#b3b3b3] text-sm truncate">{t.album}</div>
            <div className="flex items-center justify-end gap-3 text-[#b3b3b3]">
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(t.id) }}
                className={`transition-colors ${isLiked ? 'text-[#1ed760] opacity-100' : 'opacity-0 group-hover:opacity-100 hover:text-white'}`}
              >
                <HeartIcon size={16} filled={isLiked} />
              </button>
              <span className="text-sm tabular-nums">{t.duration}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
