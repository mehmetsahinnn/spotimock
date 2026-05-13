'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { friends } from '@/lib/friends-data'
import { loadAllConversations, formatTime, type Message } from '@/lib/messages'
import { ChevronLeftIcon, SearchIcon } from '@/lib/icons'

export default function MessagesListPage() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({})
  const [query, setQuery] = useState('')

  useEffect(() => {
    setConversations(loadAllConversations())
  }, [])

  const friendsWithMessages = friends
    .map(f => {
      const msgs = conversations[f.id] || []
      const last = msgs[msgs.length - 1]
      return { friend: f, lastMessage: last, count: msgs.length }
    })
    .filter(c => c.count > 0)
    .sort((a, b) => (b.lastMessage?.timestamp || 0) - (a.lastMessage?.timestamp || 0))

  const filtered = query
    ? friendsWithMessages.filter(c =>
        c.friend.name.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage?.text.toLowerCase().includes(query.toLowerCase()))
    : friendsWithMessages

  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-gradient-to-b from-[#3a0ca3] via-[#1f1f1f] to-[#121212]">
        <TopBar />
        <div className="px-8 py-6 shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4">
            <ChevronLeftIcon size={20} /> Back to Home
          </Link>
          <h1 className="text-white text-5xl font-black mb-2">Messages</h1>
          <div className="text-white/80 text-sm">{friendsWithMessages.length} conversations</div>

          <div className="relative mt-6 max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]">
              <SearchIcon size={16} />
            </div>
            <input
              type="text"
              placeholder="Search messages"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-[#242424] text-white placeholder:text-[#b3b3b3] text-sm pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 px-4 pb-6">
          <div className="max-w-2xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-[#b3b3b3] text-center py-12">No conversations</div>
            ) : (
              filtered.map(({ friend, lastMessage, count }) => (
                <Link
                  key={friend.id}
                  href={`/messages/${friend.username}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#ffffff10] transition-colors"
                >
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full" style={{ background: friend.avatar }} />
                    {friend.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1ed760] border-2 border-[#121212]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-white text-base font-bold truncate">{friend.name}</span>
                      {lastMessage && (
                        <span className="text-[#b3b3b3] text-xs shrink-0">{formatTime(lastMessage.timestamp)}</span>
                      )}
                    </div>
                    {lastMessage && (
                      <div className="text-[#b3b3b3] text-sm truncate">
                        {lastMessage.from === 'me' && <span className="text-white/60">You: </span>}
                        {lastMessage.text}
                      </div>
                    )}
                  </div>
                  <div className="text-[#b3b3b3] text-xs bg-[#232323] px-2 py-1 rounded-full shrink-0">
                    {count}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </AppShell>
  )
}
