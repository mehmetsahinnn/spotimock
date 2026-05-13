'use client'

import { ReactNode } from 'react'
import { PlayerProvider } from '@/lib/player-context'
import { UIProvider } from '@/lib/ui-context'
import { Sidebar } from './Sidebar'
import { Player } from './Player'
import { FriendsSidebar } from './FriendsSidebar'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <PlayerProvider>
      <UIProvider>
        <div className="h-screen flex flex-col bg-black overflow-hidden">
          <div className="flex flex-1 min-h-0">
            <Sidebar />
            {children}
            <FriendsSidebar />
          </div>
          <Player />
          {/* Hidden YouTube IFrame player */}
          <div style={{ position: 'fixed', left: -9999, top: -9999, width: 1, height: 1, pointerEvents: 'none', opacity: 0 }}>
            <div id="yt-hidden-player" />
          </div>
        </div>
      </UIProvider>
    </PlayerProvider>
  )
}
