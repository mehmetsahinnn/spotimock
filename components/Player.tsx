'use client'

import { usePlayer } from '@/lib/player-context'
import { Artwork } from './Artwork'
import {
  PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon,
  ShuffleIcon, RepeatIcon, HeartIcon, VolumeIcon,
  QueueIcon, MicIcon, MaximizeIcon, PlusIcon,
} from '@/lib/icons'

const fmt = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Player() {
  const {
    currentTrack, isPlaying, progress, duration, volume, liked, shuffle, repeat,
    togglePlay, next, prev, seek, setVolume,
    toggleLike, toggleShuffle, cycleRepeat,
  } = usePlayer()

  if (!currentTrack) return null

  const isLiked = liked.has(currentTrack.id)
  const totalDur = duration > 0 ? duration : currentTrack.durationSec
  const pct = totalDur > 0 ? progress / totalDur : 0
  const volLevel = volume === 0 ? 0 : volume < 0.5 ? 1 : 2

  return (
    <div className="h-[90px] bg-black px-2 sm:px-4 flex items-center justify-between shrink-0 gap-2">
      {/* Left — track info */}
      <div className="flex items-center gap-3 w-[40%] sm:w-[30%] min-w-0">
        <Artwork
          title={currentTrack.title}
          artist={currentTrack.artist}
          fallback={currentTrack.cover}
          className="w-12 h-12 sm:w-14 sm:h-14"
        />
        <div className="min-w-0">
          <div className="text-white text-sm font-normal truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </div>
          <div className="text-[#b3b3b3] text-[11px] truncate hover:underline hover:text-white cursor-pointer">
            {currentTrack.artist}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-3">
          <button className="text-[#b3b3b3] hover:text-white transition-colors" title="Add to playlist">
            <PlusIcon size={16} />
          </button>
          <button
            onClick={() => toggleLike(currentTrack.id)}
            className={`transition-colors ${isLiked ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
            title={isLiked ? 'Remove from Liked' : 'Save to Liked'}
          >
            <HeartIcon size={16} filled={isLiked} />
          </button>
        </div>
      </div>

      {/* Center — controls */}
      <div className="flex flex-col items-center gap-1 max-w-[722px] w-[50%] sm:w-[40%]">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={`transition-colors ${shuffle ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
            title="Shuffle"
          >
            <ShuffleIcon size={16} />
            {shuffle && <div className="w-1 h-1 rounded-full bg-[#1ed760] mx-auto mt-0.5" />}
          </button>
          <button onClick={prev} className="text-[#b3b3b3] hover:text-white transition-colors">
            <SkipBackIcon size={16} />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={14} />}
          </button>
          <button onClick={next} className="text-[#b3b3b3] hover:text-white transition-colors">
            <SkipForwardIcon size={16} />
          </button>
          <button
            onClick={cycleRepeat}
            className={`transition-colors relative ${repeat !== 'off' ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
            title="Repeat"
          >
            <RepeatIcon size={16} />
            {repeat === 'one' && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-[#1ed760] text-black w-3 h-3 rounded-full flex items-center justify-center font-bold">1</span>
            )}
            {repeat === 'all' && <div className="w-1 h-1 rounded-full bg-[#1ed760] mx-auto mt-0.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-[#b3b3b3] tabular-nums w-10 text-right">
            {fmt(progress)}
          </span>
          <ProgressBar pct={pct} onSeek={seek} />
          <span className="text-[11px] text-[#b3b3b3] tabular-nums w-10">
            {fmt(totalDur)}
          </span>
        </div>
      </div>

      {/* Right — extras (hidden on small) */}
      <div className="hidden sm:flex items-center gap-2 w-[30%] justify-end">
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" title="Now playing view">
          <MicIcon size={16} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors" title="Queue">
          <QueueIcon size={16} />
        </button>
        <div className="flex items-center gap-1 group">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <VolumeIcon size={16} level={volLevel} />
          </button>
          <VolumeSlider volume={volume} setVolume={setVolume} />
        </div>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden md:block" title="Open full screen">
          <MaximizeIcon size={16} />
        </button>
      </div>
    </div>
  )
}

function ProgressBar({ pct, onSeek }: { pct: number; onSeek: (p: number) => void }) {
  return (
    <button
      className="flex-1 h-1 bg-[#4f4f4f] rounded-full overflow-hidden relative group cursor-pointer"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const p = (e.clientX - rect.left) / rect.width
        onSeek(Math.max(0, Math.min(1, p)))
      }}
    >
      <div
        className="h-full bg-white group-hover:bg-[#1ed760] transition-colors absolute left-0 top-0"
        style={{ width: `${pct * 100}%` }}
      >
        <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
      </div>
    </button>
  )
}

function VolumeSlider({ volume, setVolume }: { volume: number; setVolume: (v: number) => void }) {
  return (
    <button
      className="w-24 h-1 bg-[#4f4f4f] rounded-full overflow-hidden relative group cursor-pointer"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const v = (e.clientX - rect.left) / rect.width
        setVolume(Math.max(0, Math.min(1, v)))
      }}
    >
      <div
        className="h-full bg-white group-hover:bg-[#1ed760] transition-colors absolute left-0 top-0"
        style={{ width: `${volume * 100}%` }}
      >
        <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
      </div>
    </button>
  )
}
