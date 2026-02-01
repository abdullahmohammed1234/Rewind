// Seed data for Rewind - Demo focusing on 2016
import { Year, Month, Category, Item, LeaderboardEntry, Leaderboard, PersonalCapsule, User } from '@/types';

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
  },
  {
    id: '2019',
    year: 2019,
    description: 'Area 51 raid, VSCO girls, and the rise of TikTok. Old Town Road breaks records.',
    theme: 'tiktok',
    topTrends: ['Area 51', 'VSCO Girl', 'Old Town Road', 'Baby Yoda']
  },
  {
    id: '2020',
    year: 2020,
    description: 'The pandemic year. Tiger King, Among Us, and WAP dominate while the world stays home.',
    theme: 'pandemic',
    topTrends: ['Tiger King', 'Among Us', 'WAP', 'Zoom']
  },
  {
    id: '2021',
    year: 2021,
    description: 'NFTs explode, Squid Game takes over, and the Metaverse becomes mainstream.',
    theme: 'nft',
    topTrends: ['Squid Game', 'NFTs', 'Metaverse', 'Berries and Cream']
  },
  {
    id: '2022',
    year: 2022,
    description: 'Elon buys Twitter, ChatGPT launches, and Wednesday dance goes viral.',
    theme: 'revolution',
    topTrends: ['Wednesday', 'ChatGPT', 'Corn Kid', 'Goblin Mode']
  },
  {
    id: '2023',
    year: 2023,
    description: 'Barbenheimer summer takes over, Threads launches, and digital creativity explodes.',
    theme: 'creativity',
    topTrends: ['Barbie', 'Oppenheimer', 'AI Art', 'Threads']
  },
  {
    id: '2024',
    year: 2024,
    description: 'Viral trends dominate social media, nostalgic comebacks, and new internet moments.',
    theme: 'viral',
    topTrends: ['Brat Summer', 'Demure', 'Very Mindful', 'Digital Culture']
  },
  {
    id: '2025',
    year: 2025,
    description: 'Last year - the trends and moments that shaped digital culture.',
    theme: 'past',
    topTrends: ['Digital Culture', 'Viral Moments', 'Streaming', 'Social Media']
  },
  {
    id: '2026',
    year: 2026,
    description: 'A year of viral moments and digital culture continuing to shape how we connect and share.',
    theme: 'mainstream',
    topTrends: ['Digital Culture', 'Viral Moments', 'Streaming', 'Social Media']
  }
];

