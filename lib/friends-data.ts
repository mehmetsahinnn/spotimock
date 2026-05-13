export type Friend = {
  id: string
  name: string
  username: string
  avatar: string
  trackTitle: string
  artist: string
  playlist?: string
  lastActiveMinutesAgo: number
  isOnline: boolean
  isFollowing: boolean
}

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 100%)`

export type FriendProfile = {
  bio: string
  joinedYear: number
  playlistsCount: number
  followers: number
  following: number
  topArtists: { name: string; cover: string; plays: number }[]
  recentTracks: { trackId: string }[]
  publicPlaylistIds: string[]
}

export const friendProfiles: Record<string, FriendProfile> = {
  f1: { bio: 'Beat lover · Coffee at midnight', joinedYear: 2019, playlistsCount: 8, followers: 32, following: 67, topArtists: [{ name: 'The Weeknd', cover: grad('#ff0000', '#8b0000'), plays: 420 }, { name: 'Drake', cover: grad('#ffd60a', '#003566'), plays: 210 }, { name: 'Travis Scott', cover: grad('#3a0ca3', '#7209b7'), plays: 180 }, { name: 'Frank Ocean', cover: grad('#06d6a0', '#073b4c'), plays: 142 }], recentTracks: [{ trackId: 't1' }, { trackId: 't6' }, { trackId: 't11' }], publicPlaylistIds: ['p2', 'p4', 'p5'] },
  f2: { bio: 'Pop princess fan since 2008', joinedYear: 2017, playlistsCount: 15, followers: 89, following: 124, topArtists: [{ name: 'Taylor Swift', cover: grad('#4a4e69', '#22223b'), plays: 580 }, { name: 'Olivia Rodrigo', cover: grad('#240046', '#10002b'), plays: 320 }, { name: 'Sabrina Carpenter', cover: grad('#ff9f1c', '#ffbf69'), plays: 180 }, { name: 'Lana Del Rey', cover: grad('#bc6c25', '#dda15e'), plays: 145 }], recentTracks: [{ trackId: 't3' }, { trackId: 't7' }, { trackId: 't9' }], publicPlaylistIds: ['p3', 'p5', 'p8'] },
  f3: { bio: 'Indie / alt rock enjoyer', joinedYear: 2020, playlistsCount: 6, followers: 28, following: 45, topArtists: [{ name: 'Harry Styles', cover: grad('#ff6b9d', '#c44569'), plays: 380 }, { name: 'Arctic Monkeys', cover: grad('#240046', '#5a189a'), plays: 220 }, { name: 'The 1975', cover: grad('#06d6a0', '#073b4c'), plays: 165 }, { name: 'Phoebe Bridgers', cover: grad('#ff006e', '#3a0ca3'), plays: 132 }], recentTracks: [{ trackId: 't2' }, { trackId: 't9' }], publicPlaylistIds: ['p6', 'p7'] },
  f4: { bio: 'Gym rat · always pre-workout mode', joinedYear: 2018, playlistsCount: 4, followers: 51, following: 38, topArtists: [{ name: 'Miley Cyrus', cover: grad('#f6ad55', '#dd6b20'), plays: 290 }, { name: 'Bebe Rexha', cover: grad('#f72585', '#7209b7'), plays: 175 }, { name: 'Dua Lipa', cover: grad('#f72585', '#7209b7'), plays: 168 }], recentTracks: [{ trackId: 't4' }, { trackId: 't11' }, { trackId: 't6' }], publicPlaylistIds: ['p4', 'p2'] },
  f5: { bio: 'R&B and soul · 24/7', joinedYear: 2016, playlistsCount: 22, followers: 156, following: 92, topArtists: [{ name: 'SZA', cover: grad('#06ffa5', '#118ab2'), plays: 510 }, { name: 'Daniel Caesar', cover: grad('#118ab2', '#073b4c'), plays: 245 }, { name: 'H.E.R.', cover: grad('#7209b7', '#3a0ca3'), plays: 198 }], recentTracks: [{ trackId: 't8' }, { trackId: 't5' }], publicPlaylistIds: ['p3', 'p5', 'p7'] },
  f6: { bio: 'Latin pop and chill vibes', joinedYear: 2019, playlistsCount: 11, followers: 73, following: 84, topArtists: [{ name: 'Rema', cover: grad('#00b4d8', '#0077b6'), plays: 230 }, { name: 'Bad Bunny', cover: grad('#fb5607', '#ffbe0b'), plays: 320 }, { name: 'Karol G', cover: grad('#f72585', '#7209b7'), plays: 175 }], recentTracks: [{ trackId: 't5' }, { trackId: 't11' }], publicPlaylistIds: ['p3', 'p4'] },
  f7: { bio: 'New music every Friday', joinedYear: 2021, playlistsCount: 3, followers: 18, following: 56, topArtists: [{ name: 'Olivia Rodrigo', cover: grad('#240046', '#10002b'), plays: 285 }, { name: 'Conan Gray', cover: grad('#ff6b9d', '#c44569'), plays: 142 }], recentTracks: [{ trackId: 't9' }, { trackId: 't3' }], publicPlaylistIds: ['p2', 'p8'] },
  f8: { bio: 'Dance floor reservations only', joinedYear: 2017, playlistsCount: 9, followers: 64, following: 71, topArtists: [{ name: 'Sam Smith', cover: grad('#7209b7', '#3a0ca3'), plays: 198 }, { name: 'Lady Gaga', cover: grad('#ff006e', '#3a0ca3'), plays: 245 }, { name: 'Doja Cat', cover: grad('#d00000', '#9d0208'), plays: 180 }], recentTracks: [{ trackId: 't6' }, { trackId: 't11' }], publicPlaylistIds: ['p5', 'p4'] },
  f9: { bio: 'TikTok music + Y2K nostalgia', joinedYear: 2022, playlistsCount: 5, followers: 22, following: 48, topArtists: [{ name: 'Tate McRae', cover: grad('#ee9b00', '#ca6702'), plays: 165 }, { name: 'Doja Cat', cover: grad('#d00000', '#9d0208'), plays: 140 }], recentTracks: [{ trackId: 't12' }, { trackId: 't11' }], publicPlaylistIds: ['p8', 'p2'] },
  f10: { bio: 'Hip-hop head, vinyl collector', joinedYear: 2015, playlistsCount: 31, followers: 245, following: 102, topArtists: [{ name: 'Doja Cat', cover: grad('#d00000', '#9d0208'), plays: 380 }, { name: 'Kendrick Lamar', cover: grad('#000', '#333'), plays: 425 }, { name: 'Tyler, The Creator', cover: grad('#ff9f1c', '#ffbf69'), plays: 290 }], recentTracks: [{ trackId: 't11' }, { trackId: 't8' }], publicPlaylistIds: ['p4', 'p6', 'p8'] },
}

export const friends: Friend[] = [
  { id: 'f1', name: 'Ahmet Yılmaz', username: 'ahmet.yz', avatar: grad('#1db954', '#191414'), trackTitle: 'Blinding Lights', artist: 'The Weeknd', playlist: 'After Hours', lastActiveMinutesAgo: 0, isOnline: true, isFollowing: true },
  { id: 'f2', name: 'Zeynep Kara', username: 'zeynep_k', avatar: grad('#ff006e', '#3a0ca3'), trackTitle: 'Anti-Hero', artist: 'Taylor Swift', playlist: 'Midnights', lastActiveMinutesAgo: 3, isOnline: true, isFollowing: true },
  { id: 'f3', name: 'Burak Demir', username: 'burakd', avatar: grad('#ff6b9d', '#feca57'), trackTitle: 'As It Was', artist: 'Harry Styles', lastActiveMinutesAgo: 12, isOnline: true, isFollowing: true },
  { id: 'f4', name: 'Elif Şahin', username: 'elif.s', avatar: grad('#00b4d8', '#0077b6'), trackTitle: 'Flowers', artist: 'Miley Cyrus', playlist: 'Workout Beats', lastActiveMinutesAgo: 25, isOnline: false, isFollowing: true },
  { id: 'f5', name: 'Can Öztürk', username: 'canoz', avatar: grad('#7209b7', '#3a0ca3'), trackTitle: 'Kill Bill', artist: 'SZA', lastActiveMinutesAgo: 45, isOnline: false, isFollowing: true },
  { id: 'f6', name: 'Selin Aydın', username: 'selina', avatar: grad('#06d6a0', '#073b4c'), trackTitle: 'Calm Down', artist: 'Rema, Selena Gomez', playlist: 'Chill Mix', lastActiveMinutesAgo: 60, isOnline: false, isFollowing: true },
  { id: 'f7', name: 'Mert Polat', username: 'mertp', avatar: grad('#f72585', '#7209b7'), trackTitle: 'Vampire', artist: 'Olivia Rodrigo', lastActiveMinutesAgo: 90, isOnline: false, isFollowing: false },
  { id: 'f8', name: 'Defne Yıldız', username: 'defne.y', avatar: grad('#ff9f1c', '#ffbf69'), trackTitle: 'Unholy', artist: 'Sam Smith, Kim Petras', playlist: 'Late Night Vibes', lastActiveMinutesAgo: 120, isOnline: false, isFollowing: true },
  { id: 'f9', name: 'Kerem Akın', username: 'keremak', avatar: grad('#0077b6', '#03045e'), trackTitle: 'Greedy', artist: 'Tate McRae', lastActiveMinutesAgo: 180, isOnline: false, isFollowing: false },
  { id: 'f10', name: 'Aylin Tan', username: 'aylin_t', avatar: grad('#e63946', '#a8dadc'), trackTitle: 'Paint The Town Red', artist: 'Doja Cat', lastActiveMinutesAgo: 240, isOnline: false, isFollowing: true },
]

export type PublicPlaylist = {
  id: string
  name: string
  description: string
  cover: string
  trackCount: number
  saves: number
}

export type TopArtist = {
  name: string
  plays: number
  cover: string
  topGenre: string
}

export type RecentArtist = {
  name: string
  cover: string
  lastPlayedDaysAgo: number
}

export const profile = {
  name: 'Mehmet',
  username: 'mehmet.tc',
  bio: 'Music lover · Coffee addict · İstanbul',
  avatar: grad('#9333ea', '#ec4899'),
  followers: 47,
  following: 89,
  playlistsCount: 12,
  joinedYear: 2018,
  topGenres: ['Pop', 'Hip-Hop', 'Indie', 'Electronic', 'R&B'],
  topArtists: [
    { name: 'The Weeknd', plays: 342, cover: grad('#ff0000', '#8b0000'), topGenre: 'R&B' },
    { name: 'Taylor Swift', plays: 287, cover: grad('#4a4e69', '#22223b'), topGenre: 'Pop' },
    { name: 'Harry Styles', plays: 198, cover: grad('#ff6b9d', '#c44569'), topGenre: 'Pop' },
    { name: 'SZA', plays: 156, cover: grad('#06ffa5', '#118ab2'), topGenre: 'R&B' },
    { name: 'Olivia Rodrigo', plays: 142, cover: grad('#240046', '#10002b'), topGenre: 'Pop' },
    { name: 'Doja Cat', plays: 128, cover: grad('#d00000', '#9d0208'), topGenre: 'Hip-Hop' },
  ] as TopArtist[],
  recentArtists: [
    { name: 'Travis Scott', cover: grad('#3a0ca3', '#7209b7'), lastPlayedDaysAgo: 1 },
    { name: 'Billie Eilish', cover: grad('#06d6a0', '#073b4c'), lastPlayedDaysAgo: 2 },
    { name: 'Drake', cover: grad('#ffd60a', '#003566'), lastPlayedDaysAgo: 3 },
    { name: 'Dua Lipa', cover: grad('#f72585', '#7209b7'), lastPlayedDaysAgo: 5 },
    { name: 'Bad Bunny', cover: grad('#fb5607', '#ffbe0b'), lastPlayedDaysAgo: 6 },
    { name: 'Lana Del Rey', cover: grad('#bc6c25', '#dda15e'), lastPlayedDaysAgo: 8 },
  ] as RecentArtist[],
  publicPlaylists: [
    { id: 'pp1', name: 'Late Night Drives', description: 'Solo highway moods', cover: grad('#240046', '#5a189a'), trackCount: 42, saves: 127 },
    { id: 'pp2', name: 'Coffee Shop Vibes', description: 'Background while working', cover: grad('#bc6c25', '#dda15e'), trackCount: 38, saves: 89 },
    { id: 'pp3', name: 'Hype Mode', description: 'Pre-workout energy', cover: grad('#ff006e', '#3a0ca3'), trackCount: 24, saves: 64 },
    { id: 'pp4', name: 'Sunday Reset', description: 'Slow start to the week', cover: grad('#06d6a0', '#073b4c'), trackCount: 31, saves: 52 },
    { id: 'pp5', name: 'Best of 2024', description: 'Year-end favorites', cover: grad('#f72585', '#7209b7'), trackCount: 50, saves: 38 },
  ] as PublicPlaylist[],
  similarGenreTracks: [
    { id: 'sg1', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', cover: grad('#ff0000', '#8b0000') },
    { id: 'sg2', title: 'Bad Habit', artist: 'Steve Lacy', album: 'Gemini Rights', duration: '3:51', cover: grad('#06ffa5', '#118ab2') },
    { id: 'sg3', title: 'Lavender Haze', artist: 'Taylor Swift', album: 'Midnights', duration: '3:22', cover: grad('#4a4e69', '#22223b') },
    { id: 'sg4', title: 'About Damn Time', artist: 'Lizzo', album: 'Special', duration: '3:11', cover: grad('#ffd60a', '#003566') },
    { id: 'sg5', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', cover: grad('#ff6b9d', '#c44569') },
  ],
}
