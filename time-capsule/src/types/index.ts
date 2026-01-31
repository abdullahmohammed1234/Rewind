// Data Models for TimeCapsule

export interface Year {
  id: string;
  year: number;
  description: string;
  theme?: string;
  topTrends?: string[];
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
  | 'trends'
  | 'movies'
  | 'celebrities'
  | 'other';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
  monthId: string;
  popularityScore?: number;
  slug?: string;
  timeline?: {
    start: string;
    peak?: string;
    end?: string;
  };
  impact?: string;
}

export interface WrappedSummary {
  yearId: string;
  topMeme: Item;
  topSong: Item;
  topTrend: Item;
  topCelebrity: Item;
  topDance?: Item;
  stats: {
    totalMemes: number;
    totalSongs: number;
    totalTrends: number;
  };
}