export const months: Month[] = [
  // 2012
  { id: 'jan-2012', name: 'January', yearId: '2012', shortName: 'Jan' },
  { id: 'feb-2012', name: 'February', yearId: '2012', shortName: 'Feb' },
  { id: 'mar-2012', name: 'March', yearId: '2012', shortName: 'Mar' },
  { id: 'apr-2012', name: 'April', yearId: '2012', shortName: 'Apr' },
  { id: 'may-2012', name: 'May', yearId: '2012', shortName: 'May' },
  { id: 'jun-2012', name: 'June', yearId: '2012', shortName: 'Jun' },
  { id: 'jul-2012', name: 'July', yearId: '2012', shortName: 'Jul' },
  { id: 'aug-2012', name: 'August', yearId: '2012', shortName: 'Aug' },
  { id: 'sep-2012', name: 'September', yearId: '2012', shortName: 'Sep' },
  { id: 'oct-2012', name: 'October', yearId: '2012', shortName: 'Oct' },
  { id: 'nov-2012', name: 'November', yearId: '2012', shortName: 'Nov' },
  { id: 'dec-2012', name: 'December', yearId: '2012', shortName: 'Dec' },
  // 2013
  { id: 'jan-2013', name: 'January', yearId: '2013', shortName: 'Jan' },
  { id: 'feb-2013', name: 'February', yearId: '2013', shortName: 'Feb' },
  { id: 'mar-2013', name: 'March', yearId: '2013', shortName: 'Mar' },
  { id: 'apr-2013', name: 'April', yearId: '2013', shortName: 'Apr' },
  { id: 'may-2013', name: 'May', yearId: '2013', shortName: 'May' },
  { id: 'jun-2013', name: 'June', yearId: '2013', shortName: 'Jun' },
  { id: 'jul-2013', name: 'July', yearId: '2013', shortName: 'Jul' },
  { id: 'aug-2013', name: 'August', yearId: '2013', shortName: 'Aug' },
  { id: 'sep-2013', name: 'September', yearId: '2013', shortName: 'Sep' },
  { id: 'oct-2013', name: 'October', yearId: '2013', shortName: 'Oct' },
  { id: 'nov-2013', name: 'November', yearId: '2013', shortName: 'Nov' },
  { id: 'dec-2013', name: 'December', yearId: '2013', shortName: 'Dec' },
  // 2014
  { id: 'jan-2014', name: 'January', yearId: '2014', shortName: 'Jan' },
  { id: 'feb-2014', name: 'February', yearId: '2014', shortName: 'Feb' },
  { id: 'mar-2014', name: 'March', yearId: '2014', shortName: 'Mar' },
  { id: 'apr-2014', name: 'April', yearId: '2014', shortName: 'Apr' },
  { id: 'may-2014', name: 'May', yearId: '2014', shortName: 'May' },
  { id: 'jun-2014', name: 'June', yearId: '2014', shortName: 'Jun' },
  { id: 'jul-2014', name: 'July', yearId: '2014', shortName: 'Jul' },
  { id: 'aug-2014', name: 'August', yearId: '2014', shortName: 'Aug' },
  { id: 'sep-2014', name: 'September', yearId: '2014', shortName: 'Sep' },
  { id: 'oct-2014', name: 'October', yearId: '2014', shortName: 'Oct' },
  { id: 'nov-2014', name: 'November', yearId: '2014', shortName: 'Nov' },
  { id: 'dec-2014', name: 'December', yearId: '2014', shortName: 'Dec' },
  // 2015
  { id: 'jan-2015', name: 'January', yearId: '2015', shortName: 'Jan' },
  { id: 'feb-2015', name: 'February', yearId: '2015', shortName: 'Feb' },
  { id: 'mar-2015', name: 'March', yearId: '2015', shortName: 'Mar' },
  { id: 'apr-2015', name: 'April', yearId: '2015', shortName: 'Apr' },
  { id: 'may-2015', name: 'May', yearId: '2015', shortName: 'May' },
  { id: 'jun-2015', name: 'June', yearId: '2015', shortName: 'Jun' },
  { id: 'jul-2015', name: 'July', yearId: '2015', shortName: 'Jul' },
  { id: 'aug-2015', name: 'August', yearId: '2015', shortName: 'Aug' },
  { id: 'sep-2015', name: 'September', yearId: '2015', shortName: 'Sep' },
  { id: 'oct-2015', name: 'October', yearId: '2015', shortName: 'Oct' },
  { id: 'nov-2015', name: 'November', yearId: '2015', shortName: 'Nov' },
  { id: 'dec-2015', name: 'December', yearId: '2015', shortName: 'Dec' },
  // 2016
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
  // 2017
  { id: 'jan-2017', name: 'January', yearId: '2017', shortName: 'Jan' },
  { id: 'feb-2017', name: 'February', yearId: '2017', shortName: 'Feb' },
  { id: 'mar-2017', name: 'March', yearId: '2017', shortName: 'Mar' },
  { id: 'apr-2017', name: 'April', yearId: '2017', shortName: 'Apr' },
  { id: 'may-2017', name: 'May', yearId: '2017', shortName: 'May' },
  { id: 'jun-2017', name: 'June', yearId: '2017', shortName: 'Jun' },
  { id: 'jul-2017', name: 'July', yearId: '2017', shortName: 'Jul' },
  { id: 'aug-2017', name: 'August', yearId: '2017', shortName: 'Aug' },
  { id: 'sep-2017', name: 'September', yearId: '2017', shortName: 'Sep' },
  { id: 'oct-2017', name: 'October', yearId: '2017', shortName: 'Oct' },
  { id: 'nov-2017', name: 'November', yearId: '2017', shortName: 'Nov' },
  { id: 'dec-2017', name: 'December', yearId: '2017', shortName: 'Dec' },
  // 2018
  { id: 'jan-2018', name: 'January', yearId: '2018', shortName: 'Jan' },
  { id: 'feb-2018', name: 'February', yearId: '2018', shortName: 'Feb' },
  { id: 'mar-2018', name: 'March', yearId: '2018', shortName: 'Mar' },
  { id: 'apr-2018', name: 'April', yearId: '2018', shortName: 'Apr' },
  { id: 'may-2018', name: 'May', yearId: '2018', shortName: 'May' },
  { id: 'jun-2018', name: 'June', yearId: '2018', shortName: 'Jun' },
  { id: 'jul-2018', name: 'July', yearId: '2018', shortName: 'Jul' },
  { id: 'aug-2018', name: 'August', yearId: '2018', shortName: 'Aug' },
  { id: 'sep-2018', name: 'September', yearId: '2018', shortName: 'Sep' },
  { id: 'oct-2018', name: 'October', yearId: '2018', shortName: 'Oct' },
  { id: 'nov-2018', name: 'November', yearId: '2018', shortName: 'Nov' },
  { id: 'dec-2018', name: 'December', yearId: '2018', shortName: 'Dec' },
  // 2019
  { id: 'jan-2019', name: 'January', yearId: '2019', shortName: 'Jan' },
  { id: 'feb-2019', name: 'February', yearId: '2019', shortName: 'Feb' },
  { id: 'mar-2019', name: 'March', yearId: '2019', shortName: 'Mar' },
  { id: 'apr-2019', name: 'April', yearId: '2019', shortName: 'Apr' },
  { id: 'may-2019', name: 'May', yearId: '2019', shortName: 'May' },
  { id: 'jun-2019', name: 'June', yearId: '2019', shortName: 'Jun' },
  { id: 'jul-2019', name: 'July', yearId: '2019', shortName: 'Jul' },
  { id: 'aug-2019', name: 'August', yearId: '2019', shortName: 'Aug' },
  { id: 'sep-2019', name: 'September', yearId: '2019', shortName: 'Sep' },
  { id: 'oct-2019', name: 'October', yearId: '2019', shortName: 'Oct' },
  { id: 'nov-2019', name: 'November', yearId: '2019', shortName: 'Nov' },
  { id: 'dec-2019', name: 'December', yearId: '2019', shortName: 'Dec' },
  // 2020
  { id: 'jan-2020', name: 'January', yearId: '2020', shortName: 'Jan' },
  { id: 'feb-2020', name: 'February', yearId: '2020', shortName: 'Feb' },
  { id: 'mar-2020', name: 'March', yearId: '2020', shortName: 'Mar' },
  { id: 'apr-2020', name: 'April', yearId: '2020', shortName: 'Apr' },
  { id: 'may-2020', name: 'May', yearId: '2020', shortName: 'May' },
  { id: 'jun-2020', name: 'June', yearId: '2020', shortName: 'Jun' },
  { id: 'jul-2020', name: 'July', yearId: '2020', shortName: 'Jul' },
  { id: 'aug-2020', name: 'August', yearId: '2020', shortName: 'Aug' },
  { id: 'sep-2020', name: 'September', yearId: '2020', shortName: 'Sep' },
  { id: 'oct-2020', name: 'October', yearId: '2020', shortName: 'Oct' },
  { id: 'nov-2020', name: 'November', yearId: '2020', shortName: 'Nov' },
  { id: 'dec-2020', name: 'December', yearId: '2020', shortName: 'Dec' },
  // 2021
  { id: 'jan-2021', name: 'January', yearId: '2021', shortName: 'Jan' },
  { id: 'feb-2021', name: 'February', yearId: '2021', shortName: 'Feb' },
  { id: 'mar-2021', name: 'March', yearId: '2021', shortName: 'Mar' },
  { id: 'apr-2021', name: 'April', yearId: '2021', shortName: 'Apr' },
  { id: 'may-2021', name: 'May', yearId: '2021', shortName: 'May' },
  { id: 'jun-2021', name: 'June', yearId: '2021', shortName: 'Jun' },
  { id: 'jul-2021', name: 'July', yearId: '2021', shortName: 'Jul' },
  { id: 'aug-2021', name: 'August', yearId: '2021', shortName: 'Aug' },
  { id: 'sep-2021', name: 'September', yearId: '2021', shortName: 'Sep' },
  { id: 'oct-2021', name: 'October', yearId: '2021', shortName: 'Oct' },
  { id: 'nov-2021', name: 'November', yearId: '2021', shortName: 'Nov' },
  { id: 'dec-2021', name: 'December', yearId: '2021', shortName: 'Dec' },
  // 2022
  { id: 'jan-2022', name: 'January', yearId: '2022', shortName: 'Jan' },
  { id: 'feb-2022', name: 'February', yearId: '2022', shortName: 'Feb' },
  { id: 'mar-2022', name: 'March', yearId: '2022', shortName: 'Mar' },
  { id: 'apr-2022', name: 'April', yearId: '2022', shortName: 'Apr' },
  { id: 'may-2022', name: 'May', yearId: '2022', shortName: 'May' },
  { id: 'jun-2022', name: 'June', yearId: '2022', shortName: 'Jun' },
  { id: 'jul-2022', name: 'July', yearId: '2022', shortName: 'Jul' },
  { id: 'aug-2022', name: 'August', yearId: '2022', shortName: 'Aug' },
  { id: 'sep-2022', name: 'September', yearId: '2022', shortName: 'Sep' },
  { id: 'oct-2022', name: 'October', yearId: '2022', shortName: 'Oct' },
  { id: 'nov-2022', name: 'November', yearId: '2022', shortName: 'Nov' },
  { id: 'dec-2022', name: 'December', yearId: '2022', shortName: 'Dec' },
  // 2023
  { id: 'jan-2023', name: 'January', yearId: '2023', shortName: 'Jan' },
  { id: 'feb-2023', name: 'February', yearId: '2023', shortName: 'Feb' },
  { id: 'mar-2023', name: 'March', yearId: '2023', shortName: 'Mar' },
  { id: 'apr-2023', name: 'April', yearId: '2023', shortName: 'Apr' },
  { id: 'may-2023', name: 'May', yearId: '2023', shortName: 'May' },
  { id: 'jun-2023', name: 'June', yearId: '2023', shortName: 'Jun' },
  { id: 'jul-2023', name: 'July', yearId: '2023', shortName: 'Jul' },
  { id: 'aug-2023', name: 'August', yearId: '2023', shortName: 'Aug' },
  { id: 'sep-2023', name: 'September', yearId: '2023', shortName: 'Sep' },
  { id: 'oct-2023', name: 'October', yearId: '2023', shortName: 'Oct' },
  { id: 'nov-2023', name: 'November', yearId: '2023', shortName: 'Nov' },
  { id: 'dec-2023', name: 'December', yearId: '2023', shortName: 'Dec' },
  // 2024
  { id: 'jan-2024', name: 'January', yearId: '2024', shortName: 'Jan' },
  { id: 'feb-2024', name: 'February', yearId: '2024', shortName: 'Feb' },
  { id: 'mar-2024', name: 'March', yearId: '2024', shortName: 'Mar' },
  { id: 'apr-2024', name: 'April', yearId: '2024', shortName: 'Apr' },
  { id: 'may-2024', name: 'May', yearId: '2024', shortName: 'May' },
  { id: 'jun-2024', name: 'June', yearId: '2024', shortName: 'Jun' },
  { id: 'jul-2024', name: 'July', yearId: '2024', shortName: 'Jul' },
  { id: 'aug-2024', name: 'August', yearId: '2024', shortName: 'Aug' },
  { id: 'sep-2024', name: 'September', yearId: '2024', shortName: 'Sep' },
  { id: 'oct-2024', name: 'October', yearId: '2024', shortName: 'Oct' },
  { id: 'nov-2024', name: 'November', yearId: '2024', shortName: 'Nov' },
  { id: 'dec-2024', name: 'December', yearId: '2024', shortName: 'Dec' },
  // 2025
  { id: 'jan-2025', name: 'January', yearId: '2025', shortName: 'Jan' },
  { id: 'feb-2025', name: 'February', yearId: '2025', shortName: 'Feb' },
  { id: 'mar-2025', name: 'March', yearId: '2025', shortName: 'Mar' },
  { id: 'apr-2025', name: 'April', yearId: '2025', shortName: 'Apr' },
  { id: 'may-2025', name: 'May', yearId: '2025', shortName: 'May' },
  { id: 'jun-2025', name: 'June', yearId: '2025', shortName: 'Jun' },
  { id: 'jul-2025', name: 'July', yearId: '2025', shortName: 'Jul' },
  { id: 'aug-2025', name: 'August', yearId: '2025', shortName: 'Aug' },
  { id: 'sep-2025', name: 'September', yearId: '2025', shortName: 'Sep' },
  { id: 'oct-2025', name: 'October', yearId: '2025', shortName: 'Oct' },
  { id: 'nov-2025', name: 'November', yearId: '2025', shortName: 'Nov' },
  { id: 'dec-2025', name: 'December', yearId: '2025', shortName: 'Dec' },
  // 2026
  { id: 'jan-2026', name: 'January', yearId: '2026', shortName: 'Jan' },
  { id: 'feb-2026', name: 'February', yearId: '2026', shortName: 'Feb' }
];

