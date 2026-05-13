'use client'

import { AppShell } from '@/components/AppShell'
import { TopBar } from '@/components/TopBar'
import { MainContent } from '@/components/MainContent'

export default function Home() {
  return (
    <AppShell>
      <main className="flex-1 flex flex-col rounded-lg overflow-hidden bg-gradient-to-b from-[#1f1f1f] to-[#121212] m-2 mx-0">
        <TopBar />
        <MainContent />
      </main>
    </AppShell>
  )
}
