'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { Artwork } from '@/components/Artwork'
import { tracks, playlists } from '@/lib/data'
import { friends } from '@/lib/friends-data'
import { usePlayer } from '@/lib/player-context'
import { SearchIcon, PlayIcon, PauseIcon } from '@/lib/icons'

const browseCategories = [
  { label: 'Pop', bg: 'linear-gradient(135deg,#ff6b9d,#c44569)' },
  { label: 'Hip-Hop', bg: 'linear-gradient(135deg,#7209b7,#3a0ca3)' },
  { label: 'Rock', bg: 'linear-gradient(135deg,#d00000,#9d0208)' },
  { label: 'Chill', bg: 'linear-gradient(135deg,#06d6a0,#118ab2)' },
  { label: 'Workout', bg: 'linear-gradient(135deg,#ff006e,#fb5607)' },
  { label: 'Indie', bg: 'linear-gradient(135deg,#240046,#5a189a)' },
  { label: 'Latin', bg: 'linear-gradient(135deg,#ffba08,#f48c06)' },
  { label: 'R&B', bg: 'linear-gradient(135deg,#03045e,#0077b6)' },
]

export default function SearchPage() {
  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-gradient-to-b from-[#1f1f1f] to-[#121212]">
        <TopBar />
        <SearchBody />
      </main>
    </AppShell>
  )
}

function SearchBody() {
  const [q, setQ] = useState('')
  const { play, currentTrack, isPlaying, togglePlay } = usePlayer()

  const query = q.trim().toLowerCase()

  const matched = useMemo(() => {
    if (!query) return { tracks: [], playlists: [], friends: [] }
    return {
      tracks: tracks.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query) ||
        t.album.toLowerCase().includes(query)
      ),
      playlists: playlists.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.owner.toLowerCase().includes(query)
      ),
      friends: friends.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.username.toLowerCase().includes(query)
      ),
    }
  }, [query])

  return (
    <>
      <div className="px-8 py-4 shrink-0">
        <div className="relative max-w-xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#828282]">
            <SearchIcon size={20} />
          </div>
          <input
            autoFocus
            type="text"
            placeholder="What do you want to play?"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full bg-[#242424] text-white placeholder:text-[#b3b3b3] text-base pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 px-8 pb-6">
        {!query && (
          <>
            <h2 className="text-white text-2xl font-bold mb-4">Browse all</h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {browseCategories.map(c => (
                <div
                  key={c.label}
                  className="aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{ background: c.bg }}
                >
                  <div className="text-white font-bold text-xl">{c.label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {query && (
          <>
            {matched.tracks.length === 0 && matched.playlists.length === 0 && matched.friends.length === 0 ? (
              <div className="text-[#b3b3b3] text-center py-12">No results for &quot;{q}&quot;</div>
            ) : (
              <div className="space-y-8 pt-2">
                {matched.tracks.length > 0 && (
                  <section>
                    <h3 className="text-white text-xl font-bold mb-3">Songs</h3>
                    <div className="space-y-1">
                      {matched.tracks.slice(0, 8).map(t => {
                        const isCur = currentTrack?.id === t.id
                        return (
                          <div
                            key={t.id}
                            onDoubleClick={() => play(t)}
                            className="group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#ffffff10] cursor-pointer"
                          >
                            <button
                              onClick={() => isCur ? togglePlay() : play(t)}
                              className="w-10 h-10 relative"
                            >
                              <Artwork title={t.title} artist={t.artist} fallback={t.cover} className="w-10 h-10" />
                              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 bg-black/40 rounded transition-opacity">
                                {isCur && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                              </span>
                            </button>
                            <div className="min-w-0 flex-1">
                              <div className={`text-[14px] truncate ${isCur ? 'text-[#1ed760]' : 'text-white'}`}>{t.title}</div>
                              <div className="text-[#b3b3b3] text-[12px] truncate">Song · {t.artist}</div>
                            </div>
                            <div className="text-[#b3b3b3] text-sm tabular-nums">{t.duration}</div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )}

                {matched.playlists.length > 0 && (
                  <section>
                    <h3 className="text-white text-xl font-bold mb-3">Playlists</h3>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {matched.playlists.map(p => (
                        <Link
                          key={p.id}
                          href={`/playlist/${p.id}`}
                          className="bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors"
                        >
                          <div className="w-full aspect-square rounded shadow-lg mb-3" style={{ background: p.cover }} />
                          <div className="text-white text-sm font-bold truncate">{p.name}</div>
                          <div className="text-[#b3b3b3] text-xs line-clamp-2">{p.description}</div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {matched.friends.length > 0 && (
                  <section>
                    <h3 className="text-white text-xl font-bold mb-3">Friends</h3>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {matched.friends.map(f => (
                        <Link
                          key={f.id}
                          href={`/profile/${f.username}`}
                          className="bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-center"
                        >
                          <div className="w-full aspect-square rounded-full mb-3" style={{ background: f.avatar }} />
                          <div className="text-white text-sm font-bold truncate">{f.name}</div>
                          <div className="text-[#b3b3b3] text-xs truncate">@{f.username}</div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