export const categories: Category[] = [
  { id: 'music', name: 'Music', type: 'music', icon: '🎵', color: '#1DB954' },
  { id: 'memes', name: 'Memes', type: 'memes', icon: '😂', color: '#FF6B6B' },
  { id: 'style', name: 'Style', type: 'style', icon: '👗', color: '#E91E63' },
  { id: 'products', name: 'Products', type: 'products', icon: '🎁', color: '#FF9800' },
  { id: 'dances', name: 'Dances', type: 'dances', icon: '💃', color: '#9C27B0' },
  { id: 'tv', name: 'TV Shows', type: 'tv', icon: '📺', color: '#2196F3' },
  { id: 'celebrities', name: 'Celebrities', type: 'celebrities', icon: '⭐', color: '#FFC107' },
  { id: 'trends', name: 'Trends', type: 'trends', icon: '📈', color: '#4CAF50' },
  { id: 'movies', name: 'Movies', type: 'movies', icon: '🎬', color: '#673AB7' },
  { id: 'other', name: 'Other', type: 'other', icon: '📦', color: '#607D8B' }
];

export const items: Item[] = [
  // ===== MUSIC 2016 =====
  {
    id: 'music-1',
    title: 'Closer - The Chainsmokers ft. Halsey',
    description: 'The song that defined summer 2016. Spent 12 weeks at #1 on Billboard Hot 100.',
    categoryId: 'music',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 99,
    engagementScore: 98,
    userVotes: 15420,
    slug: 'closer-chainsmokers',
    rank: 1,
  },
  {
    id: 'music-2',
    title: 'One Dance - Drake ft. WizKid',
    description: 'Drake\'s dancehall-influenced hit that dominated streaming platforms worldwide.',
    categoryId: 'music',
    monthId: 'apr-2016',
    yearId: '2016',
    popularityScore: 97,
    engagementScore: 96,
    userVotes: 14200,
    slug: 'one-dance-drake',
    rank: 2,
  },
  {
    id: 'music-3',
    title: 'Work - Rihanna ft. Drake',
    description: 'Rihanna and Drake\'s collaboration that sparked countless memes and dance videos.',
    categoryId: 'music',
    monthId: 'jan-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 13100,
    slug: 'work-rihanna',
    rank: 3,
  },
  {
    id: 'music-4',
    title: 'Life of Pablo - Kanye West',
    description: 'Kanye\'s seventh studio album with massive hype and streaming exclusivity drama.',
    categoryId: 'music',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 11800,
    slug: 'life-of-pablo',
    rank: 4,
  },
  {
    id: 'music-5',
    title: 'Panda - Desiigner',
    description: 'The viral hit that nobody could understand but everyone loved.',
    categoryId: 'music',
    monthId: 'may-2016',
    yearId: '2016',
    popularityScore: 90,
    engagementScore: 89,
    userVotes: 10500,
    slug: 'panda-desiigner',
    rank: 5,
  },

  // ===== MEMES 2016 =====
  {
    id: 'meme-1',
    title: 'Harambe',
    description: 'After a gorilla was shot at Cincinnati Zoo, the internet mourned with endless memes. "Dicks out for Harambe" became a cultural phenomenon.',
    categoryId: 'memes',
    monthId: 'may-2016',
    yearId: '2016',
    popularityScore: 100,
    engagementScore: 99,
    userVotes: 25000,
    slug: 'harambe',
    rank: 1,
  },
  {
    id: 'meme-2',
    title: 'Damn Daniel',
    description: 'A viral video where two teens record their friend Daniel wearing white Vans. "Damn Daniel! Back at it again with the white Vans!"',
    categoryId: 'memes',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 98,
    engagementScore: 97,
    userVotes: 22000,
    slug: 'damn-daniel',
    rank: 2,
  },
  {
    id: 'meme-3',
    title: 'Cash Me Outside',
    description: 'A teenage girl on Dr. Phil saying "Cash me outside, howbow dah?" launched a music career.',
    categoryId: 'memes',
    monthId: 'sep-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 18500,
    slug: 'cash-me-outside',
    rank: 3,
  },
  {
    id: 'meme-4',
    title: 'Arthur Fist',
    description: 'The clenched fist from the Arthur cartoon became the go-to reaction meme for frustration.',
    categoryId: 'memes',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 93,
    engagementScore: 92,
    userVotes: 16000,
    slug: 'arthur-fist',
    rank: 4,
  },
  {
    id: 'meme-5',
    title: 'Evil Kermit',
    description: 'Kermit talking to his hooded evil self became the perfect meme for inner conflicts.',
    categoryId: 'memes',
    monthId: 'nov-2016',
    yearId: '2016',
    popularityScore: 91,
    engagementScore: 90,
    userVotes: 14500,
    slug: 'evil-kermit',
    rank: 5,
  },

  // ===== STYLE 2016 =====
  {
    id: 'style-1',
    title: 'Chokers',
    description: 'The 90s accessory made a massive comeback, becoming the must-have accessory of 2016.',
    categoryId: 'style',
    monthId: 'mar-2016',
    yearId: '2016',
    popularityScore: 96,
    engagementScore: 95,
    userVotes: 12000,
    slug: 'chokers',
    rank: 1
  },
  {
    id: 'style-2',
    title: 'Off-Shoulder Tops',
    description: 'The off-shoulder trend dominated summer fashion, from casual to formal wear.',
    categoryId: 'style',
    monthId: 'jun-2016',
    yearId: '2016',
    popularityScore: 94,
    engagementScore: 93,
    userVotes: 11200,
    slug: 'off-shoulder',
    rank: 2
  },
  {
    id: 'style-3',
    title: 'Athleisure',
    description: 'Wearing gym clothes everywhere became not just acceptable but fashionable.',
    categoryId: 'style',
    monthId: 'apr-2016',
    yearId: '2016',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 10500,
    slug: 'athleisure',
    rank: 3
  },
  {
    id: 'style-4',
    title: 'Rose Gold Everything',
    description: 'From phones to jewelry to home decor, rose gold was the color of 2016.',
    categoryId: 'style',
    monthId: 'sep-2016',
    yearId: '2016',
    popularityScore: 90,
    engagementScore: 89,
    userVotes: 9800,
    slug: 'rose-gold',
    rank: 4
  },
  {
    id: 'style-5',
    title: 'Bomber Jackets',
    description: 'The military-inspired jacket became a streetwear staple.',
    categoryId: 'style',
    monthId: 'oct-2016',
    yearId: '2016',
    popularityScore: 88,
    engagementScore: 87,
    userVotes: 9200,
    slug: 'bomber-jackets',
    rank: 5
  },

  // ===== PRODUCTS 2016 =====
  {
    id: 'product-1',
    title: 'Apple AirPods',
    description: 'Initially mocked, these wireless earbuds became a massive status symbol.',
    categoryId: 'products',
    monthId: 'dec-2016',
    yearId: '2016',
    popularityScore: 97,
    engagementScore: 96,
    userVotes: 18000,
    slug: 'airpods',
    rank: 1
  },
  {
    id: 'product-2',
    title: 'Kylie Lip Kits',
    description: 'Kylie Jenner\'s lip kits sold out in minutes and created a beauty empire.',
    categoryId: 'products',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 16500,
    slug: 'kylie-lip-kits',
    rank: 2
  },
  {
    id: 'product-3',
    title: 'Hatchimals',
    description: 'The must-have toy of Christmas 2016 that parents fought over in stores.',
    categoryId: 'products',
    monthId: 'oct-2016',
    yearId: '2016',
    popularityScore: 93,
    engagementScore: 92,
    userVotes: 14200,
    slug: 'hatchimals',
    rank: 3
  },
  {
    id: 'product-4',
    title: 'Nintendo NES Classic',
    description: 'The retro console that was impossible to find and sparked nostalgia fever.',
    categoryId: 'products',
    monthId: 'nov-2016',
    yearId: '2016',
    popularityScore: 91,
    engagementScore: 90,
    userVotes: 13000,
    slug: 'nes-classic',
    rank: 4
  },
  {
    id: 'product-5',
    title: 'Snapchat Spectacles',
    description: 'Snapchat\'s camera glasses that could only be bought from vending machines.',
    categoryId: 'products',
    monthId: 'nov-2016',
    yearId: '2016',
    popularityScore: 89,
    engagementScore: 88,
    userVotes: 11500,
    slug: 'spectacles',
    rank: 5
  },

  // ===== DANCES 2016 =====
  {
    id: 'dance-1',
    title: 'Juju on That Beat',
    description: 'The viral dance challenge that took over every school hallway and social media feed.',
    categoryId: 'dances',
    monthId: 'aug-2016',
    yearId: '2016',
    popularityScore: 96,
    engagementScore: 95,
    userVotes: 14000,
    slug: 'juju-on-that-beat',
    rank: 1
  },
  {
    id: 'dance-2',
    title: 'Mannequin Challenge',
    description: 'Everyone froze in place while "Black Beatles" played. Even celebrities joined in.',
    categoryId: 'dances',
    monthId: 'oct-2016',
    yearId: '2016',
    popularityScore: 98,
    engagementScore: 97,
    userVotes: 20000,
    slug: 'mannequin-challenge',
    rank: 2
  },
  {
    id: 'dance-3',
    title: 'Running Man Challenge',
    description: 'The dance challenge that started with two high schoolers and went viral.',
    categoryId: 'dances',
    monthId: 'apr-2016',
    yearId: '2016',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 12500,
    slug: 'running-man',
    rank: 3
  },
  {
    id: 'dance-4',
    title: 'Hit the Quan',
    description: 'The dance move that dominated early 2016 social media.',
    categoryId: 'dances',
    monthId: 'jan-2016',
    yearId: '2016',
    popularityScore: 88,
    engagementScore: 87,
    userVotes: 10000,
    slug: 'hit-the-quan',
    rank: 4
  },
  {
    id: 'dance-5',
    title: 'Dab',
    description: 'The signature move that athletes, politicians, and everyone else couldn\'t stop doing.',
    categoryId: 'dances',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 94,
    engagementScore: 93,
    userVotes: 15000,
    slug: 'dab',
    rank: 5
  },

  // ===== TV SHOWS 2016 =====
  {
    id: 'tv-1',
    title: 'Stranger Things',
    description: 'Netflix\'s sci-fi horror series became an instant cultural phenomenon with 80s nostalgia.',
    categoryId: 'tv',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 99,
    engagementScore: 98,
    userVotes: 22000,
    slug: 'stranger-things',
    rank: 1
  },
  {
    id: 'tv-2',
    title: 'Game of Thrones S6',
    description: 'The Battle of the Bastards and "Hold the Door" made this the most-watched season.',
    categoryId: 'tv',
    monthId: 'apr-2016',
    yearId: '2016',
    popularityScore: 98,
    engagementScore: 97,
    userVotes: 21000,
    slug: 'game-of-thrones-s6',
    rank: 2
  },
  {
    id: 'tv-3',
    title: 'Westworld',
    description: 'HBO\'s mind-bending sci-fi series about AI consciousness captivated audiences.',
    categoryId: 'tv',
    monthId: 'oct-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 17500,
    slug: 'westworld',
    rank: 3
  },
  {
    id: 'tv-4',
    title: 'The People v. O.J. Simpson',
    description: 'The true crime series that brought the trial of the century to a new generation.',
    categoryId: 'tv',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 93,
    engagementScore: 92,
    userVotes: 15000,
    slug: 'oj-simpson',
    rank: 4
  },
  {
    id: 'tv-5',
    title: 'Atlanta',
    description: 'Donald Glover\'s groundbreaking comedy-drama about the Atlanta rap scene.',
    categoryId: 'tv',
    monthId: 'sep-2016',
    yearId: '2016',
    popularityScore: 91,
    engagementScore: 90,
    userVotes: 13500,
    slug: 'atlanta',
    rank: 5
  },

  // ===== CELEBRITIES 2016 =====
  {
    id: 'celeb-1',
    title: 'Beyoncé - Lemonade',
    description: 'Queen Bey dropped a visual album that broke the internet and sparked "Who is Becky?" theories.',
    categoryId: 'celebrities',
    monthId: 'apr-2016',
    yearId: '2016',
    popularityScore: 99,
    engagementScore: 98,
    userVotes: 24000,
    slug: 'beyonce-lemonade',
    rank: 1
  },
  {
    id: 'celeb-2',
    title: 'Kim & Taylor Drama',
    description: 'The Snapchat receipts that exposed Taylor Swift and dominated social media for weeks.',
    categoryId: 'celebrities',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 97,
    engagementScore: 96,
    userVotes: 21000,
    slug: 'kim-taylor-drama',
    rank: 2
  },
  {
    id: 'celeb-3',
    title: 'Leonardo DiCaprio Oscar',
    description: 'Leo finally won his Oscar for The Revenant after years of memes about his losses.',
    categoryId: 'celebrities',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 96,
    engagementScore: 95,
    userVotes: 19500,
    slug: 'leo-oscar',
    rank: 3
  },
  {
    id: 'celeb-4',
    title: 'Brangelina Divorce',
    description: 'Brad Pitt and Angelina Jolie\'s split shocked Hollywood and dominated headlines.',
    categoryId: 'celebrities',
    monthId: 'sep-2016',
    yearId: '2016',
    popularityScore: 94,
    engagementScore: 93,
    userVotes: 17000,
    slug: 'brangelina',
    rank: 4
  },
  {
    id: 'celeb-5',
    title: 'David Bowie Tribute',
    description: 'The music world mourned the loss of the legendary artist in January.',
    categoryId: 'celebrities',
    monthId: 'jan-2016',
    yearId: '2016',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 16000,
    slug: 'david-bowie',
    rank: 5
  },

  // ===== TRENDS 2016 =====
  {
    id: 'trend-1',
    title: 'Pokémon GO',
    description: 'The AR game that got millions outside catching virtual creatures and caused accidents.',
    categoryId: 'trends',
    monthId: 'jul-2016',
    yearId: '2016',
    popularityScore: 100,
    engagementScore: 99,
    userVotes: 30000,
    slug: 'pokemon-go',
    rank: 1
  },
  {
    id: 'trend-2',
    title: '2016 US Election',
    description: 'The most controversial election in US history dominated every platform.',
    categoryId: 'trends',
    monthId: 'nov-2016',
    yearId: '2016',
    popularityScore: 99,
    engagementScore: 98,
    userVotes: 28000,
    slug: 'us-election-2016',
    rank: 2
  },
  {
    id: 'trend-3',
    title: 'Brexit',
    description: 'The UK voted to leave the EU, shocking the world and creating endless memes.',
    categoryId: 'trends',
    monthId: 'jun-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 18000,
    slug: 'brexit',
    rank: 3
  },
  {
    id: 'trend-4',
    title: 'Rio Olympics',
    description: 'Usain Bolt\'s pose, green pools, and Simone Biles\' dominance defined the games.',
    categoryId: 'trends',
    monthId: 'aug-2016',
    yearId: '2016',
    popularityScore: 93,
    engagementScore: 92,
    userVotes: 16500,
    slug: 'rio-olympics',
    rank: 4
  },
  {
    id: 'trend-5',
    title: 'Hamilton on Broadway',
    description: 'The hip-hop musical about Alexander Hamilton became impossible to get tickets for.',
    categoryId: 'trends',
    monthId: 'mar-2016',
    yearId: '2016',
    popularityScore: 91,
    engagementScore: 90,
    userVotes: 15000,
    slug: 'hamilton',
    rank: 5
  },

  // ===== MOVIES 2016 =====
  {
    id: 'movie-1',
    title: 'Rogue One: A Star Wars Story',
    description: 'The standalone Star Wars film that brought back Darth Vader in epic fashion.',
    categoryId: 'movies',
    monthId: 'dec-2016',
    yearId: '2016',
    popularityScore: 96,
    engagementScore: 95,
    userVotes: 18000,
    slug: 'rogue-one',
    rank: 1
  },
  {
    id: 'movie-2',
    title: 'Deadpool',
    description: 'Ryan Reynolds\' R-rated superhero film broke records and changed the genre.',
    categoryId: 'movies',
    monthId: 'feb-2016',
    yearId: '2016',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 17500,
    slug: 'deadpool',
    rank: 2
  },
  {
    id: 'movie-3',
    title: 'Captain America: Civil War',
    description: 'Team Cap vs Team Iron Man divided fans and introduced Spider-Man to the MCU.',
    categoryId: 'movies',
    monthId: 'may-2016',
    yearId: '2016',
    popularityScore: 94,
    engagementScore: 93,
    userVotes: 16800,
    slug: 'civil-war',
    rank: 3
  },
  {
    id: 'movie-4',
    title: 'La La Land',
    description: 'The musical that swept awards season and had everyone humming "City of Stars".',
    categoryId: 'movies',
    monthId: 'dec-2016',
    yearId: '2016',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 15000,
    slug: 'la-la-land',
    rank: 4
  },
  {
    id: 'movie-5',
    title: 'Zootopia',
    description: 'Disney\'s animated hit about prejudice became a surprise cultural touchstone.',
    categoryId: 'movies',
    monthId: 'mar-2016',
    yearId: '2016',
    popularityScore: 90,
    engagementScore: 89,
    userVotes: 14000,
    slug: 'zootopia',
    rank: 5
  },

  // ===== MUSIC 2026 =====
  {
    id: 'music-2026-1',
    title: 'Top Song 2026',
    description: 'The defining hit of 2026 that dominated streaming platforms.',
    categoryId: 'music',
    monthId: 'jan-2026',
    yearId: '2026',
    popularityScore: 95,
    engagementScore: 94,
    userVotes: 12000,
    slug: 'top-song-2026',
    rank: 1
  },
  {
    id: 'music-2026-2',
    title: 'Viral Breakout Hit',
    description: 'The song that took TikTok by storm this year.',
    categoryId: 'music',
    monthId: 'feb-2026',
    yearId: '2026',
    popularityScore: 92,
    engagementScore: 91,
    userVotes: 10000,
    slug: 'viral-breakout-2026',
    rank: 2
  },

  // ===== MEMES 2026 =====
  {
    id: 'meme-2026-1',
    title: 'Viral Meme 2026',
    description: 'The meme that defined internet culture this year.',
    categoryId: 'memes',
    monthId: 'jan-2026',
    yearId: '2026',
    popularityScore: 98,
    engagementScore: 97,
    userVotes: 20000,
    slug: 'viral-meme-2026',
    rank: 1
  },

  // ===== TRENDS 2026 =====
  {
    id: 'trend-2026-1',
    title: 'Digital Culture Moment',
    description: 'The trend that captured the internet\'s attention.',
    categoryId: 'trends',
    monthId: 'jan-2026',
    yearId: '2026',
    popularityScore: 96,
    engagementScore: 95,
    userVotes: 15000,
    slug: 'digital-culture-2026',
    rank: 1
  },

  // ===== TV SHOWS 2026 =====
  {
    id: 'tv-2026-1',
    title: 'Hit Series 2026',
    description: 'The show that everyone was talking about this year.',
    categoryId: 'tv',
    monthId: 'jan-2026',
    yearId: '2026',
    popularityScore: 94,
    engagementScore: 93,
    userVotes: 18000,
    slug: 'hit-series-2026',
    rank: 1
  }
];

