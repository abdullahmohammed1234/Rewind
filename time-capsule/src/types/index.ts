// Data Models for TimeCapsule

// ===== Core Types =====

export interface Year {
  id: string;
  year: number;
  description: string;
  theme?: string;
  topTrends?: string[];
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Month {
  id: string;
  name: string;
  yearId: string;
  shortName?: string;
}

// ===== Category Types =====

export type CategoryType = 
  | 'memes'
  | 'music'
  | 'dances'
  | 'style'
  | 'products'
  | 'trends'
  | 'tv'
  | 'celebrities'
  | 'gaming'
  | 'other';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  description?: string;
}

// ===== Item/Trend Types =====

export interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
  monthId: string;
  yearId?: string;
  popularityScore?: number;
  slug?: string;
  timeline?: {
    start: string;
    peak?: string;
    end?: string;
  };
  impact?: string;
  rank?: number;
  platform?: string;
  creator?: string;
}

// ===== Leaderboard Types =====

export interface LeaderboardEntry {
  rank: number;
  item: Item;
  previousRank?: number;
  weeksOnChart?: number;
}

export interface CategoryLeaderboard {
  categoryId: string;
  category: Category;
  entries: LeaderboardEntry[];
  lastUpdated: string;
  timeRange: 'year' | 'all-time';
}

// ===== Wrapped Summary Types =====

export interface WrappedSummary {
  yearId: string;
  topMeme: Item;
  topSong: Item;
  topTrend: Item;
  topCelebrity: Item;
  topDance?: Item;
  topTV?: Item;
  topProduct?: Item;
  stats: {
    totalMemes: number;
    totalSongs: number;
    totalTrends: number;
    totalDances: number;
    totalTV: number;
    totalProducts: number;
    totalCelebrities: number;
  };
  highlights: string[];
  quotes: string[];
}

// ===== User Types =====

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  followers: number;
  following: number;
  capsulesCount: number;
  isPrivate: boolean;
}

export interface UserProfile extends User {
  capsules: PersonalCapsule[];
  friends: User[];
  galleries: Gallery[];
}

// ===== Personal Capsule Types =====

export type CapsuleStatus = 'open' | 'sealed' | 'unlocked';
export type CapsuleVisibility = 'private' | 'friends' | 'public';

export interface PersonalCapsule {
  id: string;
  userId: string;
  year: number;
  title: string;
  description?: string;
  status: CapsuleStatus;
  visibility: CapsuleVisibility;
  sealedAt?: string;
  unlockDate?: string;
  createdAt: string;
  updatedAt: string;
  submissions: CapsuleSubmission[];
  coverImage?: string;
  isFavorite: boolean;
  shareCode?: string;
}

export interface CapsuleSubmission {
  id: string;
  capsuleId: string;
  userId: string;
  type: 'image' | 'video' | 'text' | 'link' | 'audio';
  title?: string;
  content: string;
  category: CategoryType;
  month?: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isPinned: boolean;
}

// ===== Gallery Types =====

export interface Gallery {
  id: string;
  userId: string;
  name: string;
  description?: string;
  capsules: PersonalCapsule[];
  coverImage?: string;
  isShared: boolean;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

// ===== Sealing Types =====

export interface SealOptions {
  unlockDate: string;
  requirePassword: boolean;
  password?: string;
  allowSubmissions: boolean;
  notifyOnUnlock: boolean;
  email?: string;
}

export interface SealConfirmation {
  capsuleId: string;
  sealedAt: string;
  unlockDate: string;
  confirmationCode: string;
  witnessCount: number;
}

// ===== All-Time Picks Types =====

export interface AllTimePick {
  id: string;
  item: Item;
  years: number[];
  totalEngagement: number;
  category: Category;
  milestone: string;
}

// ===== Share Types =====

export interface ShareOptions {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'copy';
  includeStats: boolean;
  includeImage: boolean;
}

export interface SharedCapsule {
  id: string;
  capsule: PersonalCapsule;
  sharedBy: User;
  sharedAt: string;
  viewCount: number;
  likeCount: number;
  isExpired: boolean;
  expiresAt?: string;
}

// ===== Compare Types =====

export interface ComparisonResult {
  year1: Year;
  year2: Year;
  commonTrends: Item[];
  uniqueToYear1: Item[];
  uniqueToYear2: Item[];
  similarityScore: number;
}

// ===== Notification Types =====

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'share' | 'seal' | 'unlock' | 'friend_request';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}
