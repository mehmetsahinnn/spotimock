export type Track = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  durationSec: number
  cover: string
  youtubeId: string
}

export type Playlist = {
  id: string
  name: string
  description: string
  cover: string
  owner: string
  trackCount: number
  trackIds: string[]
}

export type Album = {
  id: string
  title: string
  artist: string
  cover: string
  year: number
  playlistId: string
}

const gradient = (a: string, b: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 100%)`

export const tracks: Track[] = [
  { id: 't1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', durationSec: 200, cover: gradient('#ff0000', '#8b0000'), youtubeId: '4NRXx6U8ABQ' },
  { id: 't2', title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: '2:47', durationSec: 167, cover: gradient('#ff6b9d', '#c44569'), youtubeId: 'H5v3kku4y6Q' },
  { id: 't3', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:21', durationSec: 201, cover: gradient('#4a4e69', '#22223b'), youtubeId: 'b1kbLwvqugk' },
  { id: 't4', title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', duration: '3:20', durationSec: 200, cover: gradient('#f6ad55', '#dd6b20'), youtubeId: 'G7KNmW9a75Y' },
  { id: 't5', title: 'Calm Down', artist: 'Rema, Selena Gomez', album: 'Rave & Roses', duration: '3:59', durationSec: 239, cover: gradient('#00b4d8', '#0077b6'), youtubeId: 'WcIcVapfqXw' },
  { id: 't6', title: 'Unholy', artist: 'Sam Smith, Kim Petras', album: 'Gloria', duration: '2:36', durationSec: 156, cover: gradient('#7209b7', '#3a0ca3'), youtubeId: 'Uq9gPaIzbe8' },
  { id: 't7', title: 'Cruel Summer', artist: 'Taylor Swift', album: 'Lover', duration: '2:58', durationSec: 178, cover: gradient('#ff006e', '#fb5607'), youtubeId: 'ic8j13piAhQ' },
  { id: 't8', title: 'Kill Bill', artist: 'SZA', album: 'SOS', duration: '2:34', durationSec: 154, cover: gradient('#06ffa5', '#118ab2'), youtubeId: 'Zr5VqQGRNL0' },
  { id: 't9', title: 'Vampire', artist: 'Olivia Rodrigo', album: 'GUTS', duration: '3:39', durationSec: 219, cover: gradient('#240046', '#10002b'), youtubeId: 'RlPNh_PBZb4' },
  { id: 't10', title: 'Last Night', artist: 'Morgan Wallen', album: 'One Thing at a Time', duration: '2:43', durationSec: 163, cover: gradient('#bc6c25', '#dda15e'), youtubeId: 'Ed0wuhrK5tk' },
  { id: 't11', title: 'Paint The Town Red', artist: 'Doja Cat', album: 'Scarlet', duration: '3:50', durationSec: 230, cover: gradient('#d00000', '#9d0208'), youtubeId: 'm4_9TFeMfJE' },
  { id: 't12', title: 'Greedy', artist: 'Tate McRae', album: 'Think Later', duration: '2:11', durationSec: 131, cover: gradient('#ee9b00', '#ca6702'), youtubeId: 'ItHwgWdgi5Y' },
  { id: 't13', title: 'Stronger', artist: 'Kanye West', album: 'Graduation', duration: '5:11', durationSec: 311, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'PsO6ZnUZI0g' },
  { id: 't14', title: 'Flashing Lights', artist: 'Kanye West', album: 'Graduation', duration: '3:57', durationSec: 237, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'ila-hAUXR5U' },
  { id: 't15', title: 'Good Life', artist: 'Kanye West', album: 'Graduation', duration: '3:27', durationSec: 207, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'TQqK7XHcrpc' },
  { id: 't16', title: 'Homecoming', artist: 'Kanye West', album: 'Graduation', duration: '3:23', durationSec: 203, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'kvOY3iNbqg4' },
  { id: 't17', title: 'Good Morning', artist: 'Kanye West', album: 'Graduation', duration: '3:15', durationSec: 195, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'D7ATy-tBxJU' },
  { id: 't18', title: 'Champion', artist: 'Kanye West', album: 'Graduation', duration: '2:47', durationSec: 167, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'Whz7lQ_5OXM' },
  { id: 't19', title: 'Can\'t Tell Me Nothing', artist: 'Kanye West', album: 'Graduation', duration: '4:32', durationSec: 272, cover: gradient('#ec5f8e', '#1c8feb'), youtubeId: 'E58qLXBfLrs' },
  // Daft Punk — Random Access Memories (2013) — use lyric/audio uploads (official MVs often blocked from embed)
  { id: 't20', title: 'Get Lucky', artist: 'Daft Punk, Pharrell Williams, Nile Rodgers', album: 'Random Access Memories', duration: '6:08', durationSec: 368, cover: gradient('#1a1a1a', '#4a4a4a'), youtubeId: 'h6dEDp_GZuk' },
  { id: 't21', title: 'Instant Crush', artist: 'Daft Punk, Julian Casablancas', album: 'Random Access Memories', duration: '5:37', durationSec: 337, cover: gradient('#1a1a1a', '#4a4a4a'), youtubeId: 'JFKQB0-Rfm0' },
  { id: 't22', title: 'Lose Yourself to Dance', artist: 'Daft Punk, Pharrell Williams', album: 'Random Access Memories', duration: '5:53', durationSec: 353, cover: gradient('#1a1a1a', '#4a4a4a'), youtubeId: 'tjbWHpZmShQ' },
  { id: 't23', title: 'Doin\' It Right', artist: 'Daft Punk, Panda Bear', album: 'Random Access Memories', duration: '4:11', durationSec: 251, cover: gradient('#1a1a1a', '#4a4a4a'), youtubeId: 'bf7TS_-ucBs' },
  { id: 't24', title: 'Giorgio by Moroder', artist: 'Daft Punk, Giorgio Moroder', album: 'Random Access Memories', duration: '9:04', durationSec: 544, cover: gradient('#1a1a1a', '#4a4a4a'), youtubeId: 'zhl-Cs1-sG4' },
  // Pentagram (Mezarkabul) — Turkish heavy metal
  { id: 't25', title: 'Sonsuzluk', artist: 'Pentagram', album: 'Anatolia', duration: '5:42', durationSec: 342, cover: gradient('#000000', '#660000'), youtubeId: 'JFmgyVuV7lE' },
  { id: 't26', title: 'Anatolia', artist: 'Pentagram', album: 'Anatolia', duration: '6:18', durationSec: 378, cover: gradient('#000000', '#660000'), youtubeId: 'JjbB9HJ3UkY' },
  { id: 't27', title: 'On The Wings of the Sad Wind', artist: 'Pentagram', album: 'Anatolia', duration: '4:55', durationSec: 295, cover: gradient('#000000', '#660000'), youtubeId: 'bAEEHrV-NdM' },
  { id: 't28', title: 'Bir', artist: 'Pentagram', album: 'Bir', duration: '4:33', durationSec: 273, cover: gradient('#1a0000', '#330000'), youtubeId: '7-3RDH9DkbU' },
  { id: 't29', title: 'Zihni Sinir', artist: 'Pentagram', album: 'Bir', duration: '3:48', durationSec: 228, cover: gradient('#1a0000', '#330000'), youtubeId: 'Tw9DI5wzc7Q' },
]

export const playlists: Playlist[] = [
  { id: 'p1', name: 'Liked Songs', description: 'Your favorite tracks', cover: gradient('#450af5', '#c4efd9'), owner: 'You', trackCount: 8, trackIds: ['t2', 't5', 't8', 't3', 't9', 't1', 't7', 't4'] },
  { id: 'p2', name: "Today's Top Hits", description: 'The hottest tracks right now', cover: gradient('#1db954', '#191414'), owner: 'Spotify', trackCount: 10, trackIds: ['t1', 't2', 't3', 't4', 't11', 't6', 't7', 't9', 't12', 't8'] },
  { id: 'p3', name: 'Chill Mix', description: 'Relax and unwind', cover: gradient('#ff6b9d', '#feca57'), owner: 'Spotify', trackCount: 6, trackIds: ['t5', 't2', 't9', 't4', 't8', 't3'] },
  { id: 'p4', name: 'Workout Beats', description: 'Pump up the volume', cover: gradient('#ff006e', '#3a0ca3'), owner: 'Spotify', trackCount: 6, trackIds: ['t1', 't11', 't6', 't10', 't12', 't7'] },
  { id: 'p5', name: 'Late Night Vibes', description: 'For your 2am moods', cover: gradient('#240046', '#5a189a'), owner: 'Spotify', trackCount: 5, trackIds: ['t9', 't6', 't8', 't3', 't5'] },
  { id: 'p6', name: 'Indie Discoveries', description: 'Hidden gems', cover: gradient('#06d6a0', '#073b4c'), owner: 'Spotify', trackCount: 5, trackIds: ['t2', 't8', 't9', 't3', 't4'] },
  { id: 'p7', name: 'Focus Flow', description: 'Deep concentration music', cover: gradient('#118ab2', '#073b4c'), owner: 'Spotify', trackCount: 5, trackIds: ['t3', 't5', 't2', 't9', 't8'] },
  { id: 'p8', name: 'Throwback Thursday', description: '2000s nostalgia', cover: gradient('#f72585', '#7209b7'), owner: 'Spotify', trackCount: 5, trackIds: ['t7', 't10', 't4', 't1', 't11'] },
  { id: 'p9', name: 'Graduation', description: 'Kanye West · 2007 · The drop-tops, the bear, the auto-tune awakening', cover: gradient('#ec5f8e', '#1c8feb'), owner: 'Kanye West', trackCount: 7, trackIds: ['t17', 't18', 't13', 't19', 't15', 't14', 't16'] },
  { id: 'p10', name: 'Random Access Memories', description: 'Daft Punk · 2013 · The robots return with disco, funk, and Pharrell', cover: gradient('#1a1a1a', '#4a4a4a'), owner: 'Daft Punk', trackCount: 5, trackIds: ['t20', 't21', 't22', 't23', 't24'] },
  { id: 'p11', name: 'Anatolia', description: 'Pentagram · 1997 · Turkish metal\'s Eastern soul', cover: gradient('#000000', '#660000'), owner: 'Pentagram', trackCount: 3, trackIds: ['t25', 't26', 't27'] },
  { id: 'p12', name: 'Bir', description: 'Pentagram · 2002 · Mezarkabul era classic', cover: gradient('#1a0000', '#330000'), owner: 'Pentagram', trackCount: 2, trackIds: ['t28', 't29'] },
]

export const recentlyPlayed: Album[] = [
  { id: 'a1', title: 'After Hours', artist: 'The Weeknd', cover: gradient('#ff0000', '#8b0000'), year: 2020, playlistId: 'p4' },
  { id: 'a2', title: 'Midnights', artist: 'Taylor Swift', cover: gradient('#4a4e69', '#22223b'), year: 2022, playlistId: 'p5' },
  { id: 'a3', title: "Harry's House", artist: 'Harry Styles', cover: gradient('#ff6b9d', '#c44569'), year: 2022, playlistId: 'p6' },
  { id: 'a4', title: 'SOS', artist: 'SZA', cover: gradient('#06ffa5', '#118ab2'), year: 2022, playlistId: 'p3' },
  { id: 'a5', title: 'GUTS', artist: 'Olivia Rodrigo', cover: gradient('#240046', '#10002b'), year: 2023, playlistId: 'p7' },
  { id: 'a6', title: 'Renaissance', artist: 'Beyoncé', cover: gradient('#c0c0c0', '#808080'), year: 2022, playlistId: 'p2' },
  { id: 'a7', title: 'Graduation', artist: 'Kanye West', cover: gradient('#ec5f8e', '#1c8feb'), year: 2007, playlistId: 'p9' },
  { id: 'a8', title: 'Random Access Memories', artist: 'Daft Punk', cover: gradient('#1a1a1a', '#4a4a4a'), year: 2013, playlistId: 'p10' },
  { id: 'a9', title: 'Anatolia', artist: 'Pentagram', cover: gradient('#000000', '#660000'), year: 1997, playlistId: 'p11' },
  { id: 'a10', title: 'Bir', artist: 'Pentagram', cover: gradient('#1a0000', '#330000'), year: 2002, playlistId: 'p12' },
]

export const getTrackById = (id: string): Track | undefined =>
  tracks.find(t => t.id === id)

export const getPlaylistById = (id: string): Playlist | undefined =>
  playlists.find(p => p.id === id)

export const getPlaylistTracks = (id: string): Track[] => {
  const p = getPlaylistById(id)
  if (!p) return []
  return p.trackIds.map(tid => getTrackById(tid)).filter(Boolean) as Track[]
}

export const youtubeSearchUrl = (track: Track) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(track.title + ' ' + track.artist)}`
