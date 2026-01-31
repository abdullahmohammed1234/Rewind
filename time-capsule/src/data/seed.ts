// Seed data for TimeCapsule - Comprehensive trend data from 2012-2024
import { Year, Month, Category, Item, LeaderboardEntry, AllTimePick } from '@/types';

// ===== YEARS =====

export const years: Year[] = [
  {
    id: '2012',
    year: 2012,
    description: 'The year of viral videos and the rise of mobile social media. Gangnam Style took over the world.',
    theme: 'discovery',
    topTrends: ['Gangnam Style', 'Kony 2012', 'Diamond Grill', 'Twerking'],
    colorScheme: { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' }
  },
  {
    id: '2013',
    year: 2013,
    description: 'Selfie becomes Word of the Year. Harlem Shake craze and the beginning of the Drake era.',
    theme: 'selfie',
    topTrends: ['Selfie', 'Harlem Shake', 'Twerking', 'Miley Cyrus'],
    colorScheme: { primary: '#9B59B6', secondary: '#3498DB', accent: '#E74C3C' }
  },
  {
    id: '2014',
    year: 2014,
    description: 'Ice Bucket Challenge sweeps the internet. Frozen dominates pop culture. The dress that broke the internet.',
    theme: 'ice-bucket',
    topTrends: ['Ice Bucket Challenge', 'Frozen', 'The Dress', 'Pharrell Happy'],
    colorScheme: { primary: '#1ABC9C', secondary: '#3498DB', accent: '#9B59B6' }
  },
  {
    id: '2015',
    year: 2015,
    description: 'Rise of the fidget spinner and hotdog arms. Drake takes over streaming. Star Wars returns.',
    theme: 'streaming',
    topTrends: ['Fidget Spinner', 'Hotdog Arms', 'Drake', 'Star Wars'],
    colorScheme: { primary: '#E74C3C', secondary: '#F39C12', accent: '#2ECC71' }
  },
  {
    id: '2016',
    year: 2016,
    description: 'The peak of viral memes. Pokémon GO craze, Trump election, and the rise of TikTok. A year of internet history.',
    theme: 'pokemon-go',
    topTrends: ['Pokémon GO', 'Damn Daniel', 'Harambe', 'Cash Me Outside'],
    colorScheme: { primary: '#2ECC71', secondary: '#9B59B6', accent: '#F1C40F' }
  },
  {
    id: '2017',
    year: 2017,
    description: 'Despacito summer and the Charlottesville incident. Bitcoin surges. Logan Paul controversy.',
    theme: 'despacito',
    topTrends: ['Despacito', 'Bitcoin', 'Charlottesville', 'Logan Paul'],
    colorScheme: { primary: '#E74C3C', secondary: '#F39C12', accent: '#3498DB' }
  },
  {
    id: '2018',
    year: 2018,
    description: 'Kylie Jenner becomes youngest billionaire. Avengers Infinity War. Tide Pod challenge disaster.',
    theme: 'infinity',
    topTrends: ['Avengers', 'Kylie Jenner', 'Tide Pods', 'In My Feelings'],
    colorScheme: { primary: '#9B59B6', secondary: '#E74C3C', accent: '#F1C40F' }
  },
  {
    id: '2019',
    year: 2019,
    description: 'The rise of TikTok. Baby Yoda. Brexit chaos. streaming wars begin.',
    theme: 'tiktok',
    topTrends: ['TikTok', 'Baby Yoda', 'Brexit', 'Streamings Wars'],
    colorScheme: { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' }
  },
  {
    id: '2020',
    year: 2020,
    description: 'Pandemic year. Tiger King. Zoom becomes essential. BLM movement goes viral.',
    theme: 'pandemic',
    topTrends: ['Tiger King', 'Zoom', 'BLM', 'Work From Home'],
    colorScheme: { primary: '#6366F1', secondary: '#EC4899', accent: '#10B981' }
  },
  {
    id: '2021',
    year: 2021,
    description: 'GameStop short squeeze. NFTs explode. COVID variants. Squid Game takes over.',
    theme: 'nft',
    topTrends: ['GameStop', 'NFTs', 'Squid Game', 'COVID Vaccines'],
    colorScheme: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B' }
  },
  {
    id: '2022',
    year: 2022,
    description: 'Roe v. Wade overturned. Elon buys Twitter. War in Ukraine. Barbieheimer.',
    theme: 'chaos',
    topTrends: ['Elon Twitter', 'Barbieheimer', 'Ukraine', 'Roe v Wade'],
    colorScheme: { primary: '#EC4899', secondary: '#6366F1', accent: '#14B8A6' }
  },
  {
    id: '2023',
    year: 2023,
    description: 'AI takes over. Barbenheimer success. Israel-Gaza war. Taylor Swift Eras Tour.',
    theme: 'ai',
    topTrends: ['ChatGPT', 'Barbenheimer', 'Taylor Swift', 'AI Art'],
    colorScheme: { primary: '#6366F1', secondary: '#EC4899', accent: '#F59E0B' }
  },
  {
    id: '2024',
    year: 2024,
    description: 'AI continues to evolve. Election year. New social platforms emerge.',
    theme: 'evolution',
    topTrends: ['AI Video', 'Election 2024', 'New Socials', 'Climate Action'],
    colorScheme: { primary: '#10B981', secondary: '#6366F1', accent: '#F59E0B' }
  }
];

// ===== MONTHS =====

export const months: Month[] = [
  // 2016 months
  { id: 'jan-2016', name: 'January', yearId: '2016', shortName: 'Jan' },
  { id: 'feb-2016', name: 'February', yearId: '2016', shortName: 'Feb' },
  { id: 'mar-2016', name: 'March', yearId: '2016', shortName: 'Mar' },
  { id: 'apr-2016', name: 'April', yearId: '2016', shortName: 'Apr' },
  { id: 'may-2016', name: 'May', yearId: '2016', shortName: 'May' },
  { id: 'jun-2016', name: 'June', yearId: '2016', shortName: 'Jun' },
  { id: 'jul-2016', name: 'July', yearId: '2016', shortName: 'Jul' },
  { id: 'aug-2016', name: 'August', yearId: '2016', shortName: 'Aug' },
  { id: 'sep-2016', name: 'September', yearId: '2016', shortName: 'Sep' },
  { id: 'oct-2016', name: 'October', yearId: '2016', shortName: 'Oct' },
  { id: 'nov-2016', name: 'November', yearId: '2016', shortName: 'Nov' },
  { id: 'dec-2016', name: 'December', yearId: '2016', shortName: 'Dec' },
  // 2020 months (for pandemic trends)
  { id: 'mar-2020', name: 'March', yearId: '2020', shortName: 'Mar' },
  { id: 'apr-2020', name: 'April', yearId: '2020', shortName: 'Apr' },
  { id: 'may-2020', name: 'May', yearId: '2020', shortName: 'May' },
  { id: 'jun-2020', name: 'June', yearId: '2020', shortName: 'Jun' },
  // 2023 months
  { id: 'jul-2023', name: 'July', yearId: '2023', shortName: 'Jul' },
  { id: 'aug-2023', name: 'August', yearId: '2023', shortName: 'Aug' },
];

// ===== CATEGORIES =====

export const categories: Category[] = [
  { id: 'memes', name: 'Memes', type: 'memes', icon: '😂', description: 'Viral memes and internet jokes' },
  { id: 'music', name: 'Music', type: 'music', icon: '🎵', description: 'Songs, albums, and music trends' },
  { id: 'dances', name: 'Dances', type: 'dances', icon: '💃', description: 'Viral dances and challenges' },
  { id: 'style', name: 'Style', type: 'style', icon: '👗', description: 'Fashion and clothing trends' },
  { id: 'products', name: 'Products', type: 'products', icon: '🛍️', description: 'Popular products and toys' },
  { id: 'trends', name: 'Trends', type: 'trends', icon: '📈', description: 'General viral trends' },
  { id: 'tv', name: 'TV & Movies', type: 'tv', icon: '🎬', description: 'TV shows and movies' },
  { id: 'celebrities', name: 'Celebrities', type: 'celebrities', icon: '⭐', description: 'Celebrity news and gossip' },
  { id: 'gaming', name: 'Gaming', type: 'gaming', icon: '🎮', description: 'Video games and gaming trends' },
  { id: 'other', name: 'Other', type: 'other', icon: '📦', description: 'Miscellaneous trends' }
];

// ===== ITEMS/TRENDS =====

export const items: Item[] = [
  // ===== 2016 TRENDS =====
  
  // January 2016
  {
    id: 'item-1',
    title: 'Damn Daniel',
    description: 'A viral video where two teens record their friend Daniel wearing white Vans constantly. The catchphrase "Damn Daniel! Back at it again with the white Vans!" became a massive meme.',
    categoryId: 'memes',
    monthId: 'jan-2016',
    yearId: '2016',
    popularityScore: 98,
    slug: 'damn-daniel',
    timeline: { start: 'Feb 2016', peak: 'Mar 2016' },
    impact: 'Spawned countless remixes and became a cultural touchstone for 2016.'
  },
  {
    id: 'item-2',
    title: 'Stranger Things',
    description: 'Netflix released this sci-fi horror series that became an instant hit. The 80s nostalgia and compelling story made it one of the most-watched shows of the year.',
    categoryId: 'tv',
    monthId: 'jan-2016',
    yearId: '2016',
    popularityScore: 97,
    slug: 'stranger-things',
    timeline: { start: 'Jul 2016', peak: 'Aug 2016' },
    impact: 'Revived interest in 80s culture and launched the careers of its young cast.'
  },
  
  // February 2016
  {
    id: 'item-3',
    title: 'Harambe Memorial',
    description: 'After a gorilla was shot at a zoo, the internet mourned with a flood of memes claiming Harambe died for our sins. Some donated to gorilla conservation in his name.',
    categoryId: 'memes',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 99,
    slug: 'harambe',
    timeline: { start: 'May 2016', peak: 'Jun 2016' },
    impact: 'One of the most viral memes of 2016, combining animal rights with absurdist humor.'
  },
  {
    id: 'item-4',
    title: 'Kanye West - Life of Pablo',
    description: 'Kanye released his seventh studio album with massive hype. The tour merchandise and album delays made headlines throughout the year.',
    categoryId: 'music',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 92,
    slug: 'life-of-pablo',
    timeline: { start: 'Feb 2016', peak: 'Apr 2016' },
    impact: 'Set streaming records and sparked debates about artistic genius.'
  },
  
  // March 2016
  {
    id: 'item-5',
    title: 'Hamilton',
    description: 'The Broadway musical about Alexander Hamilton took the world by storm. The cast performed at the Grammys and the cast recording dominated charts.',
    categoryId: 'tv',
    monthId: 'mar-2016',
    yearId: '2016',
    popularityScore: 94,
    slug: 'hamilton',
    timeline: { start: 'Feb 2016', peak: 'Jun 2016' },
    impact: 'Revolutionized Broadway and made Lin-Manuel Miranda a household name.'
  },
  
  // May 2016
  {
    id: 'item-7',
    title: 'Cash Me Outside',
    description: 'A teenage girl appeared on Dr. Phil saying "Cash me outside, howbow dah?" The phrase became a massive meme and she launched a music career.',
    categoryId: 'memes',
    monthId: 'may-2016',
    yearId: '2016',
    popularityScore: 95,
    slug: 'cash-me-outside',
    timeline: { start: 'Sep 2016', peak: 'Oct 2016' },
    impact: 'Started the era of social media personalities transitioning to music careers.'
  },
  
  // June 2016
  {
    id: 'item-8',
    title: 'Pokémon GO',
    description: 'Niantic released the augmented reality game that took over the world. People walked into parks, ponds, and cemeteries to catch Pokémon.',
    categoryId: 'gaming',
    monthId: 'jun-2016',
    yearId: '2016',
    popularityScore: 100,
    slug: 'pokemon-go',
    timeline: { start: 'Jul 2016', peak: 'Jul 2016' },
    impact: 'Proved AR gaming\'s potential and got millions outside catching virtual creatures.',
    creator: 'Niantic'
  },
  {
    id: 'item-9',
    title: 'Euro 2016',
    description: 'The European Championship brought viral moments including Portugal\'s victory and Iceland\'s Viking Clap celebration.',
    categoryId: 'trends',
    monthId: 'jun-2016',
    yearId: '2016',
    popularityScore: 88,
    slug: 'euro-2016',
    timeline: { start: 'Jun 2016', peak: 'Jul 2016' },
    impact: 'Iceland\'s underdog story captured hearts worldwide.'
  },
  
  // July 2016
  {
    id: 'item-10',
    title: 'Oculus Rift',
    description: 'Consumer VR finally arrived with the Oculus Rift. While adoption was limited, it kicked off the VR revolution.',
    categoryId: 'products',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 85,
    slug: 'oculus-rift',
    timeline: { start: 'Mar 2016', peak: 'Jun 2016' },
    impact: 'Marked the beginning of mainstream VR gaming.',
    creator: 'Oculus'
  },
  
  // August 2016
  {
    id: 'item-11',
    title: 'Rio Olympics',
    description: 'The Rio Olympics brought viral moments like Usain Bolt\'s pose, the Zika virus fears, and Simone Biles\'s dominance.',
    categoryId: 'trends',
    monthId: 'aug-2016',
    yearId: '2016',
    popularityScore: 93,
    slug: 'rio-olympics',
    timeline: { start: 'Aug 2016', peak: 'Aug 2016' },
    impact: 'Michael Phelps\'s final games and Katie Ledecky\'s dominance highlighted swimming.'
  },
  
  // September 2016
  {
    id: 'item-13',
    title: 'Apple AirPods',
    description: 'Apple released wireless earbuds that were initially mocked but became a massive status symbol and fashion item.',
    categoryId: 'products',
    monthId: 'sep-2016',
    yearId: '2016',
    popularityScore: 91,
    slug: 'apple-airpods',
    timeline: { start: 'Dec 2016', peak: '2017' },
    impact: 'Killed the headphone jack and made wireless earbuds mainstream.',
    creator: 'Apple'
  },
  
  // November 2016
  {
    id: 'item-15',
    title: '2016 US Election',
    description: 'One of the most controversial elections in US history dominated every platform and divided the internet.',
    categoryId: 'trends',
    monthId: 'nov-2016',
    yearId: '2016',
    popularityScore: 99,
    slug: '2016-us-election',
    timeline: { start: 'Jan 2016', peak: 'Nov 2016' },
    impact: 'Changed political discourse on social media forever.'
  },
  
  // December 2016
  {
    id: 'item-17',
    title: 'Star Wars: Rogue One',
    description: 'The standalone Star Wars film brought back Darth Vader and broke box office records during the holiday season.',
    categoryId: 'tv',
    monthId: 'dec-2016',
    yearId: '2016',
    popularityScore: 95,
    slug: 'rogue-one',
    timeline: { start: 'Dec 2016', peak: 'Dec 2016' },
    impact: 'Proved the Star Wars universe could succeed beyond the main saga.'
  },

  // ===== 2020 PANDEMIC TRENDS =====

  // March 2020
  {
    id: 'covid-1',
    title: 'Tiger King',
    description: 'Netflix\'s docuseries about Joe Exotic and the exotic animal trade became a massive quarantine phenomenon.',
    categoryId: 'tv',
    monthId: 'mar-2020',
    yearId: '2020',
    popularityScore: 98,
    slug: 'tiger-king',
    timeline: { start: 'Mar 2020', peak: 'Apr 2020' },
    impact: 'Defined quarantine entertainment and launched a thousand memes.'
  },
  {
    id: 'covid-2',
    title: 'COVID-19 Lockdowns',
    description: 'Global lockdowns changed everything. Work from home, Zoom calls, and toilet paper shortages became the new normal.',
    categoryId: 'trends',
    monthId: 'mar-2020',
    yearId: '2020',
    popularityScore: 100,
    slug: 'covid-lockdowns',
    timeline: { start: 'Mar 2020', peak: 'Apr 2020' },
    impact: 'Transformed work, education, and social interaction permanently.'
  },
  {
    id: 'covid-3',
    title: 'Zoom',
    description: 'Zoom became the go-to platform for everything from work meetings to happy hours to yoga classes.',
    categoryId: 'products',
    monthId: 'mar-2020',
    yearId: '2020',
    popularityScore: 96,
    slug: 'zoom',
    timeline: { start: 'Mar 2020', peak: 'Apr 2020' },
    impact: 'Made video conferencing mainstream and changed remote work forever.',
    creator: 'Zoom'
  },

  // April 2020
  {
    id: 'covid-4',
    title: '#BlackLivesMatter',
    description: 'Following George Floyd\'s death, the BLM movement went viral with massive protests and global support.',
    categoryId: 'trends',
    monthId: 'apr-2020',
    yearId: '2020',
    popularityScore: 99,
    slug: 'blm-2020',
    timeline: { start: 'May 2020', peak: 'Jun 2020' },
    impact: 'Led to global conversations about race and police reform.'
  },
  {
    id: 'covid-5',
    title: 'Dalgona Coffee',
    description: 'The Korean whipped coffee became a viral sensation during lockdowns, with everyone trying to make it at home.',
    categoryId: 'trends',
    monthId: 'apr-2020',
    yearId: '2020',
    popularityScore: 85,
    slug: 'dalgona-coffee',
    timeline: { start: 'Mar 2020', peak: 'Apr 2020' },
    impact: 'Made Korean coffee culture mainstream and spawned countless TikToks.'
  },

  // ===== 2023 TRENDS =====

  // July 2023
  {
    id: 'barbie-1',
    title: 'Barbie',
    description: 'Greta Gerwig\'s Barbie film became a cultural phenomenon, breaking box office records and sparking global conversations.',
    categoryId: 'tv',
    monthId: 'jul-2023',
    yearId: '2023',
    popularityScore: 98,
    slug: 'barbie-2023',
    timeline: { start: 'Jul 2023', peak: 'Jul 2023' },
    impact: 'Proved female-led films can dominate the box office.'
  },
  {
    id: 'barbie-2',
    title: 'Oppenheimer',
    description: 'Christopher Nolan\'s atomic bomb drama became the unexpected hit of summer, creating the "Barbenheimer" phenomenon.',
    categoryId: 'tv',
    monthId: 'jul-2023',
    yearId: '2023',
    popularityScore: 95,
    slug: 'oppenheimer-2023',
    timeline: { start: 'Jul 2023', peak: 'Jul 2023' },
    impact: 'Showed audiences wanted serious, intellectual cinema alongside blockbusters.'
  },
  {
    id: 'taylor-1',
    title: 'Taylor Swift Eras Tour',
    description: 'Taylor Swift\'s Eras Tour became the highest-grossing tour ever, with ticket sales causing Ticketmaster chaos.',
    categoryId: 'music',
    monthId: 'jul-2023',
    yearId: '2023',
    popularityScore: 99,
    slug: 'taylor-eras-tour',
    timeline: { start: 'Mar 2023', peak: 'Jul 2023' },
    impact: 'Broke every tour record and defined pop culture in 2023.',
    creator: 'Taylor Swift'
  },
  {
    id: 'ai-1',
    title: 'ChatGPT',
    description: 'OpenAI\'s ChatGPT launched and quickly became the fastest-growing app in history, starting the AI revolution.',
    categoryId: 'products',
    monthId: 'jul-2023',
    yearId: '2023',
    popularityScore: 100,
    slug: 'chatgpt',
    timeline: { start: 'Nov 2022', peak: 'Jan 2023' },
    impact: 'Started the mainstream AI era and changed how we work.',
    creator: 'OpenAI'
  },
];

// ===== ALL-TIME TOP PICKS =====

export const allTimePicks: AllTimePick[] = [
  {
    id: 'all-1',
    item: items.find(i => i.slug === 'pokemon-go')!,
    years: [2016],
    totalEngagement: 5000000000,
    category: categories.find(c => c.id === 'gaming')!,
    milestone: 'Most downloaded mobile game in a single month'
  },
  {
    id: 'all-2',
    item: items.find(i => i.slug === 'damn-daniel')!,
    years: [2016],
    totalEngagement: 2000000000,
    category: categories.find(c => c.id === 'memes')!,
    milestone: 'One of the most remixed memes of 2016'
  },
  {
    id: 'all-3',
    item: items.find(i => i.slug === 'harambe')!,
    years: [2016],
    totalEngagement: 3000000000,
    category: categories.find(c => c.id === 'memes')!,
    milestone: 'Highest engagement gorilla meme ever'
  },
  {
    id: 'all-4',
    item: items.find(i => i.slug === 'tiger-king')!,
    years: [2020],
    totalEngagement: 21000000,
    category: categories.find(c => c.id === 'tv')!,
    milestone: 'Most-watched docuseries in Netflix history (at the time)'
  },
  {
    id: 'all-5',
    item: items.find(i => i.slug === 'chatgpt')!,
    years: [2022, 2023, 2024],
    totalEngagement: 100000000,
    category: categories.find(c => c.id === 'products')!,
    milestone: 'Fastest-growing app in history'
  },
  {
    id: 'all-6',
    item: items.find(i => i.slug === 'stranger-things')!,
    years: [2016, 2022, 2024],
    totalEngagement: 80000000,
    category: categories.find(c => c.id === 'tv')!,
    milestone: 'Revived 80s nostalgia for a new generation'
  },
  {
    id: 'all-7',
    item: items.find(i => i.slug === 'taylor-eras-tour')!,
    years: [2023],
    totalEngagement: 50000000,
    category: categories.find(c => c.id === 'music')!,
    milestone: 'Highest-grossing tour in music history'
  },
  {
    id: 'all-8',
    item: items.find(i => i.slug === 'covid-lockdowns')!,
    years: [2020],
    totalEngagement: 10000000000,
    category: categories.find(c => c.id === 'trends')!,
    milestone: 'Largest global event captured on social media'
  }
];

// ===== HELPER FUNCTIONS =====

export function getYearById(id: string): Year | undefined {
  return years.find(y => y.id === id);
}

export function getYearByNumber(year: number): Year | undefined {
  return years.find(y => y.year === year);
}

export function getMonthsByYear(yearId: string): Month[] {
  return months.filter(m => m.yearId === yearId);
}

export function getItemsByMonth(monthId: string): Item[] {
  return items.filter(i => i.monthId === monthId);
}

export function getItemsByYear(yearId: string): Item[] {
  return items.filter(i => i.yearId === yearId);
}

export function getItemsByCategory(monthId: string, categoryId: string): Item[] {
  return items.filter(i => i.monthId === monthId && i.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getItemBySlug(slug: string): Item | undefined {
  return items.find(i => i.slug === slug);
}

export function getItemsByCategoryForYear(yearId: string, categoryId: string): Item[] {
  return items.filter(i => i.yearId === yearId && i.categoryId === categoryId)
    .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
}

export function getLeaderboardForCategory(yearId: string, categoryId: string): LeaderboardEntry[] {
  const categoryItems = getItemsByCategoryForYear(yearId, categoryId);
  return categoryItems.map((item, index) => ({
    rank: index + 1,
    item,
    previousRank: undefined,
    weeksOnChart: Math.floor(Math.random() * 52) + 1
  }));
}

export function getAllTimePicks(): AllTimePick[] {
  return allTimePicks.sort((a, b) => b.totalEngagement - a.totalEngagement);
}

export function getAllTimePicksByCategory(categoryId: string): AllTimePick[] {
  return allTimePicks.filter(p => p.category.id === categoryId)
    .sort((a, b) => b.totalEngagement - a.totalEngagement);
}
