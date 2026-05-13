'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { playlists, recentlyPlayed, tracks, getPlaylistTracks } from '@/lib/data'
import { usePlayer } from '@/lib/player-context'
import { PlayIcon, PauseIcon } from '@/lib/icons'
import { Artwork } from './Artwork'

export function MainContent() {
  const { play, currentTrack, isPlaying, togglePlay } = usePlayer()
  const router = useRouter()

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
      <div className="px-6">
        <h1 className="text-[2rem] font-bold text-white mb-5 mt-2">{greeting()}</h1>

        {/* Top 6 quick access */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          {playlists.slice(0, 6).map(p => {
            const playlistTracks = getPlaylistTracks(p.id)
            const playing = currentTrack && playlistTracks.some(t => t.id === currentTrack.id)
            return (
              <div
                key={p.id}
                onClick={() => router.push(`/playlist/${p.id}`)}
                role="button"
                tabIndex={0}
                className="group flex items-center gap-3 bg-[#ffffff0d] hover:bg-[#ffffff1f] rounded-md overflow-hidden transition-colors relative cursor-pointer"
              >
                <div className="w-20 h-20 shrink-0" style={{ background: p.cover }}>
                  {p.id === 'p1' && (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl">♥</div>
                  )}
                </div>
                <span className="text-white font-bold text-[15px] truncate pr-16 flex-1">{p.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (playing) togglePlay()
                    else if (playlistTracks[0]) play(playlistTracks[0], playlistTracks)
                  }}
                  className="absolute right-3 w-12 h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 items-center justify-center text-black shadow-xl transition-all hidden group-hover:flex"
                >
                  {playing && isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                </button>
              </div>
            )
          })}
        </div>

        {/* Featured / Newly added */}
        <Section title="Featured this week" href="/search">
          <Grid>
            {['p13', 'p9', 'p10', 'p11', 'p12'].map(pid => {
              const p = playlists.find(x => x.id === pid)
              if (!p) return null
              return (
                <Card
                  key={p.id}
                  href={`/playlist/${p.id}`}
                  title={p.name}
                  artist={p.owner}
                  fallback={p.cover}
                  subtitle={p.description}
                  onPlay={() => {
                    const pt = getPlaylistTracks(p.id)
                    if (pt[0]) play(pt[0], pt)
                  }}
                />
              )
            })}
          </Grid>
        </Section>

        {/* Recently played */}
        <Section title="Recently played" href="/search">
          <Grid>
            {recentlyPlayed.map(a => (
              <Card
                key={a.id}
                href={`/playlist/${a.playlistId}`}
                title={a.title}
                artist={a.artist}
                fallback={a.cover}
                subtitle={`${a.year} · ${a.artist}`}
                onPlay={() => {
                  const pt = getPlaylistTracks(a.playlistId)
                  if (pt[0]) play(pt[0], pt)
                }}
              />
            ))}
          </Grid>
        </Section>

        {/* Made for you */}
        <Section title="Made for Mehmet" href="/search">
          <Grid>
            {playlists.slice(2, 8).map(p => (
              <Card
                key={p.id}
                href={`/playlist/${p.id}`}
                title={p.name}
                artist={p.owner}
                fallback={p.cover}
                subtitle={p.description}
                onPlay={() => {
                  const pt = getPlaylistTracks(p.id)
                  if (pt[0]) play(pt[0], pt)
                }}
              />
            ))}
          </Grid>
        </Section>

        {/* Popular tracks */}
        <Section title="Popular right now">
          <div className="mt-2">
            {tracks.slice(0, 6).map((t, i) => {
              const isCurrent = currentTrack?.id === t.id
              return (
                <div
                  key={t.id}
                  onDoubleClick={() => play(t)}
                  className="group grid grid-cols-[16px_1fr_auto] gap-4 px-4 py-2 rounded-md hover:bg-[#ffffff10] cursor-pointer items-center"
                >
                  <div className="text-[#b3b3b3] text-base text-right relative">
                    <span className="group-hover:hidden">{isCurrent && isPlaying ? '♪' : i + 1}</span>
                    <button
                      onClick={() => isCurrent ? togglePlay() : play(t)}
                      className="hidden group-hover:block text-white absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      {isCurrent && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={14} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 min-w-0">
                    <Artwork
                      title={t.title}
                      artist={t.artist}
                      fallback={t.cover}
                      className="w-10 h-10"
                    />
                    <div className="min-w-0">
                      <div className={`text-[15px] truncate ${isCurrent ? 'text-[#1ed760]' : 'text-white'}`}>{t.title}</div>
                      <div className="text-[#b3b3b3] text-[13px] truncate">{t.artist}</div>
                    </div>
                  </div>
                  <div className="text-[#b3b3b3] text-sm tabular-nums">{t.duration}</div>
                </div>
              )
            })}
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer">{title}</h2>
        {href && (
          <Link href={href} className="text-[#b3b3b3] text-sm font-bold hover:underline">
            Show all
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  )
}

function Card({ title, artist, fallback, subtitle, onPlay, href }: { title: string; artist: string; fallback: string; subtitle: string; onPlay: () => void; href: string }) {
  return (
    <Link
      href={href}
      className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-left relative cursor-pointer block"
    >
      <div className="relative mb-4">
        <Artwork
          title={title}
          artist={artist}
          fallback={fallback}
          className="w-full aspect-square shadow-lg"
        />
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPlay() }}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 flex items-center justify-center text-black shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <PlayIcon size={18} />
        </button>
      </div>
      <div className="text-white font-bold text-base truncate mb-1">{title}</div>
      <div className="text-[#b3b3b3] text-sm line-clamp-2 leading-tight">{subtitle}</div>
    </Link>
  )
}
