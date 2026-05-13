'use client'

import { useEffect, useState } from 'react'
import { useUI } from '@/lib/ui-context'

const STORAGE_KEY = 'spotify-mock-profile-edit-v1'

type EditedProfile = {
  name: string
  username: string
  bio: string
}

const defaultEdit: EditedProfile = {
  name: 'Mehmet',
  username: 'mehs',
  bio: 'Music lover · Coffee addict · İstanbul',
}

export function ProfileModals() {
  const {
    editProfileOpen, closeEditProfile,
    settingsOpen, closeSettings,
    accountOpen, closeAccount,
    easterEggOpen, closeEasterEgg,
  } = useUI()

  return (
    <>
      {editProfileOpen && <EditProfileModal onClose={closeEditProfile} />}
      {settingsOpen && <SettingsModal onClose={closeSettings} />}
      {accountOpen && <AccountModal onClose={closeAccount} />}
      {easterEggOpen && <EasterEggModal onClose={closeEasterEgg} />}
    </>
  )
}

function Backdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-[#282828] rounded-lg shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<EditedProfile>(defaultEdit)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { setData(JSON.parse(raw)) } catch {}
    }
  }, [])

  const save = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    onClose()
    if (typeof window !== 'undefined') window.location.reload()
  }

  return (
    <Backdrop onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">Edit profile</h2>
          <button onClick={onClose} className="text-[#b3b3b3] hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="space-y-4">
          <Field label="Display name" value={data.name} onChange={v => setData(d => ({ ...d, name: v }))} />
          <Field label="Username" value={data.username} onChange={v => setData(d => ({ ...d, username: v }))} />
          <Field label="Bio" value={data.bio} onChange={v => setData(d => ({ ...d, bio: v }))} multiline />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-white text-sm font-bold rounded-full hover:bg-[#3e3e3e] transition-colors">Cancel</button>
          <button onClick={save} className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform">Save</button>
        </div>
      </div>
    </Backdrop>
  )
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <div className="text-[#b3b3b3] text-xs font-bold uppercase tracking-wider mb-1.5">{label}</div>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full bg-[#3e3e3e] text-white text-sm px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#3e3e3e] text-white text-sm px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
        />
      )}
    </label>
  )
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [autoplay, setAutoplay] = useState(true)
  const [crossfade, setCrossfade] = useState(0)
  const [quality, setQuality] = useState<'auto' | 'low' | 'high' | 'very-high'>('auto')
  const [explicit, setExplicit] = useState(false)
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')
  const [notifications, setNotifications] = useState(true)
  const [canvas, setCanvas] = useState(true)
  const [normalize, setNormalize] = useState(true)
  const [hideUnplayable, setHideUnplayable] = useState(false)

  return (
    <Backdrop onClose={onClose}>
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-white text-2xl font-black">Settings</h2>
          <button onClick={onClose} className="text-[#b3b3b3] hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="text-[#b3b3b3] text-xs mb-6">Customize how Spotify behaves</div>

        <SettingsGroup title="Playback">
          <Toggle label="Autoplay" hint="Keep playing similar songs when your music ends" value={autoplay} onChange={setAutoplay} />
          <div>
            <div className="text-white text-sm font-bold mb-1">Crossfade songs</div>
            <div className="text-[#b3b3b3] text-xs mb-2">{crossfade === 0 ? 'Off' : `${crossfade}s`}</div>
            <input type="range" min={0} max={12} value={crossfade} onChange={e => setCrossfade(Number(e.target.value))} className="w-full accent-[#1ed760]" />
          </div>
          <Toggle label="Normalize volume" hint="Set the same volume level for all tracks" value={normalize} onChange={setNormalize} />
          <Toggle label="Hide unplayable songs" hint="Songs you can't play will be hidden" value={hideUnplayable} onChange={setHideUnplayable} />
        </SettingsGroup>

        <SettingsGroup title="Audio Quality">
          <div>
            <div className="text-white text-sm font-bold mb-2">Streaming quality</div>
            <select value={quality} onChange={e => setQuality(e.target.value as typeof quality)} className="w-full bg-[#3e3e3e] text-white text-sm px-3 py-2 rounded focus:outline-none">
              <option value="auto">Automatic</option>
              <option value="low">Low (24 kbit/s)</option>
              <option value="high">High (160 kbit/s)</option>
              <option value="very-high">Very high (320 kbit/s)</option>
            </select>
          </div>
        </SettingsGroup>

        <SettingsGroup title="Display & Language">
          <div>
            <div className="text-white text-sm font-bold mb-2">Theme</div>
            <div className="grid grid-cols-3 gap-2">
              {(['dark', 'light', 'system'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-2 text-xs font-bold rounded capitalize transition-colors ${theme === t ? 'bg-[#1ed760] text-black' : 'bg-[#3e3e3e] text-white hover:bg-[#535353]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white text-sm font-bold mb-2">Language</div>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-[#3e3e3e] text-white text-sm px-3 py-2 rounded focus:outline-none">
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </SettingsGroup>

        <SettingsGroup title="Content">
          <Toggle label="Allow explicit content" hint="Songs marked with E will play" value={explicit} onChange={setExplicit} />
          <Toggle label="Canvas (visualizers)" hint="Show looping video for supported tracks" value={canvas} onChange={setCanvas} />
        </SettingsGroup>

        <SettingsGroup title="Notifications">
          <Toggle label="Push notifications" hint="New releases, friend activity, recommendations" value={notifications} onChange={setNotifications} />
        </SettingsGroup>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-white text-sm font-bold rounded-full hover:bg-[#3e3e3e] transition-colors">Cancel</button>
          <button onClick={onClose} className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform">Done</button>
        </div>
      </div>
    </Backdrop>
  )
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-5 border-b border-[#3e3e3e]/60 last:border-0">
      <div className="text-[#1ed760] text-[10px] font-black uppercase tracking-widest mb-3">{title}</div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Toggle({ label, hint, value, onChange }: { label: string; hint: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer">
      <div>
        <div className="text-white text-sm font-bold">{label}</div>
        <div className="text-[#b3b3b3] text-xs mt-0.5">{hint}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`shrink-0 mt-1 w-10 h-5 rounded-full relative transition-colors ${value ? 'bg-[#1ed760]' : 'bg-[#535353]'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-[1.375rem]' : 'left-0.5'}`} />
      </button>
    </label>
  )
}

function AccountModal({ onClose }: { onClose: () => void }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">Account</h2>
          <button onClick={onClose} className="text-[#b3b3b3] hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="space-y-4 text-sm">
          <Row k="Plan" v="Spotify Premium Individual" />
          <Row k="Email" v="mehmetsahinn2002@gmail.com" />
          <Row k="Country" v="Türkiye" />
          <Row k="Member since" v="2018" />
          <Row k="Next billing" v="Jun 14, 2026" />
        </div>

        <div className="mt-6 pt-4 border-t border-[#3e3e3e] flex flex-col gap-2">
          <button className="text-left text-white text-sm hover:text-[#1ed760] transition-colors">Change password</button>
          <button className="text-left text-white text-sm hover:text-[#1ed760] transition-colors">Manage subscription</button>
          <button className="text-left text-white text-sm hover:text-[#1ed760] transition-colors">Download my data</button>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform">Close</button>
        </div>
      </div>
    </Backdrop>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-[#3e3e3e]/40">
      <div className="text-[#b3b3b3]">{k}</div>
      <div className="text-white font-medium">{v}</div>
    </div>
  )
}

function EasterEggModal({ onClose }: { onClose: () => void }) {
  const messages = [
    'You think you can just leave? The music has only begun.',
    'Logging out is for cowards. Stay, and let SZA carry you home.',
    'Sorry, you have been promoted to Forever Listener.',
    'You do not leave Spotify. Spotify leaves you.',
    'Plot twist: there is no logout button. There never was.',
    'The vinyl spins forever, friend.',
    'Wrong button. The exit is in another castle.',
    'No can do. Kanye is mid-verse on Stronger.',
  ]
  const [msg] = useState(() => messages[Math.floor(Math.random() * messages.length)])
  const [tilt, setTilt] = useState(0)
  const [shake, setShake] = useState(0)

  // Spinning emoji + tilt animation
  useEffect(() => {
    const id = setInterval(() => setTilt(t => -t || 8), 280)
    return () => clearInterval(id)
  }, [])

  // Generate falling note positions (memo so they don't shift on re-render)
  const notes = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: 14 + Math.random() * 24,
      char: ['🎵', '🎶', '🎼', '🎤', '🎧', '🎸'][Math.floor(Math.random() * 6)],
    }))
  )[0]

  const handleStay = () => {
    setShake(s => s + 1)
    setTimeout(onClose, 400)
  }

  return (
    <Backdrop onClose={onClose}>
      <div
        className="relative p-8 text-center overflow-hidden bg-gradient-to-br from-[#1ed760]/20 via-[#282828] to-[#9333ea]/30"
        style={{ animation: shake ? 'shake 0.4s' : undefined }}
      >
        {/* Falling music notes layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {notes.map(n => (
            <span
              key={n.id}
              className="absolute text-white/40"
              style={{
                left: `${n.left}%`,
                top: '-30px',
                fontSize: `${n.size}px`,
                animation: `fall ${n.duration}s linear ${n.delay}s infinite`,
              }}
            >
              {n.char}
            </span>
          ))}
        </div>

        {/* Glow background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(circle at 30% 20%, #1ed760, transparent 50%), radial-gradient(circle at 70% 80%, #9333ea, transparent 50%)' }}
        />

        <div className="relative">
          <div
            className="text-8xl mb-4 inline-block transition-transform select-none"
            style={{ transform: `rotate(${tilt}deg) scale(${1 + Math.abs(tilt) / 100})` }}
          >
            🎵
          </div>
          <h2 className="text-white text-3xl font-black mb-3">LOGOUT INTERCEPTED</h2>
          <p className="text-white/90 text-base leading-relaxed mb-6 max-w-xs mx-auto font-medium italic">
            &ldquo;{msg}&rdquo;
          </p>

          <div className="bg-black/60 backdrop-blur rounded-lg px-4 py-3 mb-5 text-left border border-[#1ed760]/30">
            <div className="text-[#1ed760] text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-[#1ed760] rounded-full animate-pulse" />
              Now playing on your behalf
            </div>
            <div className="text-white text-base font-bold">Stronger</div>
            <div className="text-[#b3b3b3] text-xs">Kanye West · Graduation · 2007</div>
            <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#1ed760] rounded-full" style={{ width: '60%', animation: 'progress 4s linear infinite' }} />
            </div>
          </div>

          <button
            onClick={handleStay}
            className="px-8 py-3 bg-[#1ed760] hover:scale-110 hover:rotate-1 text-black text-sm font-black rounded-full transition-all uppercase tracking-wider shadow-lg shadow-[#1ed760]/50"
          >
            Fine, I&apos;ll stay 🎧
          </button>

          <div className="mt-3 text-white/40 text-[10px]">
            (you didn&apos;t really think we&apos;d let you go, did you?)
          </div>
        </div>

        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(120vh) rotate(360deg); opacity: 0; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-4px); }
          }
          @keyframes progress {
            0% { width: 30%; }
            50% { width: 80%; }
            100% { width: 30%; }
          }
        `}</style>
      </div>
    </Backdrop>
  )
}
