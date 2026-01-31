// Seed data for TimeCapsule - Demo focusing on 2016
import { Year, Month, Category, Item } from '@/types';

export const years: Year[] = [
  {
    id: '2012',
    year: 2012,
    description: 'The year of viral videos and the rise of mobile social media. Gangnam Style took over the world.',
    theme: 'discovery',
    topTrends: ['Gangnam Style', 'Kony 2012', 'Diamond Grill', 'Twerking']
  },
  {
    id: '2013',
    year: 2013,
    description: 'Selfie becomes Word of the Year. Harlem Shake craze and the beginning of the Drake era.',
    theme: 'selfie',
    topTrends: ['Selfie', 'Harlem Shake', 'Twerking', 'Miley Cyrus']
  },
  {
    id: '2014',
    year: 2014,
    description: 'Ice Bucket Challenge sweeps the internet. Frozen dominates pop culture. The dress that broke the internet.',
    theme: 'ice-bucket',
    topTrends: ['Ice Bucket Challenge', 'Frozen', 'The Dress', 'Pharrell Happy']
  },
  {
    id: '2015',
    year: 2015,
    description: 'Rise of the fidget spinner and hotdog arms. Drake takes over streaming. Star Wars returns.',
    theme: 'streaming',
    topTrends: ['Fidget Spinner', 'Hotdog Arms', 'Drake', 'Star Wars']
  },
  {
    id: '2016',
    year: 2016,
    description: 'The peak of viral memes. Pokémon GO craze, Trump election, and the rise of TikTok. A year of internet history.',
    theme: 'pokemon-go',
    topTrends: ['Pokémon GO', 'Damn Daniel', 'Harambe', 'Cash Me Outside']
  },
  {
    id: '2017',
    year: 2017,
    description: 'Despacito summer and the Charlottesville incident. Bitcoin surges. Logan Paul controversy.',
    theme: 'despacito',
    topTrends: ['Despacito', 'Bitcoin', 'Charlottesville', 'Logan Paul']
  },
  {
    id: '2018',
    year: 2018,
    description: 'Kylie Jenner becomes youngest billionaire. Avengers Infinity War. Tide Pod challenge disaster.',
    theme: 'infinity',
    topTrends: ['Avengers', 'Kylie Jenner', 'Tide Pods', 'In My Feelings']
  }
];

export const months: Month[] = [
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
  { id: 'dec-2016', name: 'December', yearId: '2016', shortName: 'Dec' }
];

export const categories: Category[] = [
  { id: 'memes', name: 'Memes', type: 'memes', icon: '😂' },
  { id: 'music', name: 'Music', type: 'music', icon: '🎵' },
  { id: 'dances', name: 'Dances', type: 'dances', icon: '💃' },
  { id: 'style', name: 'Style', type: 'style', icon: '👗' },
  { id: 'trends', name: 'Trends', type: 'trends', icon: '📈' },
  { id: 'movies', name: 'Movies & TV', type: 'movies', icon: '🎬' },
  { id: 'celebrities', name: 'Celebrities', type: 'celebrities', icon: '⭐' },
  { id: 'other', name: 'Other', type: 'other', icon: '📦' }
];

