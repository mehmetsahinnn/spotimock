export type UpcomingEvent = {
  id: string
  artistName: string
  artistCover: string
  venue: string
  city: string
  date: string
  dayShort: string
  monthShort: string
  daysUntil: number
  isInterested: boolean
}

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 100%)`

export const upcomingEvents: UpcomingEvent[] = [
  { id: 'ev1', artistName: 'The Weeknd', artistCover: grad('#ff0000', '#8b0000'), venue: 'Volkswagen Arena', city: 'İstanbul, TR', date: 'Fri, May 30 · 21:00', dayShort: '30', monthShort: 'MAY', daysUntil: 17, isInterested: true },
  { id: 'ev2', artistName: 'Taylor Swift', artistCover: grad('#4a4e69', '#22223b'), venue: 'Atatürk Olympic Stadium', city: 'İstanbul, TR', date: 'Sat, Jun 14 · 20:00', dayShort: '14', monthShort: 'JUN', daysUntil: 32, isInterested: true },
  { id: 'ev3', artistName: 'Harry Styles', artistCover: grad('#ff6b9d', '#c44569'), venue: 'Küçükçiftlik Park', city: 'İstanbul, TR', date: 'Wed, Jun 25 · 21:30', dayShort: '25', monthShort: 'JUN', daysUntil: 43, isInterested: false },
  { id: 'ev4', artistName: 'SZA', artistCover: grad('#06ffa5', '#118ab2'), venue: 'Zorlu PSM', city: 'İstanbul, TR', date: 'Tue, Jul 8 · 20:30', dayShort: '08', monthShort: 'JUL', daysUntil: 56, isInterested: false },
  { id: 'ev5', artistName: 'Doja Cat', artistCover: grad('#d00000', '#9d0208'), venue: 'KüçükÇiftlik Park', city: 'İstanbul, TR', date: 'Sat, Jul 19 · 21:00', dayShort: '19', monthShort: 'JUL', daysUntil: 67, isInterested: true },
]
