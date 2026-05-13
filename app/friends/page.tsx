'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { friends } from '@/lib/friends-data'
import { ChevronLeftIcon, SearchIcon } from '@/lib/icons'

export default function FriendsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'following' | 'followers'>('all')

  const filtered = friends.filter(f => {
    if (filter === 'following' && !f.isFollowing) return false
    if (query && !f.name.toLowerCase().includes(query.toLowerCase()) && !f.username.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-gradient-to-b from-[#3a0ca3] via-[#1f1f1f] to-[#121212]">
        <TopBar />
        <div className="px-8 py-6 shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4">
            <ChevronLeftIcon size={20} /> Back to Home
          </Link>
          <h1 className="text-white text-5xl font-black mb-2">Friends</h1>
          <div className="text-white/80 text-sm">{friends.length} connections</div>

          <div className="flex gap-2 mt-6">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All ({friends.length})</FilterChip>
            <FilterChip active={filter === 'following'} onClick={() => setFilter('following')}>Following ({friends.filter(f => f.isFollowing).length})</FilterChip>
            <FilterChip active={filter === 'followers'} onClick={() => setFilter('followers')}>Followers</FilterChip>
          </div>

          <div className="relative mt-4 max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]">
              <SearchIcon size={16} />
            </div>
            <input
              type="text"
              placeholder="Search friends"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-[#242424] text-white placeholder:text-[#b3b3b3] text-sm pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 px-8 pb-6">
          {filtered.length === 0 ? (
            <div className="text-[#b3b3b3] text-center py-12">No friends match your filter</div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(f => <FriendCard key={f.id} friend={f} />)}
            </div>
          )}
        </div>
      </main>
    </AppShell>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${active ? 'bg-white text-black' : 'bg-[#232323] text-white hover:bg-[#2a2a2a]'}`}
    >
      {children}
    </button>
  )
}

function FriendCard({ friend }: { friend: typeof friends[0] }) {
  const [following, setFollowing] = useState(friend.isFollowing)

  return (
    <div className="bg-[#181818] hover:bg-[#282828] rounded-lg p-5 transition-colors">
      <Link href={`/profile/${friend.username}`} className="flex items-start gap-4 cursor-pointer">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full" style={{ background: friend.avatar }} />
          {friend.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1ed760] border-2 border-[#181818]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-white text-base font-bold truncate hover:underline">{friend.name}</div>
          <div className="text-[#b3b3b3] text-xs mb-2">@{friend.username}</div>
          <div className="text-[#b3b3b3] text-xs">
            {friend.isOnline ? (
              <span className="text-[#1ed760]">● Listening now</span>
            ) : (
              <span>Last seen {formatTime(friend.lastActiveMinutesAgo)}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4 p-3 bg-[#0f0f0f] rounded-md">
        <div className="flex items-center gap-2 text-[#b3b3b3] text-[10px] font-bold uppercase tracking-widest mb-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 17V5l12-2v12" /><circle cx="6" cy="17" r="3" /><circle cx="18" cy="15" r="3" /></svg>
          {friend.isOnline ? 'Playing' : 'Last played'}
        </div>
        <div className="text-white text-sm font-medium truncate">{friend.trackTitle}</div>
        <div className="text-[#b3b3b3] text-xs truncate">{friend.artist}</div>
        {friend.playlist && <div className="text-[#b3b3b3] text-xs mt-1">on {friend.playlist}</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setFollowing(f => !f)}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-colors ${following ? 'border border-[#727272] hover:border-white text-white' : 'bg-white hover:scale-105 text-black'}`}
        >
          {following ? 'Following' : 'Follow'}
        </button>
        <Link
          href={`/messages/${friend.username}`}
          className="flex-1 py-1.5 text-xs font-bold rounded-full border border-[#727272] hover:border-white text-white transition-colors text-center"
        >
          Message
        </Link>
      </div>
    </div>
  )
}

function formatTime(mins: number): string {
  if (mins < 60) return `${mins} min ago`
  if (mins < 1440) return `${Math.floor(mins / 60)} hr ago`
  return `${Math.floor(mins / 1440)} d ago`
}
