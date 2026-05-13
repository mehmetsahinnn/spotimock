'use client'

import { use, useEffect, useRef, useState, FormEvent } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { friends } from '@/lib/friends-data'
import { loadMessages, saveMessages, formatFullTime, type Message } from '@/lib/messages'
import { ChevronLeftIcon } from '@/lib/icons'

export default function ChatPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const friend = friends.find(f => f.username === username)
  if (!friend) notFound()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMessages(loadMessages(friend.id))
  }, [friend.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const newMsg: Message = {
      id: `m${Date.now()}`,
      from: 'me',
      text,
      timestamp: Date.now(),
    }
    const updated = [...messages, newMsg]
    setMessages(updated)
    saveMessages(friend.id, updated)
    setInput('')

    // Simulate friend reply after 1-2s
    setTimeout(() => {
      const replies = [
        'Nice!',
        'Haha for real',
        '👀',
        'Let me check it out',
        'I love that one',
        'Adding to my playlist',
        'Sending you a track now',
        'Yeah I agree 💯',
      ]
      const reply: Message = {
        id: `m${Date.now()}r`,
        from: 'friend',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: Date.now(),
      }
      const withReply = [...updated, reply]
      setMessages(withReply)
      saveMessages(friend.id, withReply)
    }, 1200 + Math.random() * 800)
  }

  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-[#121212]">
        <TopBar />

        {/* Chat header */}
        <div className="flex items-center gap-3 px-6 py-3 shrink-0 border-b border-[#2a2a2a] bg-[#181818]">
          <Link
            href="/messages"
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <ChevronLeftIcon size={22} />
          </Link>
          <Link
            href={`/profile/${friend.username}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1"
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full" style={{ background: friend.avatar }} />
              {friend.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#1ed760] border-2 border-[#181818]" />
              )}
            </div>
            <div>
              <div className="text-white text-sm font-bold">{friend.name}</div>
              <div className="text-[#b3b3b3] text-xs">
                {friend.isOnline ? <span className="text-[#1ed760]">Online</span> : `Last seen ${Math.floor(friend.lastActiveMinutesAgo / 60)}h ago`}
              </div>
            </div>
          </Link>
        </div>

        {/* Messages */}
        <div className="overflow-y-auto custom-scrollbar flex-1 px-6 py-4">
          <div className="max-w-2xl mx-auto space-y-1">
            {messages.map((m, i) => {
              const prev = messages[i - 1]
              const grouped = prev && prev.from === m.from && m.timestamp - prev.timestamp < 300_000
              return (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} ${grouped ? '' : 'mt-3'}`}>
                  <div className="flex flex-col max-w-[70%]">
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        m.from === 'me'
                          ? 'bg-[#1ed760] text-black rounded-br-sm'
                          : 'bg-[#282828] text-white rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className={`text-[10px] text-[#b3b3b3] mt-1 ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                      {formatFullTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <form onSubmit={send} className="px-6 py-4 shrink-0 border-t border-[#2a2a2a] bg-[#181818]">
          <div className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Message ${friend.name}…`}
              className="flex-1 bg-[#242424] text-white placeholder:text-[#b3b3b3] text-sm px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2 bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 text-black text-sm font-bold rounded-full transition-all"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </AppShell>
  )
}
