'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type UIState = {
  friendsOpen: boolean
  toggleFriends: () => void
  eventsOpen: boolean
  toggleEvents: () => void
  closeEvents: () => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  editProfileOpen: boolean
  openEditProfile: () => void
  closeEditProfile: () => void
  settingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  accountOpen: boolean
  openAccount: () => void
  closeAccount: () => void
  easterEggOpen: boolean
  openEasterEgg: () => void
  closeEasterEgg: () => void
}

const Ctx = createContext<UIState | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [friendsOpen, setFriendsOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [easterEggOpen, setEasterEggOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => {
      if (window.innerWidth >= 1024) setFriendsOpen(true)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Ctx.Provider
      value={{
        friendsOpen,
        toggleFriends: () => setFriendsOpen(o => !o),
        eventsOpen,
        toggleEvents: () => setEventsOpen(o => !o),
        closeEvents: () => setEventsOpen(false),
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen(o => !o),
        closeSidebar: () => setSidebarOpen(false),
        editProfileOpen,
        openEditProfile: () => setEditProfileOpen(true),
        closeEditProfile: () => setEditProfileOpen(false),
        settingsOpen,
        openSettings: () => setSettingsOpen(true),
        closeSettings: () => setSettingsOpen(false),
        accountOpen,
        openAccount: () => setAccountOpen(true),
        closeAccount: () => setAccountOpen(false),
        easterEggOpen,
        openEasterEgg: () => setEasterEggOpen(true),
        closeEasterEgg: () => setEasterEggOpen(false),
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
