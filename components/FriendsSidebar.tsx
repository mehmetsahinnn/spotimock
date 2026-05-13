'use client'

import Link from 'next/link'
import { useUI } from '@/lib/ui-context'
import { friends } from '@/lib/friends-data'

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MessageIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const MusicDot = () => (
  <span className="inline-block w-1 h-1 rounded-full bg-[#b3b3b3] align-middle mx-1.5" />
)

const formatLastActive = (mins: number): string => {
  if (mins === 0) return 'now'
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.floor(mins / 60)}h`
  return `${Math.floor(mins / 1440)}d`
}

export function FriendsSidebar() {
  const { friendsOpen, toggleFriends } = useUI()

  if (!friendsOpen) return null

  const online = friends.filter(f => f.isOnline)
  const offline = friends.filter(f => !f.isOnline)

  return (
    <aside className="w-[320px] shrink-0 bg-[#121212] rounded-lg m-2 ml-0 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 shrink-0">
        <h2 className="text-white font-bold text-base">Friend Activity</h2>
        <button
          onClick={toggleFriends}
          className="text-[#b3b3b3] hover:text-white transition-colors"
          title="Close"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 px-2 pb-4">
        {online.length > 0 && (
          <>
            <div className="px-3 py-2 text-[#b3b3b3] text-[11px] font-bold uppercase tracking-wider">
              Active Now · {online.length}
            </div>
            {online.map(f => <FriendRow key={f.id} friend={f} />)}
          </>
        )}
        {offline.length > 0 && (
          <>
            <div className="px-3 py-2 mt-3 text-[#b3b3b3] text-[11px] font-bold uppercase tracking-wider">
              Recently Active
            </div>
            {offline.map(f => <FriendRow key={f.id} friend={f} />)}
          </>
        )}
      </div>
    </aside>
  )
}

function FriendRow({ friend }: { friend: typeof friends[0] }) {
  return (
    <div className="group relative w-full px-3 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors">
      <Link href={`/profile/${friend.username}`} className="flex items-start gap-3 cursor-pointer">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-9 h-9 rounded-full"
            style={{ background: friend.avatar }}
          />
          {friend.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#1ed760] border-2 border-[#121212]" />
          )}
        </div>

        {/* Center text — fills remaining space */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-white text-[13px] font-bold truncate group-hover:underline">
              {friend.name}
            </span>
            <span className="text-[#b3b3b3] text-[11px] shrink-0 tabular-nums">
              {friend.isOnline ? 'now' : formatLastActive(friend.lastActiveMinutesAgo)}
            </span>
          </div>
          <div className="text-[#b3b3b3] text-[12px] truncate">
            <span className="text-white">{friend.trackTitle}</span>
            <MusicDot />
            <span>{friend.artist}</span>
          </div>
          {friend.playlist && (
            <div className="text-[#b3b3b3] text-[11px] truncate mt-0.5 opacity-80">
              on {friend.playlist}
            </div>
          )}
        </div>
      </Link>

      {/* Message button — appears on hover, links to chat */}
      <Link
        href={`/messages/${friend.username}`}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-3 bottom-2 w-7 h-7 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 items-center justify-center text-black opacity-0 group-hover:flex transition-all hidden"
        title={`Message ${friend.name}`}
      >
        <MessageIcon size={14} />
      </Link>
    </div>
  )
}
