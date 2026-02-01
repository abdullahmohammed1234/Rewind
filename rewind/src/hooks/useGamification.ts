'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Item } from '@/types';

// Achievement definitions
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'exploration' | 'collection' | 'knowledge' | 'social';
  requirement: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserAchievement {
  achievementId: string;
  earnedAt: string;
  progress: number;
}

export interface UserStats {
  totalItemsExplored: number;
  yearsExplored: Set<string>;
  categoriesExplored: Set<string>;
  streak: number;
  lastActiveDate: string;
  totalFavorites: number;
  shares: number;
  achievements: UserAchievement[];
}

// Predefined achievements
export const ACHIEVEMENTS: Achievement[] = [
  // Exploration achievements
  {
    id: 'explorer-1',
    name: 'Time Traveler',
    description: 'Explore your first year',
    icon: '🗺️',
    category: 'exploration',
    requirement: 1,
    rarity: 'common',
  },
  {
    id: 'explorer-2',
    name: 'Decade Diver',
    description: 'Explore 10 different years',
    icon: '🏃',
    category: 'exploration',
    requirement: 10,
    rarity: 'rare',
  },
  {
    id: 'explorer-3',
    name: 'Chronologist',
    description: 'Explore all available years',
    icon: '👑',
    category: 'exploration',
    requirement: 20,
    rarity: 'legendary',
  },
  // Collection achievements
  {
    id: 'collector-1',
    name: 'Memory Keeper',
    description: 'Save 5 items to your favorites',
    icon: '💾',
    category: 'collection',
    requirement: 5,
    rarity: 'common',
  },
  {
    id: 'collector-2',
    name: 'Archive Master',
    description: 'Save 25 items to your favorites',
    icon: '📚',
    category: 'collection',
    requirement: 25,
    rarity: 'rare',
  },
  {
    id: 'collector-3',
    name: 'Museum Curator',
    description: 'Save 50 items to your favorites',
    icon: '🏛️',
    category: 'collection',
    requirement: 50,
    rarity: 'epic',
  },
  // Knowledge achievements
  {
    id: 'meme-historian',
    name: 'Meme Historian',
    description: 'Explore 10 memes from any year',
    icon: '😂',
    category: 'knowledge',
    requirement: 10,
    rarity: 'rare',
  },
  {
    id: 'music-expert',
    name: 'Music Expert',
    description: 'Explore 10 songs from any year',
    icon: '🎵',
    category: 'knowledge',
    requirement: 10,
    rarity: 'rare',
  },
  {
    id: 'trends-scout',
    name: 'Trends Scout',
    description: 'Explore 15 trends from any year',
    icon: '📈',
    category: 'knowledge',
    requirement: 15,
    rarity: 'rare',
  },
  {
    id: 'pop-culture',
    name: 'Pop Culture Guru',
    description: 'Explore items from 5 different categories',
    icon: '🎭',
    category: 'knowledge',
    requirement: 5,
    rarity: 'rare',
  },
  // Year-specific achievements
  {
    id: '2016-expert',
    name: '2016 Expert',
    description: 'Explore 10 items from 2016',
    icon: '🔮',
    category: 'knowledge',
    requirement: 10,
    rarity: 'epic',
  },
  {
    id: '2017-master',
    name: '2017 Master',
    description: 'Explore 10 items from 2017',
    icon: '🔥',
    category: 'knowledge',
    requirement: 10,
    rarity: 'epic',
  },
  {
    id: '2018-champion',
    name: '2018 Champion',
    description: 'Explore 10 items from 2018',
    icon: '⭐',
    category: 'knowledge',
    requirement: 10,
    rarity: 'epic',
  },
  // Social achievements
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Share your wrapped results 3 times',
    icon: '🦋',
    category: 'social',
    requirement: 3,
    rarity: 'rare',
  },
];

// Storage keys
const GAMIFICATION_KEY = 'rewind-gamification';

