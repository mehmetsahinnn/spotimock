'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type UIState = {
  friendsOpen: boolean
  toggleFriends: () => void
  eventsOpen: boolean
  toggleEvents: () => void
  closeEvents: () => void
}

const Ctx = createContext<UIState | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [friendsOpen, setFriendsOpen] = useState(true)
  const [eventsOpen, setEventsOpen] = useState(false)

  return (
    <Ctx.Provider
      value={{
        friendsOpen,
        toggleFriends: () => setFriendsOpen(o => !o),
        eventsOpen,
        toggleEvents: () => setEventsOpen(o => !o),
        closeEvents: () => setEventsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export const useUI = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useUI must be inside UIProvider')
  return ctx
}
