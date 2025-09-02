export interface Musician {
  awards: Array<{
    year: number
    title: string
    description?: string
  }>
  originalSoundtracks: Array<{
    title: string
    notes: string
    url?: string
  }>
  folkloric: Array<{
    title: string
    notes: string
    url?: string
  }>
  media: {
    videos: Array<{ title: string; url: string }>
    music: Array<{ title: string; url: string; platform: string }>
    interviews: Array<{ title: string; url: string; type: string }>
  }
}

export const musician: Musician = {
  awards: [
    {
      year: 2013,
      title: '1st Place — National Song Contest (Costa Rica)',
      description: 'Recognition for original composition and musical innovation.',
    },
    {
      year: 2015,
      title: '1st Place — FEA Costa Rica',
      description: 'Excellence award for musical composition and performance.',
    },
    {
      year: 2024,
      title: '1st Place — Peace Song Contest: Abolition of the Army (Costa Rica)',
      description: 'Honored for contribution to peace through music.',
    },
  ],
  originalSoundtracks: [
    {
      title: 'Original OST — Catarsis Musical Studio',
      notes: 'Cinematic, experimental, game-ready compositions.',
      url: '',
    },
  ],
  folkloric: [
    {
      title: 'Folkloric Songs of Costa Rica',
      notes: 'Modern adaptations for cultural preservation and contemporary audiences.',
      url: '',
    },
  ],
  media: {
    videos: [
      { title: 'Live Performance at National Theater', url: '' },
      { title: 'Studio Session Documentary', url: '' },
    ],
    music: [
      { title: 'Spotify Artist Profile', url: '', platform: 'Spotify' },
      { title: 'SoundCloud Collection', url: '', platform: 'SoundCloud' },
    ],
    interviews: [
      { title: 'Radio Interview on Cultural Preservation', url: '', type: 'Radio' },
      { title: 'TV Feature on Music & Technology', url: '', type: 'Television' },
    ],
  },
}
