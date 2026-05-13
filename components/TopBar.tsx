'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/icons'
import { profile } from '@/lib/friends-data'
import { useUI } from '@/lib/ui-context'
import { UpcomingEventsButton } from './UpcomingEventsPopup'

const FriendsActivityIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { friendsOpen, toggleFriends } = useUI()
  const router = useRouter()

  return (
    <div className="flex items-center justify-between px-6 py-3 shrink-0 relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:scale-105 transition-transform"
          title="Back"
        >
          <ChevronLeftIcon size={22} />
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:scale-105 transition-transform"
          title="Forward"
        >
          <ChevronRightIcon size={22} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform">
          Explore Premium
        </button>
        <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3z" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          Install App
        </button>

        {/* Friend Activity toggle */}
        <button
          onClick={toggleFriends}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all relative ${friendsOpen ? 'bg-[#1ed760] text-black' : 'bg-black text-white hover:scale-105'}`}
          title="Friend Activity"
        >
          <FriendsActivityIcon size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1ed760] border-2 border-black rounded-full" />
        </button>

        {/* Upcoming Events popup */}
        <UpcomingEventsButton />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(m => !m)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-transform"
            style={{ background: profile.avatar }}
          >
            M
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-10 w-48 bg-[#282828] rounded-md shadow-2xl py-1 z-20">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-white hover:bg-[#3e3e3e] transition-colors"
                >
                  Profile
                </Link>
                <button className="w-full text-left px-3 py-2.5 text-sm text-white hover:bg-[#3e3e3e] transition-colors">
                  Account
                </button>
                <button className="w-full text-left px-3 py-2.5 text-sm text-white hover:bg-[#3e3e3e] transition-colors">
                  Settings
                </button>
                <div className="border-t border-[#3e3e3e] my-1" />
                <button className="w-full text-left px-3 py-2.5 text-sm text-white hover:bg-[#3e3e3e] transition-colors">
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
