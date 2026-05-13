'use client'

import { useState } from 'react'
import { useUI } from '@/lib/ui-context'
import { upcomingEvents } from '@/lib/events-data'

const CalendarIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 2v3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M16 2v3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

const PinIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
)

export function UpcomingEventsButton() {
  const { eventsOpen, toggleEvents, closeEvents } = useUI()
  const interestedCount = upcomingEvents.filter(e => e.isInterested).length

  return (
    <div className="relative">
      <button
        onClick={toggleEvents}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all relative ${eventsOpen ? 'bg-[#1ed760] text-black' : 'bg-black text-white hover:scale-105'}`}
        title="Upcoming Events"
      >
        <CalendarIcon size={16} />
        {interestedCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#1ed760] text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
            {interestedCount}
          </span>
        )}
      </button>

      {eventsOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={closeEvents} />
          <EventsPopup />
        </>
      )}
    </div>
  )
}

function EventsPopup() {
  const [filter, setFilter] = useState<'all' | 'interested'>('all')

  const list = filter === 'interested'
    ? upcomingEvents.filter(e => e.isInterested)
    : upcomingEvents

  return (
    <div className="absolute right-0 top-10 w-[380px] bg-[#1a1a1a] rounded-lg shadow-2xl z-40 overflow-hidden border border-[#2a2a2a]">
      <div className="px-4 py-3 border-b border-[#2a2a2a] flex items-center justify-between">
        <h3 className="text-white font-bold text-base">Upcoming Events</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${filter === 'all' ? 'bg-white text-black' : 'bg-[#232323] text-[#b3b3b3] hover:text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('interested')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${filter === 'interested' ? 'bg-white text-black' : 'bg-[#232323] text-[#b3b3b3] hover:text-white'}`}
          >
            Interested
          </button>
        </div>
      </div>

      <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
        {list.length === 0 ? (
          <div className="text-[#b3b3b3] text-sm text-center py-12">No events</div>
        ) : (
          <div className="p-2">
            {list.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-[#2a2a2a]">
        <button className="text-[#1ed760] text-xs font-bold hover:underline">
          See all events near you →
        </button>
      </div>
    </div>
  )
}

function EventCard({ event }: { event: typeof upcomingEvents[0] }) {
  const [interested, setInterested] = useState(event.isInterested)

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#252525] transition-colors group">
      <div className="w-12 flex flex-col items-center shrink-0">
        <div className="text-[#1ed760] text-[10px] font-bold tracking-wider">{event.monthShort}</div>
        <div className="text-white text-xl font-black leading-none">{event.dayShort}</div>
      </div>

      <div
        className="w-12 h-12 rounded-full shrink-0"
        style={{ background: event.artistCover }}
      />

      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-bold truncate">{event.artistName}</div>
        <div className="text-[#b3b3b3] text-xs truncate">{event.venue}</div>
        <div className="text-[#b3b3b3] text-[11px] flex items-center gap-1 mt-0.5">
          <PinIcon size={10} /> {event.city}
        </div>
      </div>

      <button
        onClick={() => setInterested(i => !i)}
        className={`p-1.5 rounded-full transition-colors ${interested ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
        title={interested ? 'Remove interest' : 'Mark interested'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={interested ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    </div>
  )
}
