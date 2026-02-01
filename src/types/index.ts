// Data Models for Rewind

export interface Year {
  id: string;
  year: number;
  description: string;
  theme?: string;
  topTrends?: string[];
  coverImage?: string;
}

export interface Month {
  id: string;
  name: string;
  yearId: string;
  shortName?: string;
}

export type CategoryType = 
  | 'memes'
  | 'music'
  | 'dances'
  | 'style'
  | 'products'
  | 'tv'
  | 'celebrities'
  | 'trends'
  | 'movies'
  | 'other';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
}

export type EmbedType = 'youtube' | 'spotify' | 'twitter' | 'wikipedia' | null;

export interface EmbedData {
  type: EmbedType;
  id: string; // Video ID, track ID, tweet ID, or Wikipedia slug
  url?: string; // Original URL for reference
  title?: string; // Optional title/description for Wikipedia cards
}

export interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
  monthId: string;
  yearId?: string;
  popularityScore?: number;
  engagementScore?: number;
  userVotes?: number;
  slug?: string;
  timeline?: {
    start: string;
    peak?: string;
    end?: string;
  };
  impact?: string;
  rank?: number;
  embed?: EmbedData; // For embedding YouTube, Spotify, Twitter, Wikipedia content
}

export interface LeaderboardEntry {
  id: string;
  itemId: string;
  item: Item;
  rank: number;
  engagementScore: number;
  userVotes: number;
  previousRank?: number;
  trend: 'up' | 'down' | 'same' | 'new';
}

export interface Leaderboard {
  id: string;
  categoryId: string;
  yearId: string;
  entries: LeaderboardEntry[];
  lastUpdated: string;
  isFinal: boolean;
}

export interface WrappedSummary {
  yearId: string;
  topMeme: Item;
  topSong: Item;
  topTrend: Item;
  topCelebrity: Item;
  topDance?: Item;
  topProduct?: Item;
  topTV?: Item;
  topStyle?: Item;
  stats: {
    totalMemes: number;
    totalSongs: number;
    totalTrends: number;
    totalProducts: number;
    totalTV: number;
  };
}

// MyCapsule Types
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string;
  followers?: number;
  following?: number;
}

export interface PersonalCapsuleEntry {
  id: string;
  userId: string;
  yearId: string;
  categoryId: string;
  title: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'text';
  createdAt: string;
  isPublic: boolean;
}

export interface PersonalCapsule {
  id: string;
  userId: string;
  yearId: string;
  title: string;
  description?: string;
  coverImage?: string;
  entries: PersonalCapsuleEntry[];
  isSealed: boolean;
  sealedUntil?: string;
  allowSubmissions: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  shares?: number;
}

export interface UserGallery {
  userId: string;
  capsules: PersonalCapsule[];
  featuredCapsule?: PersonalCapsule;
}

// All-Time Top Picks
export interface AllTimeTopPick {
  id: string;
  categoryId: string;
  item: Item;
  totalEngagement: number;
  yearsActive: number[];
  peakYear: number;
}
