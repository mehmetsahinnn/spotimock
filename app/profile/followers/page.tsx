'use client'

import Link from 'next/link'
import { TopBar } from '@/components/TopBar'
import { friends, profile } from '@/lib/friends-data'
import { ChevronLeftIcon } from '@/lib/icons'

export default function FollowersPage() {
  // All friends + a few extra mock followers
  const extraFollowers = [
    { id: 'ef1', name: 'Yusuf Çelik', username: 'yusufc', avatar: 'linear-gradient(135deg,#f72585 0%,#3a0ca3 100%)' },
    { id: 'ef2', name: 'Ayşe Kaya', username: 'aysek', avatar: 'linear-gradient(135deg,#06d6a0 0%,#118ab2 100%)' },
    { id: 'ef3', name: 'Murat Arslan', username: 'muratars', avatar: 'linear-gradient(135deg,#ff9f1c 0%,#ffbf69 100%)' },
    { id: 'ef4', name: 'Ece Bayram', username: 'eceb', avatar: 'linear-gradient(135deg,#7209b7 0%,#3a0ca3 100%)' },
    { id: 'ef5', name: 'Onur Doğan', username: 'onurd', avatar: 'linear-gradient(135deg,#00b4d8 0%,#0077b6 100%)' },
    { id: 'ef6', name: 'İrem Yıldız', username: 'iremy', avatar: 'linear-gradient(135deg,#ff006e 0%,#fb5607 100%)' },
  ]

  return (
    <main className="flex-1 flex flex-col rounded-lg overflow-hidden m-2 mx-0 bg-gradient-to-b from-[#7c3aed]/30 via-[#1f1f1f] to-[#121212]">
      <TopBar />
      <div className="px-4 sm:px-8 py-6 shrink-0">
        <Link href="/profile" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4">
          <ChevronLeftIcon size={20} /> Back to Profile
        </Link>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-2">Followers</h1>
        <div className="text-white/80 text-sm">{profile.followers} people follow you</div>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 px-4 sm:px-8 pb-6">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {friends.map(f => (
            <Link key={f.id} href={`/profile/${f.username}`} className="bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-colors text-center">
              <div className="w-full aspect-square rounded-full mb-3" style={{ background: f.avatar }} />
              <div className="text-white text-sm font-bold truncate">{f.name}</div>
              <div className="text-[#b3b3b3] text-xs truncate">@{f.username}</div>
            </Link>
          ))}
          {extraFollowers.map(f => (
            <div key={f.id} className="bg-[#181818] p-4 rounded-md text-center opacity-60">
              <div className="w-full aspect-square rounded-full mb-3" style={{ background: f.avatar }} />
              <div className="text-white text-sm font-bold truncate">{f.name}</div>
              <div className="text-[#b3b3b3] text-xs truncate">@{f.username}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