export const items: Item[] = [
  // January 2016
  {
    id: 'item-1',
    title: 'Damn Daniel',
    description: 'A viral video where two teens record their friend Daniel wearing white Vans constantly. The catchphrase "Damn Daniel! Back at it again with the white Vans!" became a massive meme.',
    categoryId: 'memes',
    monthId: 'jan-2016',
    popularityScore: 98,
    slug: 'damn-daniel',
    timeline: { start: 'Feb 2016', peak: 'Mar 2016' },
    impact: 'Spawned countless remixes and became a cultural touchstone for 2016.'
  },
  {
    id: 'item-2',
    title: 'Stranger Things',
    description: 'Netflix released this sci-fi horror series that became an instant hit. The 80s nostalgia and compelling story made it one of the most-watched shows of the year.',
    categoryId: 'movies',
    monthId: 'jan-2016',
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
    categoryId: 'movies',
    monthId: 'mar-2016',
    popularityScore: 94,
    slug: 'hamilton',
    timeline: { start: 'Feb 2016', peak: 'Jun 2016' },
    impact: 'Revolutionized Broadway and made Lin-Manuel Miranda a household name.'
  },
  
  // April 2016
  {
    id: 'item-6',
    title: 'Adele - 25',
    description: 'Adele\'s second album broke records globally. "Hello" became one of the best-selling singles of all time.',
    categoryId: 'music',
    monthId: 'apr-2016',
    popularityScore: 96,
    slug: 'adele-25',
    timeline: { start: 'Nov 2015', peak: 'Jan 2016' },
    impact: 'Proved traditional pop still dominates in the streaming era.'
  },
  
  // May 2016
  {
    id: 'item-7',
    title: 'Cash Me Outside',
    description: 'A teenage girl appeared on Dr. Phil saying "Cash me outside, howbow dah?" The phrase became a massive meme and she launched a music career.',
    categoryId: 'memes',
    monthId: 'may-2016',
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
    categoryId: 'trends',
    monthId: 'jun-2016',
    popularityScore: 100,
    slug: 'pokemon-go',
    timeline: { start: 'Jul 2016', peak: 'Jul 2016' },
    impact: 'Proved AR gaming\'s potential and got millions outside catching virtual creatures.'
  },
  {
    id: 'item-9',
    title: 'Euro 2016',
    description: 'The European Championship brought viral moments including Portugal\'s victory and Iceland\'s Viking Clap celebration.',
    categoryId: 'trends',
    monthId: 'jun-2016',
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
    categoryId: 'trends',
    monthId: 'jul-2016',
    popularityScore: 85,
    slug: 'oculus-rift',
    timeline: { start: 'Mar 2016', peak: 'Jun 2016' },
    impact: 'Marked the beginning of mainstream VR gaming.'
  },
  
  // August 2016
  {
    id: 'item-11',
    title: 'Rio Olympics',
    description: 'The Rio Olympics brought viral moments like Usain Bolt\'s pose, the Zika virus fears, and Simone Biles\'s dominance.',
    categoryId: 'trends',
    monthId: 'aug-2016',
    popularityScore: 93,
    slug: 'rio-olympics',
    timeline: { start: 'Aug 2016', peak: 'Aug 2016' },
    impact: 'Michael Phelps\'s final games and Katie Ledecky\'s dominance highlighted swimming.'
  },
  {
    id: 'item-12',
    title: 'Saquon Barkley',
    description: 'The running back\'s legendary stiff arm against Ohio State went viral and made him a Heisman favorite.',
    categoryId: 'trends',
    monthId: 'aug-2016',
    popularityScore: 87,
    slug: 'saquon-barkley-stiff-arm',
    timeline: { start: 'Oct 2016', peak: 'Nov 2016' },
    impact: 'One of the most iconic plays in college football history.'
  },
  
  // September 2016
  {
    id: 'item-13',
    title: 'Apple AirPods',
    description: 'Apple released wireless earbuds that were initially mocked but became a massive status symbol and fashion item.',
    categoryId: 'style',
    monthId: 'sep-2016',
    popularityScore: 91,
    slug: 'apple-airpods',
    timeline: { start: 'Dec 2016', peak: '2017' },
    impact: 'Killed the headphone jack and made wireless earbuds mainstream.'
  },
  
  // October 2016
  {
    id: 'item-14',
    title: 'David After Dentist',
    description: 'Years after the original video, the "Is This Real Life?" meme brought this kid\'s reaction to dental anesthesia back into viral fame.',
    categoryId: 'memes',
    monthId: 'oct-2016',
    popularityScore: 86,
    slug: 'david-after-dentist-meme',
    timeline: { start: 'Oct 2016', peak: 'Nov 2016' },
    impact: 'Showed how viral content can have second lives on social media.'
  },
  
  // November 2016
  {
    id: 'item-15',
    title: '2016 US Election',
    description: 'One of the most controversial elections in US history dominated every platform and divided the internet.',
    categoryId: 'trends',
    monthId: 'nov-2016',
    popularityScore: 99,
    slug: '2016-us-election',
    timeline: { start: 'Jan 2016', peak: 'Nov 2016' },
    impact: 'Changed political discourse on social media forever.'
  },
  {
    id: 'item-16',
    title: 'Jared Fogle',
    description: 'The former Subway spokesperson was sentenced to 15 years for child pornography charges, ending his career in disgrace.',
    categoryId: 'celebrities',
    monthId: 'nov-2016',
    popularityScore: 84,
    slug: 'jared-fogle-sentenced',
    timeline: { start: 'Nov 2015', peak: 'Nov 2015' },
    impact: 'Major fall from grace that shocked the nation.'
  },
  
  // December 2016
  {
    id: 'item-17',
    title: 'Star Wars: Rogue One',
    description: 'The standalone Star Wars film brought back Darth Vader and broke box office records during the holiday season.',
    categoryId: 'movies',
    monthId: 'dec-2016',
    popularityScore: 95,
    slug: 'rogue-one',
    timeline: { start: 'Dec 2016', peak: 'Dec 2016' },
    impact: 'Proved the Star Wars universe could succeed beyond the main saga.'
  },
  {
    id: 'item-18',
    title: 'Keep Calm and川普万岁',
    description: 'Chinese internet\'s bizarre meme-making of Trump before his inauguration showed the global nature of meme culture.',
    categoryId: 'memes',
    monthId: 'dec-2016',
    popularityScore: 82,
    slug: 'trump-china-meme',
    timeline: { start: 'Nov 2016', peak: 'Jan 2017' },
    impact: 'Demonstrated how memes cross cultural and language barriers.'
  }
];

// Helper functions to get data
export function getYearById(id: string): Year | undefined {
  return years.find(y => y.id === id);
}

export function getMonthsByYear(yearId: string): Month[] {
  return months.filter(m => m.yearId === yearId);
}

export function getItemsByMonth(monthId: string): Item[] {
  return items.filter(i => i.monthId === monthId);
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
