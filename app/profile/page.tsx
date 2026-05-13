'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TopBar } from '@/components/TopBar'
import { profile, friends } from '@/lib/friends-data'
import { ChevronLeftIcon, PlayIcon } from '@/lib/icons'
import { useUI } from '@/lib/ui-context'

const EDIT_KEY = 'spotify-mock-profile-edit-v1'

function useProfileWithEdits() {
  const [edited, setEdited] = useState({ name: profile.name, username: profile.username, bio: profile.bio })
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(EDIT_KEY)
    if (raw) {
      try { setEdited(JSON.parse(raw)) } catch {}
    }
  }, [])
  return { ...profile, ...edited }
}

export default function ProfilePage() {
  return (
    <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-[#121212]">
      <TopBar />
      <div className="overflow-y-auto custom-scrollbar flex-1">
        <ProfileHero />
        <div className="bg-gradient-to-b from-[#1f1f1f]/40 to-[#121212] px-8 py-6">
          <PlayCircle />
          <TopArtistsThisMonth />
          <PublicPlaylistsSection />
          <RecentArtistsSection />
          <SimilarGenreSection />
          <FollowersSection />
        </div>
      </div>
    </main>
  )
}

function ProfileHero() {
  const profile = useProfileWithEdits()
  return (
    <div className="shrink-0 px-4 sm:px-8 pt-2 pb-8 bg-gradient-to-b from-[#7c3aed] via-[#7c3aed]/40 to-transparent">
      <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6">
        <ChevronLeftIcon size={20} /> Back to Home
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full shadow-2xl shrink-0" style={{ background: profile.avatar }} />
        <div className="flex flex-col gap-3 pb-2">
          <div className="text-xs font-bold text-white uppercase tracking-widest">Profile</div>
          <h1 className="text-white text-4xl sm:text-6xl lg:text-[5rem] font-black leading-none">{profile.name}</h1>
          <div className="text-white/90 text-sm">{profile.bio}</div>
          <div className="flex items-center gap-1 text-white text-sm flex-wrap">
            <span className="font-bold">@{profile.username}</span>
            <span className="text-white/60 mx-1">·</span>
            <span><span className="font-bold">{profile.publicPlaylists.length}</span> Public Playlists</span>
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

function PlayCircle() {
  const { openEditProfile } = useUI()
  return (
    <div className="flex items-center gap-3 mb-8">
      <button
        onClick={openEditProfile}
        className="px-6 py-2 bg-white hover:scale-105 text-black text-sm font-bold rounded-full transition-transform"
      >
        Edit profile
      </button>
      <button className="text-[#b3b3b3] hover:text-white text-2xl">⋯</button>
    </div>
  )
}

function TopArtistsThisMonth() {
  return (
    <Section title="Top artists this month" subtitle="Only visible to you" href="/profile/top-artists">
      <Grid>
        {profile.topArtists.map(a => (
          <CardCircle key={a.name} title={a.name} subtitle={`${a.plays} plays · ${a.topGenre}`} cover={a.cover} />
        ))}
      </Grid>
    </Section>
  )
}

function PublicPlaylistsSection() {
  return (
    <Section title="Public playlists" href="/profile/playlists">
      <Grid>
        {profile.publicPlaylists.map(p => (
          <CardSquare key={p.id} title={p.name} subtitle={`${p.trackCount} songs · ${p.saves} saves`} cover={p.cover} />
        ))}
      </Grid>
    </Section>
  )
}

function RecentArtistsSection() {
  return (
    <Section title="Recently played artists">
      <Grid>
        {profile.recentArtists.map(a => (
          <CardCircle
            key={a.name}
            title={a.name}
            subtitle={a.lastPlayedDaysAgo === 1 ? '1 day ago' : `${a.lastPlayedDaysAgo} days ago`}
            cover={a.cover}
          />
        ))}
      </Grid>
    </Section>
  )
}

function SimilarGenreSection() {
  return (
    <Section title="More of what you like" subtitle={`Based on: ${profile.topGenres.join(' · ')}`}>
      <div className="mt-2">
        {profile.similarGenreTracks.map((t, i) => (
          <div key={t.id} className="grid grid-cols-[16px_1fr_auto] gap-4 px-4 py-2 rounded-md hover:bg-[#ffffff10] cursor-pointer items-center group">
            <div className="text-[#b3b3b3] text-base text-right">{i + 1}</div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded shrink-0" style={{ background: t.cover }} />
              <div className="min-w-0">
                <div className="text-white text-[15px] truncate">{t.title}</div>
                <div className="text-[#b3b3b3] text-[13px] truncate">{t.artist}</div>
              </div>
            </div>
            <div className="text-[#b3b3b3] text-sm tabular-nums">{t.duration}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FollowersSection() {
  const followers = friends.slice(0, 6)
  return (
    <Section title="Followers" href="/profile/followers" subtitle={`${profile.followers} people follow you`}>
      <Grid>
        {followers.map(f => (
          <FollowerCard key={f.id} username={f.username} name={f.name} avatar={f.avatar} />
        ))}
      </Grid>
    </Section>
  )
}

function FollowerCard({ username, name, avatar }: { username: string; name: string; avatar: string }) {
  return (
    <Link href={`/profile/${username}`} className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-center block">
      <div className="w-full aspect-square rounded-full shadow-lg mb-3" style={{ background: avatar }} />
      <div className="text-white font-bold text-sm truncate">{name}</div>
      <div className="text-[#b3b3b3] text-xs truncate">@{username}</div>
    </Link>
  )
}

function Section({ title, subtitle, href, children }: { title: string; subtitle?: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-1">
        <div>
          <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer">{title}</h2>
          {subtitle && <div className="text-[#b3b3b3] text-sm mt-1">{subtitle}</div>}
        </div>
        {href && (
          <Link href={href} className="text-[#b3b3b3] text-sm font-bold hover:underline shrink-0 ml-2">
            See all
          </Link>
        )}
      </div>
      <div className="mt-4">{children}</div>
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

function CardCircle({ title, subtitle, cover }: { title: string; subtitle: string; cover: string }) {
  return (
    <button className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-left">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-full shadow-lg" style={{ background: cover }} />
        <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 flex items-center justify-center text-black shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <PlayIcon size={18} />
        </button>
      </div>
      <div className="text-white font-bold text-base truncate mb-1">{title}</div>
      <div className="text-[#b3b3b3] text-sm line-clamp-2 leading-tight">{subtitle}</div>
    </button>
  )
}

function CardSquare({ title, subtitle, cover }: { title: string; subtitle: string; cover: string }) {
  return (
    <button className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-left">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded shadow-lg" style={{ background: cover }} />
        <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 flex items-center justify-center text-black shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <PlayIcon size={18} />
        </button>
      </div>
      <div className="text-white font-bold text-base truncate mb-1">{title}</div>
      <div className="text-[#b3b3b3] text-sm line-clamp-2 leading-tight">{subtitle}</div>
    </button>
  )
}
