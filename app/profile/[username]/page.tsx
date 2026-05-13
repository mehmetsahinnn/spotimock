'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { friends, friendProfiles } from '@/lib/friends-data'
import { getTrackById, getPlaylistById, getPlaylistTracks } from '@/lib/data'
import { usePlayer } from '@/lib/player-context'
import { PlayIcon, PauseIcon, ChevronLeftIcon } from '@/lib/icons'

export default function FriendProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const friend = friends.find(f => f.username === username)
  if (!friend) notFound()
  const profile = friendProfiles[friend.id]
  if (!profile) notFound()

  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-[#121212]">
        <TopBar />
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <Hero friend={friend} profile={profile} />
          <div className="bg-gradient-to-b from-black/40 to-[#121212] px-8 py-6">
            <ActionBar friend={friend} />
            <NowPlayingBanner friend={friend} />
            <TopArtists profile={profile} />
            <PublicPlaylists profile={profile} />
            <RecentTracks profile={profile} />
          </div>
        </div>
      </main>
    </AppShell>
  )
}

function Hero({ friend, profile }: { friend: typeof friends[0]; profile: typeof friendProfiles[string] }) {
  const heroBg = friend.avatar.replace('linear-gradient(135deg', 'linear-gradient(180deg').replace('0%', '0%').replace('100%', '60%')

  return (
    <div className="shrink-0 px-8 pt-2 pb-8 relative" style={{ background: heroBg }}>
      <Link href="/friends" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6">
        <ChevronLeftIcon size={20} /> Back to Friends
      </Link>
      <div className="flex items-end gap-6">
        <div
          className="w-44 h-44 rounded-full shadow-2xl shrink-0 relative"
          style={{ background: friend.avatar }}
        >
          {friend.isOnline && (
            <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#1ed760] border-4 border-black" />
          )}
        </div>
        <div className="flex flex-col gap-3 pb-2">
          <div className="text-xs font-bold text-white uppercase tracking-widest">Profile</div>
          <h1 className="text-white text-[5rem] font-black leading-none">{friend.name}</h1>
          <div className="text-white/90 text-sm">{profile.bio}</div>
          <div className="flex items-center gap-1 text-white text-sm flex-wrap">
            <span className="font-bold">@{friend.username}</span>
            <span className="text-white/60 mx-1">·</span>
            <span><span className="font-bold">{profile.publicPlaylistIds.length}</span> Public Playlists</span>
            <span className="text-white/60 mx-1">·</span>
            <span><span className="font-bold">{profile.followers}</span> Followers</span>
            <span className="text-white/60 mx-1">·</span>
            <span><span className="font-bold">{profile.following}</span> Following</span>
            <span className="text-white/60 mx-1">·</span>
            <span className="text-white/60">Joined {profile.joinedYear}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionBar({ friend }: { friend: typeof friends[0] }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button className={`px-6 py-2 text-sm font-bold rounded-full transition-all ${friend.isFollowing ? 'border border-[#727272] hover:border-white text-white' : 'bg-white hover:scale-105 text-black'}`}>
        {friend.isFollowing ? 'Following' : 'Follow'}
      </button>
      <Link
        href={`/messages/${friend.username}`}
        className="px-6 py-2 border border-[#727272] hover:border-white text-white text-sm font-bold rounded-full transition-colors"
      >
        Message
      </Link>
      <button className="text-[#b3b3b3] hover:text-white text-2xl ml-2">⋯</button>
    </div>
  )
}

function NowPlayingBanner({ friend }: { friend: typeof friends[0] }) {
  if (!friend.isOnline) return null

  return (
    <div className="mb-8 p-4 bg-[#1ed760]/10 border border-[#1ed760]/30 rounded-lg flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#1ed760]/20 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1ed760">
          <path d="M9 17V5l12-2v12" /><circle cx="6" cy="17" r="3" /><circle cx="18" cy="15" r="3" />
        </svg>
      </div>
      <div>
        <div className="text-[#1ed760] text-xs font-bold uppercase tracking-wider">Listening now</div>
        <div className="text-white text-sm font-medium">{friend.trackTitle} · {friend.artist}</div>
      </div>
    </div>
  )
}

function TopArtists({ profile }: { profile: typeof friendProfiles[string] }) {
  return (
    <Section title="Top artists this month">
      <Grid>
        {profile.topArtists.map(a => (
          <CardCircle key={a.name} title={a.name} subtitle={`${a.plays} plays`} cover={a.cover} />
        ))}
      </Grid>
    </Section>
  )
}

function PublicPlaylists({ profile }: { profile: typeof friendProfiles[string] }) {
  const lists = profile.publicPlaylistIds.map(getPlaylistById).filter(Boolean)
  if (lists.length === 0) return null

  return (
    <Section title="Public playlists">
      <Grid>
        {lists.map(p => (
          <Link key={p!.id} href={`/playlist/${p!.id}`} className="contents">
            <CardSquare title={p!.name} subtitle={p!.description} cover={p!.cover} />
          </Link>
        ))}
      </Grid>
    </Section>
  )
}

function RecentTracks({ profile }: { profile: typeof friendProfiles[string] }) {
  const trackList = profile.recentTracks.map(rt => getTrackById(rt.trackId)).filter(Boolean)
  const { play, togglePlay, currentTrack, isPlaying } = usePlayer()

  if (trackList.length === 0) return null

  return (
    <Section title="Recently played">
      <div className="mt-2">
        {trackList.map((t, i) => {
          if (!t) return null
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
                <div className="w-10 h-10 rounded shrink-0" style={{ background: t.cover }} />
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
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  )
}

function CardCircle({ title, subtitle, cover }: { title: string; subtitle: string; cover: string }) {
  return (
    <div className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-left cursor-pointer">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-full shadow-lg" style={{ background: cover }} />
      </div>
      <div className="text-white font-bold text-base truncate mb-1">{title}</div>
      <div className="text-[#b3b3b3] text-sm truncate">{subtitle}</div>
    </div>
  )
}

function CardSquare({ title, subtitle, cover }: { title: string; subtitle: string; cover: string }) {
  return (
    <div className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-left cursor-pointer">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded shadow-lg" style={{ background: cover }} />
      </div>
      <div className="text-white font-bold text-base truncate mb-1">{title}</div>
      <div className="text-[#b3b3b3] text-sm line-clamp-2 leading-tight">{subtitle}</div>
    </div>
  )
}