// Demo user for MyCapsule
export const demoUser: User = {
  id: 'user-1',
  username: 'nostalgic_user',
  displayName: 'Nostalgic User',
  avatarUrl: undefined,
  bio: 'Collecting memories one year at a time 📼',
  joinedDate: '2024-01-15',
  followers: 142,
  following: 89
};

// Demo personal capsules
export const personalCapsules: PersonalCapsule[] = [
  {
    id: 'capsule-1',
    userId: 'user-1',
    yearId: '2016',
    title: 'My 2016 Memories',
    description: 'The year I graduated high school and discovered my love for memes',
    entries: [],
    isSealed: false,
    allowSubmissions: true,
    isPublic: true,
    createdAt: '2024-06-15',
    updatedAt: '2024-12-01',
    likes: 24,
    shares: 5
  },
  {
    id: 'capsule-2',
    userId: 'user-1',
    yearId: '2020',
    title: 'Quarantine Chronicles',
    description: 'How I survived the pandemic with Tiger King and sourdough',
    entries: [],
    isSealed: true,
    sealedUntil: '2025-12-31',
    allowSubmissions: false,
    isPublic: false,
    createdAt: '2020-03-15',
    updatedAt: '2020-12-31',
    likes: 0,
    shares: 0
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

export function getItemsByCategory(categoryId: string, yearId?: string): Item[] {
  return items.filter(i => i.categoryId === categoryId && (!yearId || i.yearId === yearId));
}

export function getItemsByCategoryAndMonth(monthId: string, categoryId: string): Item[] {
  return items.filter(i => i.monthId === monthId && i.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getItemBySlug(slug: string): Item | undefined {
  return items.find(i => i.slug === slug);
}

export function getLeaderboardByCategory(categoryId: string, yearId: string): Item[] {
  return items
    .filter(i => i.categoryId === categoryId && i.yearId === yearId)
    .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
}

export function getTopItemsAllTime(categoryId: string, limit: number = 10): Item[] {
  return items
    .filter(i => i.categoryId === categoryId)
    .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
    .slice(0, limit);
}

export function getYearStats(yearId: string) {
  const yearItems = items.filter(i => i.yearId === yearId);
  return {
    totalItems: yearItems.length,
    byCategory: categories.map(cat => ({
      category: cat,
      count: yearItems.filter(i => i.categoryId === cat.id).length
    }))
  };
}

// ===== DECADE DATA =====

interface DecadeHighlight {
  year: number;
  highlight: string;
  topTrend: string;
}

interface DecadeSummary {
  totalTrends: number;
  iconicMoments: string[];
  culturalImpact: string;
  definingCategories: string[];
}

interface Decade {
  id: string;
  decade: number;
  name: string;
  description: string;
  theme: string;
  coverEmoji: string;
  summary: DecadeSummary;
  yearHighlights: DecadeHighlight[];
}

export const decades: Decade[] = [
  {
    id: '2010s',
    decade: 2010,
    name: 'The 2010s',
    description: 'The decade that defined modern internet culture. From the rise of social media to viral memes that shaped our world.',
    theme: 'digital-explosion',
    coverEmoji: '📱',
    summary: {
      totalTrends: 150,
      iconicMoments: [
        'Gangnam Style',
        'Harlem Shake',
        'Ice Bucket Challenge',
        'Pokémon GO',
        'Despacito',
        'Mannequin Challenge'
      ],
      culturalImpact: 'This decade saw the birth of TikTok, the dominance of streaming services, and the spread of viral challenges that united (and divided) the internet.',
      definingCategories: ['memes', 'music', 'dances', 'trends']
    },
    yearHighlights: [
      { year: 2010, highlight: 'Rise of Instagram and mobile social media', topTrend: 'The Dress' },
      { year: 2011, highlight: 'Arab Spring and viral social movements', topTrend: 'Friday by Rebecca Black' },
      { year: 2012, highlight: 'Gangnam Style breaks YouTube', topTrend: 'Gangnam Style' },
      { year: 2013, highlight: 'Selfie becomes Word of the Year', topTrend: 'Selfie' },
      { year: 2014, highlight: 'Ice Bucket Challenge goes viral', topTrend: 'Ice Bucket Challenge' },
      { year: 2015, highlight: 'Streaming takes over music', topTrend: 'Fidget Spinner' },
      { year: 2016, highlight: 'Pokémon GO and peak meme culture', topTrend: 'Pokémon GO' },
      { year: 2017, highlight: 'Despacito summer', topTrend: 'Despacito' },
      { year: 2018, highlight: 'TikTok begins its rise', topTrend: 'Avengers: Infinity War' },
      { year: 2019, highlight: 'Old Town Road breaks records', topTrend: 'Old Town Road' }
    ]
  },
  {
    id: '2000s',
    decade: 2000,
    name: 'The 2000s',
    description: 'The dawn of internet culture. From early viral videos to the rise of YouTube and social networking.',
    theme: 'web-2-0',
    coverEmoji: '💻',
    summary: {
      totalTrends: 80,
      iconicMoments: [
        'Charlie Bit My Finger',
        'Keyboard Cat',
        'Evolution of Dance',
        'Leave Britney Alone',
        'Numa Numa'
      ],
      culturalImpact: 'This decade marked the transition from web 1.0 to social media, with YouTube founding in 2005 and Facebook opening to everyone in 2006.',
      definingCategories: ['memes', 'trends', 'other']
    },
    yearHighlights: [
      { year: 2000, highlight: 'Dot-com bubble burst', topTrend: 'Y2K' },
      { year: 2001, highlight: '9/11 and internet as news source', topTrend: 'Crazy Frog' },
      { year: 2002, highlight: 'American Idol voting chaos', topTrend: 'Numa Numa' },
      { year: 2003, highlight: 'MySpace launches', topTrend: 'Star Wars Kid' },
      { year: 2004, highlight: 'Facebook founded', topTrend: 'LOL Cats' },
      { year: 2005, highlight: 'YouTube founded', topTrend: 'Evolution of Dance' },
      { year: 2006, highlight: 'Facebook opens to all', topTrend: 'Chocolate Rain' },
      { year: 2007, highlight: 'iPhone revolution', topTrend: 'Leave Britney Alone' },
      { year: 2008, highlight: 'Obama\'s viral campaign', topTrend: 'Keyboard Cat' },
      { year: 2009, highlight: 'Michael Jackson tributes', topTrend: 'Charlie Bit My Finger' }
    ]
  }
];

// Helper function for decade data
export function getDecadeById(id: string): Decade | undefined {
  return decades.find(d => d.id === id);
}

export function getItemsByDecade(decade: number): Item[] {
  const startYear = decade;
  const endYear = decade + 9;
  return items.filter(i => {
    const year = parseInt(i.yearId || '0');
    return year >= startYear && year <= endYear;
  });
}

export function getRandomItem(config?: { categoryId?: string; yearRange?: [number, number]; minScore?: number }): Item | undefined {
  let filteredItems = [...items];
  
  if (config?.categoryId) {
    filteredItems = filteredItems.filter(i => i.categoryId === config.categoryId);
  }
  
  if (config?.yearRange) {
    filteredItems = filteredItems.filter(i => {
      const year = parseInt(i.yearId || '0');
      return year >= config.yearRange![0] && year <= config.yearRange![1];
    });
  }
  
  if (config?.minScore) {
    filteredItems = filteredItems.filter(i => (i.popularityScore || 0) >= config.minScore!);
  }
  
  if (filteredItems.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  return filteredItems[randomIndex];
}
