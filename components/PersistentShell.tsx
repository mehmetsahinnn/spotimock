'use client'

import { ReactNode } from 'react'
import { PlayerProvider } from '@/lib/player-context'
import { UIProvider, useUI } from '@/lib/ui-context'
import { Sidebar } from './Sidebar'
import { Player } from './Player'
import { FriendsSidebar } from './FriendsSidebar'
import { ProfileModals } from './ProfileModals'

export function PersistentShell({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <UIProvider>
        <ShellLayout>{children}</ShellLayout>
      </UIProvider>
    </PlayerProvider>
  )
}

function ShellLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, closeSidebar } = useUI()
  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile drawer backdrop */}
        {sidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
          />
        )}

        {/* Sidebar — drawer on mobile, static on md+ */}
        <div
          className={`fixed z-40 inset-y-0 left-0 md:relative md:translate-x-0 transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar />
        </div>

        {children}

        <FriendsSidebar />
      </div>
      <Player />

      {/* Profile modals (Edit, Settings, Account, Easter egg) */}
      <ProfileModals />

      {/* Hidden YouTube IFrame player */}
      <div style={{ position: 'fixed', left: -9999, top: -9999, width: 1, height: 1, pointerEvents: 'none', opacity: 0 }}>
        <div id="yt-hidden-player" />
      </div>
    </div>
  )
}