export function useGamification() {
  const [stats, setStats] = useState<UserStats>({
    totalItemsExplored: 0,
    yearsExplored: new Set(),
    categoriesExplored: new Set(),
    streak: 0,
    lastActiveDate: '',
    totalFavorites: 0,
    shares: 0,
    achievements: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load stats from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GAMIFICATION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert Sets back to Arrays for JSON storage
        setStats({
          ...parsed,
          yearsExplored: new Set(parsed.yearsExplored || []),
          categoriesExplored: new Set(parsed.categoriesExplored || []),
        });
      }
    } catch (error) {
      console.error('Failed to load gamification stats:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        const toSave = {
          ...stats,
          yearsExplored: Array.from(stats.yearsExplored),
          categoriesExplored: Array.from(stats.categoriesExplored),
        };
        localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(toSave));
      } catch (error) {
        console.error('Failed to save gamification stats:', error);
      }
    }
  }, [stats, isLoaded]);

  // Check and update streak
  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastActive = stats.lastActiveDate;
    
    if (lastActive === today) {
      return stats.streak; // Already active today
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastActive === yesterday.toDateString()) {
      // Consecutive day - increment streak
      return stats.streak + 1;
    }
    
    if (lastActive === '') {
      // First time - start streak
      return 1;
    }
    
    // Streak broken - reset to 1
    return 1;
  }, [stats.streak, stats.lastActiveDate]);

  // Record item exploration
  const recordExploration = useCallback((item: Item) => {
    setStats((prev) => {
      const newStreak = checkStreak();
      const newYearsExplored = new Set(prev.yearsExplored);
      const newCategoriesExplored = new Set(prev.categoriesExplored);
      
      if (item.yearId) {
        newYearsExplored.add(item.yearId);
      }
      newCategoriesExplored.add(item.categoryId);
      
      // Check for new achievements
      const newAchievements = [...prev.achievements];
      const earnedAchievements = calculateEarnedAchievements({
        ...prev,
        totalItemsExplored: prev.totalItemsExplored + 1,
        yearsExplored: newYearsExplored,
        categoriesExplored: newCategoriesExplored,
        totalFavorites: prev.totalFavorites,
      });
      
      // Add newly earned achievements
      earnedAchievements.forEach((achievement) => {
        if (!newAchievements.some((a) => a.achievementId === achievement.id)) {
          newAchievements.push({
            achievementId: achievement.id,
            earnedAt: new Date().toISOString(),
            progress: achievement.requirement,
          });
        }
      });
      
      return {
        ...prev,
        totalItemsExplored: prev.totalItemsExplored + 1,
        yearsExplored: newYearsExplored,
        categoriesExplored: newCategoriesExplored,
        streak: newStreak,
        lastActiveDate: new Date().toDateString(),
        achievements: newAchievements,
      };
    });
  }, [checkStreak]);

  // Record favorite added
  const recordFavorite = useCallback(() => {
    setStats((prev) => {
      // Check for collection achievements
      const newAchievements = [...prev.achievements];
      const updatedStats = { ...prev, totalFavorites: prev.totalFavorites + 1 };
      const earnedAchievements = calculateEarnedAchievements(updatedStats);
      
      earnedAchievements.forEach((achievement) => {
        if (!newAchievements.some((a) => a.achievementId === achievement.id)) {
          newAchievements.push({
            achievementId: achievement.id,
            earnedAt: new Date().toISOString(),
            progress: achievement.requirement,
          });
        }
      });
      
      return {
        ...prev,
        totalFavorites: prev.totalFavorites + 1,
        achievements: newAchievements,
      };
    });
  }, []);

  // Record share
  const recordShare = useCallback(() => {
    setStats((prev) => {
      const newAchievements = [...prev.achievements];
      const updatedStats = { ...prev, shares: (prev.shares || 0) + 1 };
      const earnedAchievements = calculateEarnedAchievements(updatedStats);
      
      earnedAchievements.forEach((achievement) => {
        if (!newAchievements.some((a) => a.achievementId === achievement.id)) {
          newAchievements.push({
            achievementId: achievement.id,
            earnedAt: new Date().toISOString(),
            progress: achievement.requirement,
          });
        }
      });
      
      return {
        ...prev,
        shares: (prev.shares || 0) + 1,
        achievements: newAchievements,
      };
    });
  }, []);

  // Calculate which achievements are earned
  const calculateEarnedAchievements = useCallback((currentStats: UserStats): Achievement[] => {
    const earned: Achievement[] = [];
    
    ACHIEVEMENTS.forEach((achievement) => {
      // Check if already earned
      if (currentStats.achievements.some((a) => a.achievementId === achievement.id)) {
        return;
      }
      
      let progress = 0;
      let isEarned = false;
      
      switch (achievement.id) {
        case 'explorer-1':
          progress = currentStats.yearsExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'explorer-2':
        case 'explorer-3':
          progress = currentStats.yearsExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'collector-1':
        case 'collector-2':
        case 'collector-3':
          progress = currentStats.totalFavorites;
          isEarned = progress >= achievement.requirement;
          break;
        case 'meme-historian':
          progress = currentStats.categoriesExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'music-expert':
          progress = currentStats.categoriesExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'trends-scout':
          progress = currentStats.categoriesExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'pop-culture':
          progress = currentStats.categoriesExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case '2016-expert':
        case '2017-master':
        case '2018-champion':
          progress = currentStats.yearsExplored.size;
          isEarned = progress >= achievement.requirement;
          break;
        case 'social-butterfly':
          progress = (currentStats.shares || 0);
          isEarned = progress >= achievement.requirement;
          break;
      }
      
      if (isEarned) {
        earned.push({ ...achievement });
      }
    });
    
    return earned;
  }, []);

  // Get achievement progress
  const getAchievementProgress = useCallback((achievementId: string) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (!achievement) return { progress: 0, isEarned: false };
    
    const userAchievement = stats.achievements.find((a) => a.achievementId === achievementId);
    if (userAchievement) {
      return { progress: achievement.requirement, isEarned: true };
    }
    
    // Calculate current progress
    let progress = 0;
    switch (achievementId) {
      case 'explorer-1':
      case 'explorer-2':
      case 'explorer-3':
        progress = stats.yearsExplored.size;
        break;
      case 'collector-1':
      case 'collector-2':
      case 'collector-3':
        progress = stats.totalFavorites;
        break;
      case 'meme-historian':
      case 'music-expert':
      case 'trends-scout':
        progress = stats.categoriesExplored.size;
        break;
      case 'pop-culture':
        progress = stats.categoriesExplored.size;
        break;
      case '2016-expert':
      case '2017-master':
      case '2018-champion':
        progress = stats.yearsExplored.size;
        break;
      case 'social-butterfly':
        progress = stats.shares || 0;
        break;
    }
    
    return {
      progress: Math.min(progress, achievement.requirement),
      isEarned: false,
    };
  }, [stats]);

  // Get all earned achievements
  const earnedAchievements = useMemo(() => {
    return stats.achievements.map((ua) => ({
      ...ACHIEVEMENTS.find((a) => a.id === ua.achievementId)!,
      earnedAt: ua.earnedAt,
    })).filter(Boolean);
  }, [stats.achievements]);

  // Get available (unearned) achievements
  const availableAchievements = useMemo(() => {
    const earnedIds = new Set(stats.achievements.map((a) => a.achievementId));
    return ACHIEVEMENTS.filter((a) => !earnedIds.has(a.id));
  }, [stats.achievements]);

  // Get streak message
  const streakMessage = useMemo(() => {
    if (stats.streak === 0) return 'Start exploring to build your streak!';
    if (stats.streak === 1) return 'Day 1! Keep it going!';
    if (stats.streak < 7) return `${stats.streak} day streak! Keep exploring!`;
    if (stats.streak < 30) return `${stats.streak} day streak! You're on fire! 🔥`;
    if (stats.streak < 365) return `${stats.streak} day streak! Incredible dedication! 🏆`;
    return `${stats.streak} day streak! You're a legend! 👑`;
  }, [stats.streak]);

  // Get remaining years for streak maintenance
  const yearsToMaintainStreak = useMemo(() => {
    const totalYears = 20; // Assuming 20 years available
    return Math.max(0, totalYears - stats.yearsExplored.size);
  }, [stats.yearsExplored.size]);

  // Reset stats (for testing)
  const resetStats = useCallback(() => {
    setStats({
      totalItemsExplored: 0,
      yearsExplored: new Set(),
      categoriesExplored: new Set(),
      streak: 0,
      lastActiveDate: '',
      totalFavorites: 0,
      shares: 0,
      achievements: [],
    });
  }, []);

  return {
    stats,
    isLoaded,
    recordExploration,
    recordFavorite,
    recordShare,
    getAchievementProgress,
    earnedAchievements,
    availableAchievements,
    streakMessage,
    yearsToMaintainStreak,
    resetStats,
    ACHIEVEMENTS,
  };
}
