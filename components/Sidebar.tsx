'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon } from '@/lib/icons'
import { playlists } from '@/lib/data'

const UsersIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const MessageIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

type Filter = 'all' | 'playlists' | 'albums' | 'artists'
type Sort = 'recents' | 'alpha' | 'creator'

export function Sidebar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isSearch = pathname.startsWith('/search')
  const isFriends = pathname === '/friends'
  const isMessages = pathname.startsWith('/messages')

  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('recents')
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const visible = playlists
    .filter(p => {
      if (filter === 'playlists' || filter === 'all') return true
      if (filter === 'albums') return p.owner === 'Spotify'
      if (filter === 'artists') return false
      return true
    })
    .filter(p => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q)
    })

  const sorted = [...visible].sort((a, b) => {
    if (sort === 'alpha') return a.name.localeCompare(b.name)
    if (sort === 'creator') return a.owner.localeCompare(b.owner)
    return 0
  })

  const nextSort = () => setSort(s => s === 'recents' ? 'alpha' : s === 'alpha' ? 'creator' : 'recents')
  const sortLabel = sort === 'recents' ? 'Recents' : sort === 'alpha' ? 'Alphabetical' : 'Creator'

  return (
    <aside className="w-[340px] flex flex-col gap-2 p-2 shrink-0">
      <div className="bg-[#121212] rounded-lg p-2">
        <Link
          href="/"
          className={`flex items-center gap-5 w-full px-5 py-3 rounded-md transition-colors ${isHome ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <HomeIcon size={24} filled={isHome} />
          <span className="font-bold text-[15px]">Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex items-center gap-5 w-full px-5 py-3 rounded-md transition-colors ${isSearch ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <SearchIcon size={24} />
          <span className="font-bold text-[15px]">Search</span>
        </Link>
        <Link
          href="/friends"
          className={`flex items-center gap-5 w-full px-5 py-3 rounded-md transition-colors ${isFriends ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <UsersIcon size={24} />
          <span className="font-bold text-[15px]">Friends</span>
        </Link>
        <Link
          href="/messages"
          className={`flex items-center gap-5 w-full px-5 py-3 rounded-md transition-colors ${isMessages ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <MessageIcon size={24} />
          <span className="font-bold text-[15px]">Messages</span>
        </Link>
      </div>

      <div className="bg-[#121212] rounded-lg flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <Link href="/" className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors group">
            <LibraryIcon size={24} />
            <span className="font-bold text-[15px]">Your Library</span>
          </Link>
          <button
            onClick={() => alert('Create playlist — coming soon')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            title="Create playlist"
          >
            <PlusIcon size={16} />
          </button>
        </div>

        <div className="flex gap-2 px-4 pb-3 shrink-0 overflow-x-auto">
          <Chip active={filter === 'playlists'} onClick={() => setFilter(f => f === 'playlists' ? 'all' : 'playlists')}>Playlists</Chip>
          <Chip active={filter === 'albums'} onClick={() => setFilter(f => f === 'albums' ? 'all' : 'albums')}>Albums</Chip>
          <Chip active={filter === 'artists'} onClick={() => setFilter(f => f === 'artists' ? 'all' : 'artists')}>Artists</Chip>
        </div>

        <div className="flex items-center justify-between px-4 pb-2 shrink-0 gap-2">
          {searchOpen ? (
            <input
              autoFocus
              type="text"
              placeholder="Search in Your Library"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onBlur={() => { if (!search) setSearchOpen(false) }}
              className="flex-1 bg-[#242424] text-white placeholder:text-[#b3b3b3] text-xs px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
            />
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-[#b3b3b3] hover:text-white" title="Search">
              <SearchIcon size={16} />
            </button>
          )}
          <button onClick={nextSort} className="text-[#b3b3b3] hover:text-white text-xs font-medium shrink-0" title="Sort">
            {sortLabel}
          </button>
        </div>

        <div className="overflow-y-auto px-2 pb-2 flex-1 custom-scrollbar">
          {sorted.length === 0 ? (
            <div className="text-[#b3b3b3] text-xs px-3 py-4">No matches</div>
          ) : sorted.map(p => (
            <Link
              key={p.id}
              href={`/playlist/${p.id}`}
              className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#1a1a1a] transition-colors text-left group"
            >
              <div
                className="w-12 h-12 rounded shrink-0 flex items-center justify-center text-white font-bold text-lg"
                style={{ background: p.cover }}
              >
                {p.id === 'p1' && '♥'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-[15px] font-normal truncate">{p.name}</div>
                <div className="text-[#b3b3b3] text-[13px] truncate">
                  Playlist · {p.owner}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
        active ? 'bg-white text-black' : 'bg-[#232323] hover:bg-[#2a2a2a] text-white'
      }`}
    >
      {children}
    </button>
  )
}
