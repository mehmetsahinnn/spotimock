'use client'

export type Message = {
  id: string
  from: 'me' | 'friend'
  text: string
  timestamp: number
}

export type Conversation = {
  friendId: string
  messages: Message[]
}

const STORAGE_KEY = 'spotify-mock-messages-v1'

const seedConversations: Record<string, Message[]> = {
  f1: [
    { id: 'm1', from: 'friend', text: 'Yo, did you hear the new Weeknd track?', timestamp: Date.now() - 3600_000 },
    { id: 'm2', from: 'me', text: 'Yeah it slaps. On repeat all morning.', timestamp: Date.now() - 3500_000 },
    { id: 'm3', from: 'friend', text: 'Saving it to my After Hours playlist now', timestamp: Date.now() - 3400_000 },
  ],
  f2: [
    { id: 'm1', from: 'friend', text: 'Have you listened to Anti-Hero yet?', timestamp: Date.now() - 7200_000 },
    { id: 'm2', from: 'me', text: 'Listening right now actually', timestamp: Date.now() - 7100_000 },
    { id: 'm3', from: 'friend', text: 'OMG the bridge is everything 😭', timestamp: Date.now() - 7000_000 },
  ],
  f3: [
    { id: 'm1', from: 'friend', text: 'Concert next month?', timestamp: Date.now() - 86400_000 },
  ],
  f5: [
    { id: 'm1', from: 'me', text: 'New SZA album is fire', timestamp: Date.now() - 172800_000 },
    { id: 'm2', from: 'friend', text: 'Yes! Kill Bill is my fav', timestamp: Date.now() - 172700_000 },
  ],
}

export function loadMessages(friendId: string): Message[] {
  if (typeof window === 'undefined') return seedConversations[friendId] || []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, Message[]>
      return parsed[friendId] || []
    }
  } catch {}
  return seedConversations[friendId] || []
}

export function saveMessages(friendId: string, messages: Message[]): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: Record<string, Message[]> = raw ? JSON.parse(raw) : {}
    all[friendId] = messages
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {}
}

export function loadAllConversations(): Record<string, Message[]> {
  if (typeof window === 'undefined') return seedConversations
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const stored = JSON.parse(raw) as Record<string, Message[]>
      return { ...seedConversations, ...stored }
    }
  } catch {}
  return seedConversations
}

export function formatTime(ts: number): string {
  const date = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  return `${days}d`
}

export function formatFullTime(ts: number): string {
  const date = new Date(ts)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}
